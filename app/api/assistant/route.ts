import { AssistantResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req: Request) {
  try {
    // Parse the request body
    const input: {
      threadId: string | null;
      message: string;
    } = await req.json();

    // Create a thread if needed
    const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

    // Add a message to the thread
    const createdMessage = await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: input.message,
    });

    const assistantId = process.env.OPENAI_ASSISTANT_ID || '';

    if (!assistantId) {
      throw new Error('ASSISTANT_ID environment is not set');
    }

    return AssistantResponse(
      { threadId, messageId: createdMessage.id },
      async ({ forwardStream }) => {
        // Run the assistant on the thread
        const runStream = openai.beta.threads.runs.stream(threadId, {
          assistant_id: assistantId,
        });

        // forward run status would stream message deltas
        await forwardStream(runStream);
      },
    );
  } catch (error) {
    console.error('Error in API route:', (error as Error).message);
    return new Response('Internal Server Error', { status: 500 });
  }
}