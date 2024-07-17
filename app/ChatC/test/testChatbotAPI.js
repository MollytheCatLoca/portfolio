// testAssistantAPI.mjs
import fetch from 'node-fetch';

async function testAssistantAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/assistant', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        threadId: null,
        message: "Hola, ¿cómo estás?",
      }),
    });

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: readerDone } = await reader.read();
      done = readerDone;
      const chunk = decoder.decode(value, { stream: true });
      console.log("Received chunk:", chunk);
    }

    console.log("Stream ended");
  } catch (error) {
    console.error('Error:', error);
  }
}

testAssistantAPI();
