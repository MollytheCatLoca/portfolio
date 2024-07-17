import axios from 'axios';
import dotenv from 'dotenv';
import { createParser } from 'eventsource-parser';

dotenv.config();

const testAssistantAPI = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/api/assist/',
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        threadId: null,
        message: 'Hola, ¿cómo estás?',
      },
      responseType: 'stream',
    });

    let aggregatedResponse = '';

    const parser = createParser(event => {
      if (event.type === 'event') {
        const data = event.data;
        try {
          const parsedData = JSON.parse(data);

          if (parsedData && parsedData.content && Array.isArray(parsedData.content)) {
            parsedData.content.forEach(contentItem => {
              if (contentItem.type === 'text') {
                aggregatedResponse += contentItem.text.value + ' ';
              }
            });
          }
        } catch (error) {
          console.error('Error parsing event data:', error);
        }
      }
    });

    response.data.on('data', chunk => {
      const chunkString = chunk.toString();
      parser.feed(chunkString);
    });

    response.data.on('end', () => {
      console.log('Stream ended');
      console.log('Aggregated Response:', aggregatedResponse.trim());
    });

  } catch (error) {
    console.error('Error during API request:', error.message);
  }
};

testAssistantAPI().catch(console.error);
