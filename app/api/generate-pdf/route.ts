import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const HEROKU_PDF_SERVICE_URL = process.env.HEROKU_PDF_SERVICE_URL || 'https://prompt-handler-06fbef253337.herokuapp.com/generate-pdf/';
const TIMEOUT = 30000; // Ajuste a 30 segundos para evitar timeout de Vercel

export async function POST(req: NextRequest) {
    console.log("API route: POST request received for PDF generation");

    try {
        const requestData = await req.json();
        console.log("API route: Received request data:", JSON.stringify(requestData));

        // Iniciar la generación del PDF
        const response = await axios.post(HEROKU_PDF_SERVICE_URL, requestData, {
            headers: { 'Content-Type': 'application/json' },
            timeout: TIMEOUT
        });

        const { job_id } = response.data;
        console.log(`API route: PDF generation job started with ID: ${job_id}`);

        // Redirigir al nuevo endpoint para manejo de buffer
        const downloadUrl = `/api/download-buffer?job_id=${job_id}`;
        return NextResponse.json({ redirectUrl: downloadUrl }, { status: 202 });

    } catch (error) {
        console.error('API route: Error initiating PDF generation:', error.message);
        return NextResponse.json({ error: 'Failed to initiate PDF generation', details: error.message }, { status: 500 });
    }
}
