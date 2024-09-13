import { NextRequest, NextResponse } from 'next/server';
import { chromium } from 'playwright-core';
import { getChromium } from '@playwright/test';

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
        const executablePath = process.env.NODE_ENV === 'production'
            ? await getChromium().executablePath()
            : undefined;

        browser = await chromium.launch({ executablePath });
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto(pdfUrl, { waitUntil: 'networkidle' });

        const pdf = await page.pdf({
            format: 'A4',
            landscape: true,
            printBackground: true,
            margin: { top: '0cm', right: '0cm', bottom: '0cm', left: '0cm' },
        });

        const currentDate = new Date();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString().slice(-2);
        const dateString = `${month}-${year}`;
        const fileName = `BIS-Simulador-${searchParams.localidad || 'PVsit'}-${dateString}.pdf`;

        console.log('PDF generated successfully');
        console.log('File name:', fileName);

        return new NextResponse(pdf, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${fileName}"`,
            },
        });
    } catch (error) {
        console.error('Error generating PDF:', error);
        return new NextResponse(
            JSON.stringify({ error: 'Failed to generate PDF', details: error.message }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}