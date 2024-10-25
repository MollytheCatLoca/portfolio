import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const HEROKU_PDF_DOWNLOAD_URL = process.env.HEROKU_PDF_DOWNLOAD_URL || 'https://prompt-handler-06fbef253337.herokuapp.com/download-pdf/';
const TIMEOUT = 30000;
const DOWNLOAD_RETRY_DELAY = 2000;
const DOWNLOAD_MAX_RETRIES = 5;

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const job_id = searchParams.get('job_id');

    if (!job_id) {
        console.log(`[${new Date().toISOString()}] [ERROR] Missing job_id`);
        return NextResponse.json({ error: 'Missing job_id' }, { status: 400 });
    }

    console.log(`[${new Date().toISOString()}] [INFO] download-buffer: Starting buffer for job ${job_id}`);

    for (let j = 0; j < DOWNLOAD_MAX_RETRIES; j++) {
        const downloadAttemptTime = new Date().toISOString();
        console.log(`[${downloadAttemptTime}] [INFO] Attempt ${j + 1} to download PDF for job ${job_id}`);

        try {
            const pdfResponse = await axios({
                method: 'get',
                url: `${HEROKU_PDF_DOWNLOAD_URL}${job_id}`,
                responseType: 'arraybuffer',
                timeout: TIMEOUT
            });

            console.log(`[${new Date().toISOString()}] [SUCCESS] PDF downloaded successfully for job ${job_id}.`);
            return new NextResponse(pdfResponse.data, {
                status: 200,
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment; filename="generated.pdf"`
                }
            });

        } catch (error) {
            console.error(`[${new Date().toISOString()}] [ERROR] attemptDownloadWithRetries: Download attempt ${j + 1} failed for job ${job_id}: ${error.message}`);
            await wait(DOWNLOAD_RETRY_DELAY);
        }
    }

    console.error(`[${new Date().toISOString()}] [ERROR] All attempts to download PDF failed for job ${job_id}.`);
    return NextResponse.json({ error: 'Failed to download PDF after multiple attempts.' }, { status: 500 });
}
