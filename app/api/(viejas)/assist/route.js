import { AssistantResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(req, res) {
  try {
    const input = await req.json();
    const threadId = input.threadId ?? (await openai.beta.threads.create({})).id;

    console.log('Thread ID before sending message:', threadId);

    const createdMessage = await openai.beta.threads.messages.create(threadId, {
      role: 'user',
      content: input.message,
    });

    console.log('Created Message:', createdMessage);

    const assistantId = process.env.OPENAI_ASSISTANT_ID || '';

    if (!assistantId) {
      throw new Error('ASSISTANT_ID environment is not set');
    }

    return AssistantResponse(
      { threadId, messageId: createdMessage.id },
      async ({ forwardStream }) => {
        const runStream = openai.beta.threads.runs.stream(threadId, {
          assistant_id: assistantId,
        });

        await forwardStream(runStream);
      },
    );
  } catch (error) {
    console.error('Error in API route:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
