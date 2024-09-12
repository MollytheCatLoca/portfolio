// components/GeneratePDFButton.tsx
'use client';

import { useQueryParams } from "@/context/QueryParamsContext";
import { Button } from '@/components/ui/button';

export default function GeneratePDFButton({ scenarios }) {
    const { queryParams } = useQueryParams();

    const handleGeneratePDF = async () => {
        const sceneData = {
            scenarios: scenarios,
            queryParams: queryParams
        };

        console.log('Data being sent for PDF generation:', JSON.stringify(sceneData, null, 2));

        try {
            const response = await fetch('/api/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    searchParams: queryParams,
                    sceneData: sceneData
                }),
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'dashboard.pdf';
                document.body.appendChild(a);
                a.click();
                a.remove();
            } else {
                const errorText = await response.text();
                console.error('Error generating PDF:', errorText);
            }
        } catch (error) {
            console.error('Error in PDF generation process:', error);
        }
    };

    return (
        <Button onClick= { handleGeneratePDF } >
        Generar PDF
            </Button>
    );
}