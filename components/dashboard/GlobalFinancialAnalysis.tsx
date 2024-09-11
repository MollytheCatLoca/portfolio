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
};

export default function GlobalFinancialAnalysis({ scenarios }: GlobalFinancialAnalysisProps) {
    console.log('Scenarios received:', scenarios);

    if (!scenarios || scenarios.length === 0) {
        console.log('No scenarios available');
        return <div>No hay datos financieros disponibles.</div>;
    }

    try {
        const financialMetrics = scenarios.map(scenario => {
            console.log('Processing scenario:', scenario.nombre);
            return {
                nombre: scenario.nombre,
                inversion: scenario.inversion.total,
                tir: scenario.inversion.tir,
                van: scenario.inversion.van,
                periodoRecuperacion: scenario.inversion.periodoRecuperacion
            };
        });
        console.log('Financial metrics:', financialMetrics);

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
        console.log('Combined cash flow:', combinedCashFlow);

        return (
            <section id= "finanzas" className = "mt-8" >
                <Card className="bg-black-200 border-gray-800" >
                    <CardHeader>
                    <CardTitle className="text-xl font-bold text-white" > Análisis Financiero Global </CardTitle>
                        </CardHeader>
                        < CardContent >
                        <div className="mb-6" style = {{ height: '400px', width: '100%' }
    }>
        <h3 className="text-lg font-semibold mb-2 text-white" > Métricas Financieras </h3>
            < ResponsiveContainer width = "100%" height = { 300} >
                <BarChart data={ financialMetrics } margin = {{ top: 20, right: 30, left: 20, bottom: 5 }
}>
    <CartesianGrid strokeDasharray="3 3" stroke = "#4a5568" />
        <XAxis dataKey="nombre" stroke = "#718096" />
            <YAxis yAxisId="left" orientation = "left" stroke = "#718096" />
                <YAxis yAxisId="right" orientation = "right" stroke = "#718096" />
                    <Tooltip
                                        contentStyle={ { backgroundColor: '#2D3748', border: '1px solid #4A5568' } }
labelStyle = {{ color: '#E2E8F0' }}
itemStyle = {{ color: '#A0AEC0' }}
                                    />
    < Legend wrapperStyle = {{ color: '#A0AEC0' }} />
        < Bar yAxisId = "left" dataKey = "inversion" fill = "#4299E1" name = "Inversión Total (MUSD)" />
            <Bar yAxisId="left" dataKey = "van" fill = "#48BB78" name = "VAN (MUSD)" />
                <Bar yAxisId="right" dataKey = "tir" fill = "#ED8936" name = "TIR (%)" />
                    </BarChart>
                    </ResponsiveContainer>
                    </div>
                    < div style = {{ height: '400px', width: '100%' }}>
                        <h3 className="text-lg font-semibold mb-2 text-white" > Flujo de Caja Acumulado </h3>
                            < ResponsiveContainer width = "100%" height = { 300} >
                                <LineChart data={ combinedCashFlow } margin = {{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke = "#4a5568" />
                                        <XAxis dataKey="año" stroke = "#718096" />
                                            <YAxis stroke="#718096" />
                                                <Tooltip
                                        contentStyle={ { backgroundColor: '#2D3748', border: '1px solid #4A5568' } }
labelStyle = {{ color: '#E2E8F0' }}
itemStyle = {{ color: '#A0AEC0' }}
                                    />
    < Legend wrapperStyle = {{ color: '#A0AEC0' }} />
{
    scenarios.map((scenario, index) => (
        <Line
                                            key= { scenario.id_escenario }
                                            type = "monotone"
                                            dataKey = { scenario.nombre }
                                            stroke = {`hsl(${index * 120}, 70%, 50%)`}
name = { scenario.nombre }
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