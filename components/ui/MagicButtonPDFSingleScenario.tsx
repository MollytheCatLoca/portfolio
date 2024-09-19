'use client';

import React, { useState } from "react";
import { useQueryParams } from "@/context/QueryParamsContext";
import { Sparkles } from 'lucide-react';

interface MagicButtonPDFSingleScenarioProps {
    scenario: any;
    id: string;
}

export default function MagicButtonPDFSingleScenario({ scenario, id }: MagicButtonPDFSingleScenarioProps) {
    const { queryParams } = useQueryParams();
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGeneratePDF = async () => {
        setIsGenerating(true);
        setError(null);
        const sceneData = {
            scenario: scenario,
            queryParams: queryParams
        };

        console.log('Data being sent for PDF generation:', JSON.stringify(sceneData, null, 2));

        try {
            const response = await fetch('/api/generate-pdf-single', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    searchParams: queryParams,
                    sceneData: sceneData
                }),
            });

            if (response.ok) {
                const blob = await response.blob();

                const currentDate = new Date();
                const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                const year = currentDate.getFullYear().toString().slice(-2);
                const dateString = `${month}-${year}`;
                const fileName = `BIS-Simulador-${scenario.ubicacion.ciudad || 'PVsit'}-${dateString}.pdf`;

                console.log('MAGIC BUTTON: PDF generated successfully');
                console.log('MAGIC BUTTON: File name:', fileName);

                const file = new File([blob], fileName, { type: 'application/pdf' });
                const url = window.URL.createObjectURL(file);

                const a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                window.URL.revokeObjectURL(url);
            } else {
                const errorText = await response.text();
                console.error('MAGIC BUTTON: Error generating PDF:', errorText);
                setError('Error al generar el PDF. Por favor, inténtelo de nuevo.');
            }
        } catch (error) {
            console.error('MAGIC BUTTON: Error in PDF generation process:', error);
            setError('Error en el proceso de generación del PDF. Por favor, inténtelo de nuevo.');
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div>
        <button
                onClick= { handleGeneratePDF }
    disabled = { isGenerating }
    className = "relative inline-flex h-12 w-full md:w-60 md:mt-10 overflow-hidden rounded-lg p-[1px] focus:outline-none"
        >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2" >
                <Sparkles className="h-5 w-5" />
                    { isGenerating? 'Generando PDF...': 'Generar PDF' }
                    </span>
                    </button>
    {
        error && (
            <p className="mt-2 text-red-500 text-sm" > { error } </p>
            )
    }
    </div>
    );
}