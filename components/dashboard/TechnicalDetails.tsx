'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Settings } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, CartesianGrid, XAxis, YAxis, Bar, ResponsiveContainer } from 'recharts';


type TechnicalDetailsProps = {
    detallesTecnicos: {
        tipoPaneles: string;
        eficienciaPaneles: number;
        vidaUtilEstimada: number;
        degradacionAnual: number;
    };
    capacidad: {
        actual: number;
        maxima: number;
        unidad: string;
        paneles: number;
        inversores: number;
    };
};

export default function TechnicalDetails({ detallesTecnicos, capacidad }: TechnicalDetailsProps) {
    // Crear datos de degradación a lo largo de la vida útil estimada
    const degradationData = Array.from({ length: detallesTecnicos.vidaUtilEstimada }, (_, i) => ({
        año: i + 1,
        eficiencia: detallesTecnicos.eficienciaPaneles * Math.pow(1 - detallesTecnicos.degradacionAnual / 100, i)
    }));

    return (
        <Card className= "bg-black-200 border-gray-800" >
        <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center" >
            <Settings className="mr-2" /> Detalles Técnicos
                </CardTitle>
                </CardHeader>
                < CardContent >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4" >
                    <div>
                    <p className="text-sm text-gray-400" > Tipo de Paneles </p>
                        < p className = "font-semibold text-white" > { detallesTecnicos.tipoPaneles } </p>
                            </div>
                            < div >
                            <p className="text-sm text-gray-400" > Eficiencia Inicial </p>
                                < p className = "font-semibold text-white" > { detallesTecnicos.eficienciaPaneles } % </p>
                                    </div>
                                    < div >
                                    <p className="text-sm text-gray-400" > Vida Útil Estimada </p>
                                        < p className = "font-semibold text-white" > { detallesTecnicos.vidaUtilEstimada } años </p>
                                            </div>
                                            < div >
                                            <p className="text-sm text-gray-400" > Degradación Anual </p>
                                                < p className = "font-semibold text-white" > { detallesTecnicos.degradacionAnual } % </p>
                                                    </div>
                                                    </div>
                                                    < div style = {{ width: '100%', height: 300 }
}>
    <ResponsiveContainer>
    <BarChart data={ degradationData }>
        <CartesianGrid strokeDasharray="3 3" stroke = "#4a5568" />
            <XAxis dataKey="año" stroke = "#718096" />
                <YAxis stroke="#718096" />
                    <Tooltip
                                contentStyle={ { backgroundColor: '#2D3748', border: '1px solid #4A5568' } }
labelStyle = {{ color: '#E2E8F0' }}
itemStyle = {{ color: '#A0AEC0' }}
                            />
    < Legend wrapperStyle = {{ color: '#A0AEC0' }} />
        < Bar dataKey = "eficiencia" fill = "#4C51BF" name = "Eficiencia (%)" />
            </BarChart>
            </ResponsiveContainer>
            </div>
            < div className = "mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm" >
                <div>
                <p className="text-gray-400" > Capacidad Actual </p>
                    < p className = "font-semibold text-white" > { capacidad.actual } { capacidad.unidad } </p>
                        </div>
                        < div >
                        <p className="text-gray-400" > Número de Paneles </p>
                            < p className = "font-semibold text-white" > { capacidad.paneles } </p>
                                </div>
                                < div >
                                <p className="text-gray-400" > Número de Inversores </p>
                                    < p className = "font-semibold text-white" > { capacidad.inversores } </p>
                                        </div>
                                        </div>
                                        </CardContent>
                                        </Card>
    );
}
