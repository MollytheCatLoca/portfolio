import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const HEROKU_PDF_SERVICE_URL = process.env.HEROKU_PDF_SERVICE_URL || 'https://prompt-handler-06fbef253337.herokuapp.com/generate-pdf/';
const HEROKU_PDF_STATUS_URL = process.env.HEROKU_PDF_STATUS_URL || 'https://prompt-handler-06fbef253337.herokuapp.com/pdf-status/';
const HEROKU_PDF_DOWNLOAD_URL = process.env.HEROKU_PDF_DOWNLOAD_URL || 'https://prompt-handler-06fbef253337.herokuapp.com/download-pdf/';
const TIMEOUT = 60000; // 1 minuto por solicitud
const INITIAL_DELAY = 2000; // 2 segundos de espera inicial
const MAX_RETRIES = 50;
const RETRY_DELAY = 5000; // 5 segundos entre intentos
const DOWNLOAD_RETRY_DELAY = 2000; // 2 segundos entre intentos de descarga
const DOWNLOAD_MAX_RETRIES = 5;

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
                // Agregar una espera adicional antes de intentar la descarga para dar tiempo al sistema
                await wait(DOWNLOAD_RETRY_DELAY);

                const pdf = await downloadPdfWithRetries(job_id);
                if (pdf) return pdf;

                throw new Error('PDF was marked as completed, but could not be downloaded.');
            } else if (statusData.status === 'failed') {
                throw new Error(`PDF generation failed: ${statusData.error}`);
            }

            console.log(`API route: PDF not ready, retrying in ${RETRY_DELAY / 1000} seconds. Attempt ${i + 1} of ${MAX_RETRIES}`);

            await wait(RETRY_DELAY);

        } catch (error) {
            console.error(`Error checking PDF status (attempt ${i + 1}):`, error.message);
            await wait(RETRY_DELAY);
        }
    }

    throw new Error('PDF generation timed out after maximum retries');
}

async function downloadPdfWithRetries(job_id: string) {
    for (let j = 0; j < DOWNLOAD_MAX_RETRIES; j++) {
        try {
            const pdfResponse = await axios({
                method: 'get',
                url: `${HEROKU_PDF_DOWNLOAD_URL}${job_id}`,
                responseType: 'arraybuffer',
                timeout: TIMEOUT
            });

            console.log('API route: PDF downloaded successfully. Size:', pdfResponse.data.byteLength, 'bytes');

            return new NextResponse(pdfResponse.data, {
                status: 200,
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment; filename="generated.pdf"`
                }
            });

        } catch (error) {
            console.error(`Attempt ${j + 1} to download PDF failed. Retrying in ${DOWNLOAD_RETRY_DELAY / 1000} seconds...`);
            await wait(DOWNLOAD_RETRY_DELAY);
        }
    }

    console.error('All attempts to download the completed PDF failed.');
    return null;
}
