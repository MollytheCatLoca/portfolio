'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/Card2';
import { 
    DollarSign,
    Box,
    Wrench,
    Timer,
    Zap,
    Table as TableIcon
} from 'lucide-react';


import { SOLAR_BUDGET_DATA } from '../data/solarParkData';
export default function SolarBudget() {
    const { title, projectMetrics, equipment } = SOLAR_BUDGET_DATA;

    return (
        <Card className="bg-black-200 border-gray-800" style={{ width: '270mm', height: '210mm' }}>
            <CardContent className="p-4">
                {/* Header with Title and Key Metrics */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-400" />
                        <h2 className="text-lg font-bold text-white">{title}</h2>
                    </div>
                </div>

                {/* Key Metrics Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <DollarSign className="h-4 w-4 text-green-400" />
                                <h3 className="text-sm font-semibold text-white">CAPEX Total</h3>
                            </div>
                            <p className="text-2xl font-bold text-white">
                                USD {projectMetrics.capex.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Ratio: {projectMetrics.usdWpRatio} USD/Wp
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Zap className="h-4 w-4 text-yellow-400" />
                                <h3 className="text-sm font-semibold text-white">Potencia Nominal</h3>
                            </div>
                            <p className="text-2xl font-bold text-white">
                                {projectMetrics.dcPower.toFixed(2)} MWp
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                AC: {projectMetrics.acPower} MW
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Timer className="h-4 w-4 text-blue-400" />
                                <h3 className="text-sm font-semibold text-white">Tiempo de Ejecución</h3>
                            </div>
                            <p className="text-2xl font-bold text-white">
                                {projectMetrics.executionTime}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">Meses</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1f2e] border-none">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <Wrench className="h-4 w-4 text-purple-400" />
                                <h3 className="text-sm font-semibold text-white">Equipamiento</h3>
                            </div>
                            <p className="text-2xl font-bold text-white">
                                {equipment.length}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">Items principales</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Equipment Table */}
                <Card className="bg-[#1a1f2e] border-none">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-4">
                            <TableIcon className="h-4 w-4 text-blue-400" />
                            <h3 className="text-sm font-semibold text-white">Desglose de Equipamiento</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-700">
                                        <th className="text-left p-2 text-gray-400">Código</th>
                                        <th className="text-left p-2 text-gray-400">Descripción</th>
                                        <th className="text-center p-2 text-gray-400">Tipo</th>
                                        <th className="text-right p-2 text-gray-400">Cantidad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {equipment.map((item, index) => (
                                        <tr 
                                            key={item.code}
                                            className={`border-b border-gray-700 ${
                                                index % 2 === 0 ? 'bg-[#1a1f2e]' : 'bg-[#1f2937]'
                                            }`}
                                        >
                                            <td className="p-2 text-white font-medium">{item.code}</td>
                                            <td className="p-2 text-white">{item.description}</td>
                                            <td className="p-2 text-center">
                                                <span className="px-2 py-1 rounded-full text-xs font-medium" 
                                                    style={{
                                                        backgroundColor: getTypeColor(item.type),
                                                        color: 'white'
                                                    }}>
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td className="p-2 text-right text-white">
                                                {item.quantity.toLocaleString(undefined, {
                                                    minimumFractionDigits: 0,
                                                    maximumFractionDigits: 2
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}

// Función auxiliar para asignar colores según el tipo de equipo
function getTypeColor(type) {
    const colors = {
        'Módulos': '#2563eb',      // blue-600
        'Inversores': '#7c3aed',   // violet-600
        'STS': '#059669',    // emerald-600
        'Estructuras': '#d97706',  // amber-600
        'Conexión': '#dc2626',     // red-600
        'Servicios': '#4f46e5',    // indigo-600
        'Documentación': '#0891b2', // cyan-600
    };
    return colors[type] || '#6b7280'; // gray-500 como fallback
}