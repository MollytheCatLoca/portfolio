'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

type Scenario = {
    id_escenario: number;
    nombre: string;
    inversion: {
        total: number;
        unidad: string;
        periodoRecuperacion: number;
        tir: number;
        van: number;
    };
    analisisFinanciero: Array<{
        año: number;
        ingresos: number;
        cuotaInversion: number;
    }>;
};

type GlobalFinancialAnalysisProps = {
    scenarios: Scenario[];
    isPDF?: boolean;
};

export default function GlobalFinancialAnalysis({ scenarios, isPDF = false }: GlobalFinancialAnalysisProps) {
    if (!scenarios || scenarios.length === 0) {
        console.log('No scenarios available');
        return <div>No hay datos financieros disponibles.</div>;
    }

    const chartHeight = isPDF ? 190 : 250;
    const fontSize = isPDF ? 8 : 12;
    const titleFontSize = isPDF ? '14px' : '18px';
    const subtitleFontSize = isPDF ? '12px' : '16px';

    try {
        const financialMetrics = scenarios.map(scenario => ({
            nombre: scenario.nombre,
            inversion: scenario.inversion.total,
            tir: scenario.inversion.tir,
            van: scenario.inversion.van,
            periodoRecuperacion: scenario.inversion.periodoRecuperacion
        }));

        const cumulativeCashFlow = scenarios.map(scenario => {
            let cumulativeFlow = -scenario.inversion.total;
            return scenario.analisisFinanciero.map(year => {
                cumulativeFlow += year.ingresos - year.cuotaInversion;
                return {
                    año: year.año,
                    [scenario.nombre]: cumulativeFlow
                };
            });
        });

        const combinedCashFlow = cumulativeCashFlow[0].map((item, index) => {
            const combined = { año: item.año };
            scenarios.forEach((scenario, i) => {
                combined[scenario.nombre] = cumulativeCashFlow[i][index][scenario.nombre];
            });
            return combined;
        });

        return (
            <section id= "finanzas" className = {`mt-8 ${isPDF ? 'pdf-finance' : ''}`
    }>
        <Card className="bg-black-200 border-gray-800" >
            <CardHeader>
            <CardTitle className="text-xl font-bold text-white" style = {{ fontSize: titleFontSize }
}>
    Análisis Financiero Global
        </CardTitle>
        </CardHeader>
        < CardContent >
        <div className="mb-6" style = {{ height: isPDF ? '200px' : '400px', width: '100%' }}>
            <h3 className="text-lg font-semibold mb-2 text-white" style = {{ fontSize: subtitleFontSize }}>
                Métricas Financieras
                    </h3>
                    < ResponsiveContainer width = "100%" height = { chartHeight } >
                        <BarChart data={ financialMetrics } margin = {{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke = "#4a5568" />
                                <XAxis dataKey="nombre" stroke = "#718096" fontSize = { fontSize } />
                                    <YAxis yAxisId="left" orientation = "left" stroke = "#718096" fontSize = { fontSize } />
                                        <YAxis yAxisId="right" orientation = "right" stroke = "#718096" fontSize = { fontSize } />
                                            <Tooltip
                                        contentStyle={ { backgroundColor: '#2D3748', border: '1px solid #4A5568' } }
labelStyle = {{ color: '#E2E8F0', fontSize: fontSize }}
itemStyle = {{ color: '#A0AEC0', fontSize: fontSize }}
                                    />
    < Legend wrapperStyle = {{ color: '#A0AEC0', fontSize: fontSize }} />
        < Bar yAxisId = "left" dataKey = "inversion" fill = "#4299E1" name = "Inversión Total (MUSD)" />
            <Bar yAxisId="left" dataKey = "van" fill = "#48BB78" name = "VAN (MUSD)" />
                <Bar yAxisId="right" dataKey = "tir" fill = "#ED8936" name = "TIR (%)" />
                    </BarChart>
                    </ResponsiveContainer>
                    </div>
                    < div style = {{ height: isPDF ? '200px' : '400px', width: '100%' }}>
                        <h3 className="text-lg font-semibold mb-2 text-white" style = {{ fontSize: subtitleFontSize }}>
                            Flujo de Caja Acumulado
                                </h3>
                                < ResponsiveContainer width = "100%" height = { chartHeight } >
                                    <LineChart data={ combinedCashFlow } margin = {{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke = "#4a5568" />
                                            <XAxis dataKey="año" stroke = "#718096" fontSize = { fontSize } />
                                                <YAxis stroke="#718096" fontSize = { fontSize } />
                                                    <Tooltip
                                        contentStyle={ { backgroundColor: '#2D3748', border: '1px solid #4A5568' } }
labelStyle = {{ color: '#E2E8F0', fontSize: fontSize }}
itemStyle = {{ color: '#A0AEC0', fontSize: fontSize }}
                                    />
    < Legend wrapperStyle = {{ color: '#A0AEC0', fontSize: fontSize }} />
{
    scenarios.map((scenario, index) => (
        <Line
                                            key= { scenario.id_escenario }
                                            type = "monotone"
                                            dataKey = { scenario.nombre }
                                            stroke = {`hsl(${index * 120}, 70%, 50%)`}
name = { scenario.nombre }
strokeWidth = { isPDF? 1: 2 }
    />
                                    ))}
</LineChart>
    </ResponsiveContainer>
    </div>
    </CardContent>
    </Card>
    </section>
        );
    } catch (error) {
    console.error('Error rendering GlobalFinancialAnalysis:', error);
    return <div>Error al renderizar el análisis financiero.Por favor, intente de nuevo más tarde.</div>;
}
}