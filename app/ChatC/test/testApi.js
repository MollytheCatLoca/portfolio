import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const testAssistantAPI = async () => {
  try {
    const response = await axios({
      method: 'post',
      url: 'http://localhost:3000/api/assistant',
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

    response.data.on('data', (chunk) => {
      const chunkString = chunk.toString();
      console.log('Received chunk:', chunkString);
      aggregatedResponse += chunkString;
    });

    response.data.on('end', () => {
      console.log('Stream ended');
      console.log('Aggregated Response:', aggregatedResponse);

      // Procesar la respuesta para extraer los mensajes de texto
      const cleanText = extractCleanText(aggregatedResponse);
      console.log('Processed Clean Text:', cleanText);
    });

  } catch (error) {
    console.error('Error during API request:', error.message);
  }
};

const extractCleanText = (aggregatedResponse) => {
  const messageChunks = aggregatedResponse.split(/(?<=\})\n/).filter(Boolean);
  let cleanText = '';

  messageChunks.forEach(chunk => {
    try {
      const jsonObj = JSON.parse(chunk);

      if (jsonObj && jsonObj.content && Array.isArray(jsonObj.content)) {
        jsonObj.content.forEach(contentItem => {
          if (contentItem.type === 'text') {
            cleanText += contentItem.text.value + ' ';
          }
        });
      }
    } catch (error) {
      // Continue processing other chunks even if one fails
    }
  });

  return cleanText.trim();
};

testAssistantAPI().catch(console.error);
