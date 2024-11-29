import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from 'recharts';
import { DollarSign, Zap, TrendingUp } from 'lucide-react';
import {
    calculateTotalInvoice,
    calculateTotalGeneration,
    calculateDuringLeasing,
    calculateTotalROI,
    calculateProjectedCashFlow,
    calculateEnergyDistribution,
    InvoiceMetrics,
    NetBenefits
} from './calculations';

interface EnergyChartsProps {
    plantCapacityKW: number;
    cashFlowData: { year: number; beneficio: number }[];
    energyData: { name: string; valor: number }[];
    total25YearBenefits: number;
    netBenefits: NetBenefits;
    invoiceMetrics: InvoiceMetrics;
}

const EnergyCharts: React.FC<EnergyChartsProps> = ({
    plantCapacityKW,
    cashFlowData,
    energyData,
    total25YearBenefits,
    netBenefits,
    invoiceMetrics
}) => {
    // Cálculos usando las funciones externas
    const totalInvoice = calculateTotalInvoice(invoiceMetrics);
    const totalGeneration = calculateTotalGeneration(plantCapacityKW);
    const duringLeasing = calculateDuringLeasing(netBenefits);
    const totalROI = calculateTotalROI(total25YearBenefits);
    const projectedCashFlow = calculateProjectedCashFlow(cashFlowData);
    const energyDistribution = calculateEnergyDistribution(energyData);

    return (
        <div className= "w-full p-4 bg-gray-950" >
        <div className="flex justify-between items-center mb-6" >
            <h2 className="text-2xl font-bold text-white" > Análisis Financiero Solar </h2>
                < div className = "px-4 py-2 bg-green-900 rounded-full" >
                    <span className="text-green-400 text-sm font-semibold" > { plantCapacityKW } kW Instalados </span>
                        </div>
                        </div>

    {/* Main Metrics */ }
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" >
        <Card className="bg-gray-900 border-gray-800" >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                <CardTitle className="text-sm font-medium text-gray-300" > Ahorro Anual Total </CardTitle>
                    < DollarSign className = "h-4 w-4 text-green-500" />
                        </CardHeader>
                        < CardContent >
                        <div className="text-2xl font-bold text-white" > { totalInvoice } </div>
                            < p className = "text-xs text-gray-400" > Incluye ahorros energéticos e impuestos </p>
                                </CardContent>
                                </Card>

                                < Card className = "bg-gray-900 border-gray-800" >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                                        <CardTitle className="text-sm font-medium text-gray-300" > Generación Anual </CardTitle>
                                            < Zap className = "h-4 w-4 text-blue-500" />
                                                </CardHeader>
                                                < CardContent >
                                                <div className="text-2xl font-bold text-white" > { totalGeneration } </div>
                                                    < p className = "text-xs text-gray-400" > Energía total generada </p>
                                                        </CardContent>
                                                        </Card>

                                                        < Card className = "bg-gray-900 border-gray-800" >
                                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                                                                <CardTitle className="text-sm font-medium text-gray-300" > Beneficio Durante Leasing </CardTitle>
                                                                    < DollarSign className = "h-4 w-4 text-yellow-500" />
                                                                        </CardHeader>
                                                                        < CardContent >
                                                                        <div className="text-2xl font-bold text-white" > { duringLeasing } </div>
                                                                            < p className = "text-xs text-gray-400" > Beneficio neto anual </p>
                                                                                </CardContent>
                                                                                </Card>

                                                                                < Card className = "bg-gray-900 border-gray-800" >
                                                                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                                                                                        <CardTitle className="text-sm font-medium text-gray-300" > ROI Total 25 Años </CardTitle>
                                                                                            < TrendingUp className = "h-4 w-4 text-purple-500" />
                                                                                                </CardHeader>
                                                                                                < CardContent >
                                                                                                <div className="text-2xl font-bold text-white" > { totalROI } </div>
                                                                                                    < p className = "text-xs text-gray-400" > Retorno total de inversión </p>
                                                                                                        </CardContent>
                                                                                                        </Card>
                                                                                                        </div>

    {/* Charts */ }
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" >
        <Card className="bg-gray-900 border-gray-800" >
            <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-100" > Flujo de Caja Proyectado </CardTitle>
                </CardHeader>
                < CardContent className = "min-h-[350px] lg:min-h-[450px]" >
                    <ResponsiveContainer width="100%" height = "100%" >
                        <LineChart data={ projectedCashFlow } margin = {{ top: 10, right: 30, left: 30, bottom: 10 }
}>
    <CartesianGrid strokeDasharray="3 3" stroke = "#1f2937" />
        <XAxis dataKey="year" stroke = "#4b5563" tick = {{ fill: '#9CA3AF' }} />
            < YAxis stroke = "#4b5563" tick = {{ fill: '#9CA3AF' }} />
                < Tooltip
contentStyle = {{
    backgroundColor: '#111827',
        borderRadius: '0.5rem',
            color: '#9CA3AF'
}}
labelStyle = {{ color: '#9CA3AF' }}
                                />
    < Line type = "monotone" dataKey = "beneficio" stroke = "#10B981" strokeWidth = { 3} dot = { false} />
        </LineChart>
        </ResponsiveContainer>
        </CardContent>
        </Card>

        < Card className = "bg-gray-900 border-gray-800" >
            <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-100" > Distribución de Energía </CardTitle>
                </CardHeader>
                < CardContent className = "min-h-[350px] lg:min-h-[450px]" >
                    <ResponsiveContainer width="100%" height = "100%" >
                        <BarChart data={ energyData } margin = {{ top: 10, right: 30, left: 30, bottom: 10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke = "#1f2937" />
                                <XAxis dataKey="name" stroke = "#4b5563" tick = {{ fill: '#9CA3AF' }} />
                                    < YAxis stroke = "#4b5563" tick = {{ fill: '#9CA3AF' }} />
                                        < Tooltip
contentStyle = {{
    backgroundColor: '#111827',
        borderRadius: '0.5rem',
            color: '#9CA3AF'
}}
cursor = {{ fill: 'rgba(59, 130, 246, 0.1)' }}
labelStyle = {{ color: '#9CA3AF' }}
                                />
    < Bar dataKey = "valor" fill = "#3B82F6" radius = { [6, 6, 0, 0]} barSize = { 50} />
        </BarChart>
        </ResponsiveContainer>
        </CardContent>
        </Card>
        </div>
        </div>
    );
};

export default EnergyCharts;
