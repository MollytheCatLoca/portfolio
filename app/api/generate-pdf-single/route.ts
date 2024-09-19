import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const HEROKU_PDF_SERVICE_URL = process.env.HEROKU_PDF_SERVICE_URL || 'https://prompt-handler-06fbef253337.herokuapp.com/generate-pdf-single/';
const HEROKU_PDF_STATUS_URL = process.env.HEROKU_PDF_STATUS_URL || 'https://prompt-handler-06fbef253337.herokuapp.com/pdf-status/';
const HEROKU_PDF_DOWNLOAD_URL = process.env.HEROKU_PDF_DOWNLOAD_URL || 'https://prompt-handler-06fbef253337.herokuapp.com/download-pdf/';
const TIMEOUT = 300000; // 5 minutos de timeout
const INITIAL_DELAY = 1000; // 1 segundo de espera inicial
const MAX_RETRIES = 20;
const RETRY_DELAY = 1000; // 1 segundo entre intentos

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(req: NextRequest) {
    console.log("API route: POST request received for single scenario PDF generation");
    const startTime = Date.now();

    try {
        const requestData = await req.json();
        console.log("API route: Using data for single scenario PDF generation");

        // Asegúrate de que el servicio de Heroku espera este formato
        const dataToSend = {
            id: requestData.id,
            searchParams: requestData.searchParams,
            scenario: requestData.sceneData.scenario
        };

        const response = await axios.post(HEROKU_PDF_SERVICE_URL, dataToSend, {
            headers: { 'Content-Type': 'application/json' },
            timeout: TIMEOUT
        });

        const { job_id } = response.data;
        console.log('API route: Single scenario PDF generation job started with ID:', job_id);

        // Esperar antes de la primera verificación
        await wait(INITIAL_DELAY);

        for (let i = 0; i < MAX_RETRIES; i++) {
            try {
                const statusResponse = await axios.get(`${HEROKU_PDF_STATUS_URL}${job_id}`);
                const statusData = statusResponse.data;

                if (statusData.status === 'completed') {
                    const pdfResponse = await axios({
                        method: 'get',
                        url: `${HEROKU_PDF_DOWNLOAD_URL}${job_id}`,
                        responseType: 'arraybuffer'
                    });

                    console.log('API route: Single scenario PDF downloaded successfully. Size:', pdfResponse.data.byteLength, 'bytes');

                    return new NextResponse(pdfResponse.data, {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/pdf',
                            'Content-Disposition': `attachment; filename="${statusData.file_name}"`
                        }
                    });
                } else if (statusData.status === 'failed') {
                    throw new Error(`Single scenario PDF generation failed: ${statusData.error}`);
                }

                console.log(`API route: Single scenario PDF not ready, retrying in ${RETRY_DELAY / 1000} seconds. Attempt ${i + 1} of ${MAX_RETRIES}`);
                await wait(RETRY_DELAY);
            } catch (error) {
                console.error(`API route: Error checking single scenario PDF status (attempt ${i + 1}):`, error);
                await wait(RETRY_DELAY);
            }
        }

        throw new Error('Single scenario PDF generation timed out after maximum retries');

    } catch (error) {
        console.error('API route: Error generating single scenario PDF:', error);
        return NextResponse.json(
            { error: 'Failed to generate single scenario PDF', details: error.message },
            { status: 500 }
        );
    } finally {
        const endTime = Date.now();
        console.log(`API route: Total processing time for single scenario PDF: ${(endTime - startTime) / 1000} seconds`);
    }
}