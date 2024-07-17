const OpenAI = require("openai");
const dotenv = require("dotenv");

// Cargar las variables de entorno desde .env.local
dotenv.config({ path: '.env.local' });

const apiKey = process.env.OPENAI_API_KEY;
const assistantId = process.env.OPENAI_ASSISTANT_ID;

if (!apiKey || !assistantId) {
    console.error("Las variables de entorno OPENAI_API_KEY y OPENAI_ASSISTANT_ID deben estar definidas");
    process.exit(1);
}

const openai = new OpenAI({ apiKey });

async function main() {
    try {
        const threadResponse = await openai.beta.threads.create();
        console.log('Thread response:', threadResponse);

        const messageResponse = await openai.beta.threads.messages.create(
            threadResponse.id,
            {
                role: 'user',
                content: '¿Qué son los parques solares ALL IN ONE?'
            }
        );
        console.log('Message response:', messageResponse);

        const stream = await openai.beta.threads.runs.create(
            threadResponse.id,
            {
                assistant_id: assistantId,
                stream: true
            }
        );

        for await (const event of stream) {
            console.log('Event:', event);

            if (event.event === 'thread.message.delta' && event.data.delta.content) {
                const content = event.data.delta.content.map(c => c.text.value).join(' ');
                console.log('Assistant response:', content);
            }

            if (event.event === 'thread.message.completed') {
                console.log('Final response:', event.data.content.map(c => c.text.value).join(' '));
                break; // Terminamos después de obtener la respuesta completa
            }
        }
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}

main();
