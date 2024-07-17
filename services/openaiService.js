import OpenAI from "openai";

const openai = new OpenAI();

export async function createThread() {
  try {
    const emptyThread = await openai.beta.threads.create();
    return emptyThread;
  } catch (error) {
    throw new Error(`Error creating thread: ${error.message}`);
  }
}

export async function retrieveThread(threadId) {
  try {
    const myThread = await openai.beta.threads.retrieve(threadId);
    return myThread;
  } catch (error) {
    throw new Error(`Error retrieving thread: ${error.message}`);
  }
}

export async function runThread(threadId, assistantId) {
  try {
    const stream = await openai.beta.threads.runs.create(threadId, {
      assistant_id: assistantId,
      stream: true,
    });

    const events = [];
    for await (const event of stream) {
      events.push(event);
    }

    return events;
  } catch (error) {
    throw new Error(`Error running thread: ${error.message}`);
  }
}

export async function listThreadRuns(threadId) {
  try {
    const runs = await openai.beta.threads.runs.list(threadId);
    return runs.data.map(run => run.instructions);
  } catch (error) {
    throw new Error(`Error listing thread runs: ${error.message}`);
  }
}

export async function askQuestion(threadId, question) {
  try {
    const stream = await openai.beta.threads.createAndRun({
      assistant_id: process.env.OPENAI_ASSISTANT_ID,
      thread: {
        messages: [
          {
            role: 'user',
            content: question,
          },
        ],
      },
      stream: true,
    });

    const events = [];
    for await (const event of stream) {
      events.push(event);
    }

    return events;
  } catch (error) {
    throw new Error(`Error asking question: ${error.message}`);
  }
}

export async function sendMessage(threadId, message) {
  try {
    const stream = await openai.beta.threads.createAndRun({
      assistant_id: process.env.OPENAI_ASSISTANT_ID,
      thread: {
        messages: [
          {
            role: 'user',
            content: message,
          },
        ],
      },
      stream: true,
    });

    const events = [];
    for await (const event of stream) {
      events.push(event);
    }

    return events;
  } catch (error) {
    throw new Error(`Error sending message: ${error.message}`);
  }
}
