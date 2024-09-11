'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type FinancialAnalysisProps = {
    inversion: {
        total: number;
        unidad: string;
        tir: number;
        van: number;
    };
    analisisFinanciero: Array<{
        año: number;
        generacion: number;
        ingresos: number;
        cuotaInversion: number;
    }>;
};

export default function FinancialAnalysis({ inversion, analisisFinanciero }: FinancialAnalysisProps) {
    if (!inversion || !analisisFinanciero || !Array.isArray(analisisFinanciero)) {
        console.error('Error: Datos inválidos recibidos.');
        return (
            <Card className= "bg-black-200 border-gray-800" >
            <CardContent>Error: No se han recibido datos correctos.</CardContent>
                </Card>
        );
    }

    return (
        <section id= "finanzas" className = "mt-8" >
            <Card className="bg-black-200 border-gray-800" >
                <CardHeader>
                <CardTitle className="text-xl font-bold text-white" > Análisis Financiero </CardTitle>
                    </CardHeader>
                    < CardContent >
                    <ResponsiveContainer width="100%" height = { 400} >
                        <BarChart data={ analisisFinanciero }>
                            <CartesianGrid strokeDasharray="3 3" stroke = "#4a5568" />
                                <XAxis dataKey="año" stroke = "#718096" />
                                    <YAxis
                                stroke="#718096"
    label = {{
        value: `MUSD`,
            angle: -90,
                position: 'insideLeft',
                    fill: '#718096',
                                }
}
                            />
    < Tooltip
contentStyle = {{ backgroundColor: '#2D3748', border: '1px solid #4A5568' }}
labelStyle = {{ color: '#E2E8F0' }}
itemStyle = {{ color: '#A0AEC0' }}
                            />
    < Legend wrapperStyle = {{ color: '#A0AEC0' }} />
        < Bar dataKey = "ingresos" fill = "#48BB78" name = "Ingresos" />
            <Bar dataKey="cuotaInversion" fill = "#F56565" name = "Cuota Inversión" />
                </BarChart>
                </ResponsiveContainer>
                < div className = "mt-6 grid grid-cols-1 md:grid-cols-3 gap-6" >
                    <div className="text-center p-4 bg-gray-800 bg-opacity-50 rounded-lg" >
                        <p className="text-sm text-gray-300 mb-2" > Inversión Total </p>
                            < p className = "text-2xl font-bold text-white" > { inversion.total } { inversion.unidad } </p>
                                </div>
                                < div className = "text-center p-4 bg-gray-800 bg-opacity-50 rounded-lg" >
                                    <p className="text-sm text-gray-300 mb-2" > TIR </p>
                                        < p className = "text-2xl font-bold text-white" > { inversion.tir } % </p>
                                            </div>
                                            < div className = "text-center p-4 bg-gray-800 bg-opacity-50 rounded-lg" >
                                                <p className="text-sm text-gray-300 mb-2" > VAN </p>
                                                    < p className = "text-2xl font-bold text-white" > { inversion.van } { inversion.unidad } </p>
                                                        </div>
                                                        </div>
                                                        </CardContent>
                                                        </Card>
                                                        </section>
    );
}
