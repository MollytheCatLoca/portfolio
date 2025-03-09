import { AssistantResponse } from 'ai';
import OpenAI from 'openai';
import axios from 'axios';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const timeoutPromise = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Request timeout')), 300000) // 5 minutos
  );

  try {
    console.log('Request received');
    const input: {
      threadId: string | null;
      message: string;
    } = await req.json();
    console.log('Parsed input:', input);

    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;
    console.log('Thread ID:', threadId);

    const createdMessage = await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: input.message,
    });
    console.log('Created message:', createdMessage);

    const assistantId = process.env.OPENAI_ASSISTANT_ID;
    if (!assistantId) {
      throw new Error('OPENAI_ASSISTANT_ID is not set');
    }

    const responsePromise = AssistantResponse(
      { threadId, messageId: createdMessage.id },
      async ({ forwardStream, sendDataMessage }) => {
        const runStream = openai.beta.threads.runs.stream(threadId, {
          assistant_id: assistantId,
        });
        let runResult = await forwardStream(runStream);
        while (
          runResult?.status === 'requires_action' &&
          runResult.required_action?.type === 'submit_tool_outputs'
        ) {
          const tool_outputs =
            runResult.required_action.submit_tool_outputs.tool_calls.map(
              (toolCall: any) => {
                const parameters = JSON.parse(toolCall.function.arguments);
                // Handle tool calls here if needed
                return {};
              },
            );
          runResult = await forwardStream(
            openai.beta.threads.runs.submitToolOutputsStream(
              threadId,
              runResult.id,
              { tool_outputs },
            ),
          );
        }

        // Get the final response
        const messages = await openai.beta.threads.messages.list(threadId);
        const assistantMessages = messages.data.filter(msg => msg.role === 'assistant');
        if (assistantMessages.length > 0 && assistantMessages[0].content[0].type === 'text') {
          const fullResponse = assistantMessages[0].content[0].text.value;
          // Save the interaction to Heroku
          await saveToHeroku(input.message, fullResponse);
        }
      }
    );

    // Usa Promise.race para implementar un timeout
    return await Promise.race([responsePromise, timeoutPromise]);

  } catch (error) {
    console.error('Error in API route:', (error as Error).message);
    if (error instanceof Error && error.message === 'Request timeout') {
      return new NextResponse('Request timeout', { status: 504 });
    }
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

async function saveToHeroku(question: string, answer: string) {
  const url = 'https://prompt-handler-06fbef253337.herokuapp.com/insert/';
  const timestamp = new Date().toISOString();
  const data = [{
    pregunta: question,
    respuesta: answer,
    timestamp: timestamp,
    commit: `commit-${timestamp}`
  }];

  const username = process.env.API_USERNAME;
  const password = process.env.API_PASSWORD;

  if (!username || !password) {
    console.error('API_USERNAME or API_PASSWORD is not set');
    throw new Error('Authentication credentials are not set');
  }

  const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64');

  try {
    const response = await axios.post(url, data, {
      headers: {
        'Authorization': `Basic ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Response from Heroku:', response.data);
    if (response.data.message === '1 registros insertados correctamente') {
      console.log('Registro insertado correctamente');
    } else {
      console.log('No se pudo confirmar la inserción del registro');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error saving data to Heroku:', error.response?.data);
      console.error('Status code:', error.response?.status);
    } else {
      console.error('Error saving data to Heroku:', error);
    }
    throw error; // Re-throw the error to be handled by the caller
  }
}