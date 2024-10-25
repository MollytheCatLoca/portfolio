import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const HEROKU_PDF_STATUS_URL = process.env.HEROKU_PDF_STATUS_URL || 'https://prompt-handler-06fbef253337.herokuapp.com/pdf-status/';
const HEROKU_PDF_DOWNLOAD_URL = process.env.HEROKU_PDF_DOWNLOAD_URL || 'https://prompt-handler-06fbef253337.herokuapp.com/download-pdf/';
const TIMEOUT = 30000; // Timeout para evitar bloqueos prolongados
const MAX_RETRIES = 30;
const RETRY_DELAY = 5000; // 5 segundos entre reintentos

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const job_id = searchParams.get('job_id');

    if (!job_id) {
        return NextResponse.json({ error: 'Missing job_id' }, { status: 400 });
    }

    console.log(`download-buffer: Starting buffer for job ${job_id}`);

    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            console.log(`download-buffer: Checking status for job ${job_id}, attempt ${i + 1}`);

            const statusResponse = await axios.get(`${HEROKU_PDF_STATUS_URL}${job_id}`, {
                timeout: TIMEOUT
            });
            const statusData = statusResponse.data;

            if (statusData.status === 'completed') {
                console.log(`download-buffer: Job ${job_id} completed. Attempting to download PDF...`);

                const pdfResponse = await axios({
                    method: 'get',
                    url: `${HEROKU_PDF_DOWNLOAD_URL}${job_id}`,
                    responseType: 'arraybuffer',
                    timeout: TIMEOUT
                });

                console.log('download-buffer: PDF downloaded successfully. Returning PDF to client.');

                return new NextResponse(pdfResponse.data, {
                    status: 200,
                    headers: {
                        'Content-Type': 'application/pdf',
                        'Content-Disposition': `attachment; filename="generated.pdf"`
                    }
                });
            } else if (statusData.status === 'failed') {
                throw new Error(`PDF generation failed for job ${job_id}`);
            }

            console.log(`download-buffer: Job ${job_id} not ready. Retrying in ${RETRY_DELAY / 1000} seconds.`);
            await wait(RETRY_DELAY);

        } catch (error) {
            console.error(`download-buffer: Error checking PDF status for job ${job_id} (attempt ${i + 1}):`, error.message);
            await wait(RETRY_DELAY);
        }
    }

    console.error(`download-buffer: Max retries reached for job ${job_id}. PDF not available.`);
    return NextResponse.json({ error: 'PDF generation timed out after maximum retries' }, { status: 500 });
}
