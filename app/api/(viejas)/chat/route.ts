import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';

export const runtime = 'edge';
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY || '' });

async function* asyncIterableStream(runStream: any) {
  for await (const event of runStream) {
    yield event;
  }
}

export async function POST(req: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new NextResponse('Missing OpenAI API Key.', { status: 400 });
    }

    const { messages } = await req.json();
    console.log('Received messages:', messages);

    // Reemplazar el rol 'system' por 'assistant'
    const transformedMessages = messages.map((message: any) => {
      if (message.role === 'system') {
        console.log('Replacing role "system" with "assistant" for message:', message);
        return { ...message, role: 'assistant' };
      }
      return message;
    });
    console.log('Transformed messages:', transformedMessages);

    // Crear un nuevo hilo (thread)
    const thread = await openai.beta.threads.create({});
    console.log('Thread created with ID:', thread.id);

    // Añadir el mensaje al hilo
    for (const message of transformedMessages) {
      try {
        await openai.beta.threads.messages.create(thread.id, {
          role: message.role,
          content: message.content,
        });
        console.log('Message added to thread:', message);
      } catch (messageError: any) {
        console.error('Error adding message to thread:', messageError.message);
        throw messageError;
      }
    }

    // Correr el hilo con el asistente
    const assistantId = process.env.OPENAI_ASSISTANT_ID || '';
    console.log('Using Assistant ID:', assistantId);

    const runStream = openai.beta.threads.runs.stream(thread.id, {
      assistant_id: assistantId,
    });

    // Convertir el stream del asistente a un formato compatible con OpenAIStream
    const stream = OpenAIStream(asyncIterableStream(runStream));
    console.log('Streaming response...');
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    console.error('Error occurred:', error.message, error.response?.data);
    return new NextResponse(error.message || 'Something went wrong!', {
      status: 500,
    });
  }
}
