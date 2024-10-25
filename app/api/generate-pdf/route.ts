import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const HEROKU_PDF_SERVICE_URL = process.env.HEROKU_PDF_SERVICE_URL || 'https://prompt-handler-06fbef253337.herokuapp.com/generate-pdf/';
const HEROKU_PDF_STATUS_URL = process.env.HEROKU_PDF_STATUS_URL || 'https://prompt-handler-06fbef253337.herokuapp.com/pdf-status/';
const HEROKU_PDF_DOWNLOAD_URL = process.env.HEROKU_PDF_DOWNLOAD_URL || 'https://prompt-handler-06fbef253337.herokuapp.com/download-pdf/';
const TIMEOUT = 300000; // 5 minutos de timeout

export async function POST(req: NextRequest) {
    console.log("API route: POST request received for PDF generation");

    try {
        const requestData = await req.json();
        console.log("API route: Using data for PDF generation");

        // Iniciar la generación del PDF
        const response = await axios.post(HEROKU_PDF_SERVICE_URL, requestData, {
            headers: { 'Content-Type': 'application/json' },
            timeout: TIMEOUT
        });

        const { job_id } = response.data;
        console.log('API route: PDF generation job started with ID:', job_id);

        // Devolver el job_id inmediatamente al cliente
        return NextResponse.json({ job_id }, { status: 202 });

    } catch (error) {
        console.error('API route: Error initiating PDF generation:', error.message);
        return NextResponse.json({ error: 'Failed to initiate PDF generation', details: error.message }, { status: 500 });
    }
}

// Nuevo handler para consultar el estado del PDF
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const job_id = searchParams.get('job_id');

    if (!job_id) {
        return NextResponse.json({ error: 'Missing job_id' }, { status: 400 });
    }

    try {
        const statusResponse = await axios.get(`${HEROKU_PDF_STATUS_URL}${job_id}`);
        const statusData = statusResponse.data;

        if (statusData.status === 'completed') {
            const pdfResponse = await axios({
                method: 'get',
                url: `${HEROKU_PDF_DOWNLOAD_URL}${job_id}`,
                responseType: 'arraybuffer'
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
            return NextResponse.json({ error: 'PDF generation failed' }, { status: 500 });
        }

        // Si el PDF aún no está listo, informar al cliente
        return NextResponse.json({ status: 'in-progress' }, { status: 202 });

    } catch (error) {
        console.error('API route: Error checking PDF status:', error.message);
        return NextResponse.json({ error: 'Failed to check PDF status', details: error.message }, { status: 500 });
    }
}
