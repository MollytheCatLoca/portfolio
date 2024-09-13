import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer';

export async function POST(req: NextRequest) {
    console.log('PDF generation request received');

    const body = await req.json();
    const { searchParams, sceneData } = body;

    console.log('Received sceneData:', JSON.stringify(sceneData, null, 2));

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const pdfUrl = `${baseUrl}/energy/dashboard-pdf?${new URLSearchParams(searchParams).toString()}`;

    console.log('Generating PDF for URL:', pdfUrl);

    let browser;
    try {
        browser = await puppeteer.launch({
            headless: "new",
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        await page.evaluateOnNewDocument(`
            window.initialSceneData = ${JSON.stringify({ queryParams: searchParams })};
            console.log('Data injected into page:', JSON.stringify(window.initialSceneData, null, 2));
        `);

        await page.setViewport({
            width: 1920,
            height: 1080,
            deviceScaleFactor: 1,
        });

        await page.goto(pdfUrl, {
            waitUntil: 'networkidle0',
            timeout: 60000
        });

        page.on('console', msg => console.log('PAGE LOG:', msg.text()));

        const pdf = await page.pdf({
            format: 'A4',
            landscape: true,
            printBackground: true,
            margin: { top: '0cm', right: '0cm', bottom: '0cm', left: '0cm' },
            scale: 1,
        });

        // Obtener la fecha actual en formato MM-YY
        const currentDate = new Date();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString().slice(-2);
        const dateString = `${month}-${year}`;

        // Crear el nombre del archivo

        const fileName = `BIS-Simulador-${searchParams.localidad || 'PVsit'}-${dateString}.pdf`;
        const encodedFileName = encodeURIComponent(fileName);

        console.log('PDF generated successfully');
        console.log('File name:', fileName);

        return new NextResponse(pdf, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${encodedFileName}"`,
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to generate PDF', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}