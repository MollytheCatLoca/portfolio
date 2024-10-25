import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const HEROKU_PDF_SERVICE_URL = process.env.HEROKU_PDF_SERVICE_URL || 'https://prompt-handler-06fbef253337.herokuapp.com/generate-pdf/';
const HEROKU_PDF_STATUS_URL = process.env.HEROKU_PDF_STATUS_URL || 'https://prompt-handler-06fbef253337.herokuapp.com/pdf-status/';
const HEROKU_PDF_DOWNLOAD_URL = process.env.HEROKU_PDF_DOWNLOAD_URL || 'https://prompt-handler-06fbef253337.herokuapp.com/download-pdf/';
const TIMEOUT = 60000; // 1 minuto por solicitud
const INITIAL_DELAY = 2000; // 2 segundos de espera inicial
const MAX_RETRIES = 50;
const RETRY_DELAY = 5000; // 5 segundos entre intentos

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(req: NextRequest) {
    console.log("API route: POST request received for PDF generation");

    try {
        const requestData = await req.json();
        const response = await axios.post(HEROKU_PDF_SERVICE_URL, requestData, {
            headers: { 'Content-Type': 'application/json' },
            timeout: TIMEOUT
        });

        const { job_id } = response.data;
        console.log('API route: PDF generation job started with ID:', job_id);

        // Usar una función de bucle para manejar los reintentos sin bloquear
        return await checkPdfStatusLoop(job_id);

    } catch (error) {
        console.error('Error generating PDF:', error.message);
        return NextResponse.json({ error: 'Failed to generate PDF', details: error.message }, { status: 500 });
    }
}

async function checkPdfStatusLoop(job_id: string) {
    // Esperar antes de la primera verificación
    await wait(INITIAL_DELAY);

    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            const statusResponse = await axios.get(`${HEROKU_PDF_STATUS_URL}${job_id}`, {
                timeout: TIMEOUT // Timeout corto para cada verificación
            });
            const statusData = statusResponse.data;

            if (statusData.status === 'completed') {
                const pdfResponse = await axios({
                    method: 'get',
                    url: `${HEROKU_PDF_DOWNLOAD_URL}${job_id}`,
                    responseType: 'arraybuffer',
                    timeout: TIMEOUT // Timeout para la descarga
                });

                console.log('API route: PDF downloaded successfully. Size:', pdfResponse.data.byteLength, 'bytes');

                return new NextResponse(pdfResponse.data, {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/pdf',
                        'Content-Disposition': `attachment; filename="${statusData.file_name}"`
                    }
                });
            } else if (statusData.status === 'failed') {
                throw new Error(`PDF generation failed: ${statusData.error}`);
            }

            console.log(`API route: PDF not ready, retrying in ${RETRY_DELAY / 1000} seconds. Attempt ${i + 1} of ${MAX_RETRIES}`);

            // Uso de setImmediate para no bloquear la función serverless
            await new Promise((resolve) => setImmediate(async () => {
                await wait(RETRY_DELAY);
                resolve(true);
            }));

        } catch (error) {
            console.error(`Error checking PDF status (attempt ${i + 1}):`, error.message);
            await wait(RETRY_DELAY);
        }
    }

    throw new Error('PDF generation timed out after maximum retries');
}
