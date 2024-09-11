'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Sun, DollarSign, BatteryCharging, Leaf } from 'lucide-react';

type ExecutiveSummaryProps = {
    capacidad: {
        actual: number;
        maxima: number;
        unidad: string;
    };
    inversion: {
        total: number;
        unidad: string;
    };
    produccionAnual: {
        estimada: number;
        unidad: string;
    };
    ahorroCO2: {
        anual: number;
        unidad: string;
        equivalenciaArboles: number;
    };
};

export default function ExecutiveSummary({ capacidad, inversion, produccionAnual, ahorroCO2 }: ExecutiveSummaryProps) {
    if (!capacidad || !inversion || !produccionAnual || !ahorroCO2) {
        console.error('Error: Datos inválidos recibidos.');
        return (
            <Card className= "bg-black-200 border-gray-800" >
            <CardContent>Error: No se han recibido datos correctos.</CardContent>
                </Card>
        );
    }

    return (
        <section id= "resumen" className = "mt-8" >
            <h2 className="text-2xl font-bold mb-4 text-white" > </h2>
                < div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" >
                    <Card className="bg-black-200 border-gray-800" >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                            <CardTitle className="text-sm font-medium text-gray-300" > Capacidad Total </CardTitle>
                                < Sun className = "h-4 w-4 text-yellow-500" />
                                    </CardHeader>
                                    < CardContent >
                                    <div className="text-2xl font-bold text-white" > { capacidad.actual } { capacidad.unidad } </div>
                                        < p className = "text-xs text-gray-400" > Escalable a { capacidad.maxima } { capacidad.unidad } </p>
                                            </CardContent>
                                            </Card>

                                            < Card className = "bg-black-200 border-gray-800" >
                                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                                                    <CardTitle className="text-sm font-medium text-gray-300" > Inversión Estimada </CardTitle>
                                                        < DollarSign className = "h-4 w-4 text-green-500" />
                                                            </CardHeader>
                                                            < CardContent >
                                                            <div className="text-2xl font-bold text-white" > { inversion.total } { inversion.unidad } </div>
                                                                < p className = "text-xs text-gray-400" > Proyección a 5 años </p>
                                                                    </CardContent>
                                                                    </Card>

                                                                    < Card className = "bg-black-200 border-gray-800" >
                                                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                                                                            <CardTitle className="text-sm font-medium text-gray-300" > Producción Anual </CardTitle>
                                                                                < BatteryCharging className = "h-4 w-4 text-blue-500" />
                                                                                    </CardHeader>
                                                                                    < CardContent >
                                                                                    <div className="text-2xl font-bold text-white" > { produccionAnual.estimada.toLocaleString() } { produccionAnual.unidad } </div>
                                                                                        < p className = "text-xs text-gray-400" > Estimación para el primer año </p>
                                                                                            </CardContent>
                                                                                            </Card>

                                                                                            < Card className = "bg-black-200 border-gray-800" >
                                                                                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                                                                                                    <CardTitle className="text-sm font-medium text-gray-300" > Ahorro de CO2 Anual </CardTitle>
                                                                                                        < Leaf className = "h-4 w-4 text-green-500" />
                                                                                                            </CardHeader>
                                                                                                            < CardContent >
                                                                                                            <div className="text-2xl font-bold text-white" > { ahorroCO2.anual.toLocaleString() } { ahorroCO2.unidad } </div>
                                                                                                                < p className = "text-xs text-gray-400" > Equivalente a { ahorroCO2.equivalenciaArboles.toLocaleString() } árboles </p>
                                                                                                                    </CardContent>
                                                                                                                    </Card>
                                                                                                                    </div>
                                                                                                                    </section>
    );
}
