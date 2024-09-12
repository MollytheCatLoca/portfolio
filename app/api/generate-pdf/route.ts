// app/api/generate-pdf/route.ts
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

        await page.goto(pdfUrl, {
            waitUntil: 'networkidle0',
            timeout: 60000
        });

        // Captura logs de la página
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));

        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
        });

        console.log('PDF generated successfully');

        return new NextResponse(pdf, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename=dashboard.pdf',
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