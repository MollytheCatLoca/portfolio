import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const HEROKU_PDF_SERVICE_URL = process.env.HEROKU_PDF_SERVICE_URL || 'https://prompt-handler-06fbef253337.herokuapp.com/generate-pdf/';
const TIMEOUT = 120000; // 120 segundos de timeout

export async function POST(req: NextRequest) {
    console.log("API route: POST request received for PDF generation");
    const startTime = Date.now();

    try {
        const requestData = await req.json();
        console.log("API route: Using data for PDF generation");

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

        try {
            const response = await axios({
                method: 'post',
                url: HEROKU_PDF_SERVICE_URL,
                data: requestData,
                responseType: 'arraybuffer',
                timeout: TIMEOUT,
                signal: controller.signal,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            clearTimeout(timeoutId);

            console.log('API route: Received PDF from Heroku service. Size:', response.data.byteLength, 'bytes');
            const headers = response.headers;
            const fileName = headers['content-disposition']?.split('filename=')[1]?.replace(/"/g, '') || 'BIS-Simulador.pdf';

            return new NextResponse(response.data, {
                status: 200,
                headers: {
                    'Content-Type': 'application/pdf',
                    'Content-Disposition': `attachment; filename="${fileName}"`
                }
            });



        } catch (axiosError: any) {
            console.error('API route: Axios error:', axiosError.message);
            if (axiosError.response) {
                console.error('API route: Axios error response:', axiosError.response.data);
                console.error('API route: Axios error status:', axiosError.response.status);
                console.error('API route: Axios error headers:', axiosError.response.headers);
            } else if (axiosError.request) {
                console.error('API route: No response received:', axiosError.request);
            } else {
                console.error('API route: Error setting up request:', axiosError.message);
            }
            throw axiosError;
        }
    } catch (error) {
        console.error('API route: Error generating PDF:', error);
        return NextResponse.json(
            { error: 'Failed to generate PDF', details: error.message },
            { status: 500 }
        );
    } finally {
        const endTime = Date.now();
        console.log(`API route: Total processing time: ${(endTime - startTime) / 1000} seconds`);
    }
}