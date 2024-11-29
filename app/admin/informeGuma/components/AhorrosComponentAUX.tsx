import React from 'react';
import { useConstants } from '../contexts/ConstantsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Sun, DollarSign, BatteryCharging, TrendingUp, Zap, Leaf, PiggyBank } from 'lucide-react';

// Tipos
type InvoiceMetrics = {
    monthlyMetrics: {
        totalInvoice: number;
        fixedCharges: number;
        reactivePowerCharges: number;
        taxes: number;
        netEnergyCost: number;
    };
    annualMetrics: {
        totalInvoice: number;
        fixedCharges: number;
        reactivePowerCharges: number;
        taxes: number;
        netEnergyCost: number;
    };
};

type EnergyCosts = {
    energyCostPerKWh: number;
    netEnergyCostPerKWh: number;
};

type PlantMetrics = {
    plantCapacityKW: number;
    annualGenerationMWh: number;
    selfConsumptionMWh: number;
    gridInjectionMWh: number;
    curtailmentMWh: number;
};

type AnnualSavings = {
    totalSavingsWithTaxes: number;
    reactivePowerSavings: number;
    totalAnnualSavings: number;
};

type NetBenefits = {
    duringLeasing: number;
    afterLeasing: number;
};

// Utilidades
const MWhToKWh = (MWh: number): number => MWh * 1000;

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
    }).format(value);
};

const AhorrosYBeneficios: React.FC = () => {
    const { constants } = useConstants();

    // 1. Análisis de Factura
    const calculateInvoiceMetrics = (): InvoiceMetrics => {
        const exchangeRate = constants.invoice.exchangeRate;
        const monthlyMetrics = {
            totalInvoice: constants.invoice.totalInvoiceAmountPesos / exchangeRate,
            fixedCharges: constants.invoice.fixedChargesPesos / exchangeRate,
            reactivePowerCharges: constants.invoice.reactivePowerChargesPesos / exchangeRate,
            taxes: 0,
            netEnergyCost: 0
        };

        monthlyMetrics.taxes = monthlyMetrics.totalInvoice * (constants.invoice.taxesPercentage / 100);
        monthlyMetrics.netEnergyCost = monthlyMetrics.totalInvoice -
            monthlyMetrics.fixedCharges -
            monthlyMetrics.reactivePowerCharges -
            monthlyMetrics.taxes;

        const annualMetrics = Object.entries(monthlyMetrics).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: value * 12
        }), {} as typeof monthlyMetrics);

        return { monthlyMetrics, annualMetrics };
    };

    // 2. Costos de Energía
    const calculateEnergyCosts = (monthlyNetEnergyCost: number): EnergyCosts => {
        const monthlyConsumption = constants.consumption.annualConsumption / 12;
        const energyCostPerKWh = monthlyNetEnergyCost / monthlyConsumption;
        const netEnergyCostPerKWh = energyCostPerKWh * (1 + constants.invoice.taxesPercentage / 100);
        return { energyCostPerKWh, netEnergyCostPerKWh };
    };

    // 3. Métricas de Planta
    const calculatePlantMetrics = (): PlantMetrics => ({
        plantCapacityKW: constants.detailedMetrics.capacityMW * 1000,
        annualGenerationMWh: constants.detailedMetrics.valoresAnuales.generacionTotal,
        selfConsumptionMWh: constants.detailedMetrics.valoresAnuales.autoconsumo,
        gridInjectionMWh: constants.detailedMetrics.valoresAnuales.inyeccion,
        curtailmentMWh: constants.detailedMetrics.valoresAnuales.curtailment
    });

    // 4. Ahorros Anuales
    const calculateAnnualSavings = (
        plantMetrics: PlantMetrics,
        energyCostPerKWh: number,
        reactivePowerCharges: number
    ): AnnualSavings => {
        const selfConsumptionKWh = MWhToKWh(plantMetrics.selfConsumptionMWh);
        const gridInjectionKWh = MWhToKWh(plantMetrics.gridInjectionMWh);

        const selfConsumptionSavings = selfConsumptionKWh * energyCostPerKWh;
        const gridInjectionSavings = gridInjectionKWh * energyCostPerKWh;

        const selfConsumptionTaxSavings = selfConsumptionSavings * (constants.invoice.taxesPercentage / 100);
        const gridInjectionTaxSavings = gridInjectionSavings * (constants.invoice.taxesPercentage / 100);

        const totalEnergySavings = selfConsumptionSavings + gridInjectionSavings;
        const totalTaxSavings = selfConsumptionTaxSavings + gridInjectionTaxSavings;
        const totalSavingsWithTaxes = totalEnergySavings + totalTaxSavings;

        return {
            totalSavingsWithTaxes,
            reactivePowerSavings: reactivePowerCharges,
            totalAnnualSavings: totalSavingsWithTaxes + reactivePowerCharges
        };
    };

    // 5. Beneficios Netos
    const calculateNetBenefits = (
        totalAnnualSavings: number,
        plantCapacityKW: number,
        fixedCharges: number
    ): NetBenefits => {
        const annualLeasingCost = 104000 * (plantCapacityKW / 600);
        return {
            duringLeasing: totalAnnualSavings - annualLeasingCost,
            afterLeasing: totalAnnualSavings - fixedCharges
        };
    };

    // 6. Beneficios a 25 años
    const calculate25YearBenefits = (netBenefits: NetBenefits): number => {
        const leasingPeriodBenefits = netBenefits.duringLeasing * 6;
        const postLeasingBenefits = netBenefits.afterLeasing * 19;
        return leasingPeriodBenefits + postLeasingBenefits;
    };

    // Cálculos en orden
    const { monthlyMetrics, annualMetrics } = calculateInvoiceMetrics();
    const { energyCostPerKWh } = calculateEnergyCosts(monthlyMetrics.netEnergyCost);
    const plantMetrics = calculatePlantMetrics();
    const { totalAnnualSavings } = calculateAnnualSavings(
        plantMetrics,
        energyCostPerKWh,
        annualMetrics.reactivePowerCharges
    );
    const netBenefits = calculateNetBenefits(
        totalAnnualSavings,
        plantMetrics.plantCapacityKW,
        annualMetrics.fixedCharges
    );
    const total25YearBenefits = calculate25YearBenefits(netBenefits);

    // Datos para gráficos
    const cashFlowData = Array.from({ length: 25 }, (_, i) => ({
        year: i + 1,
        beneficio: i < 6 ? netBenefits.duringLeasing : netBenefits.afterLeasing
    }));

    const energyData = [
        { name: 'Autoconsumo', valor: plantMetrics.selfConsumptionMWh },
        { name: 'Inyección', valor: plantMetrics.gridInjectionMWh },
        { name: 'Curtailment', valor: plantMetrics.curtailmentMWh }
    ];

    return (
        <div className= "mt-8 space-y-6" >
        <div className="flex justify-between items-center mb-6" >
            <h2 className="text-2xl font-bold text-white" > </h2>
                < div className = "px-4 py-2 bg-green-900 rounded-full" >
                    <span className="text-green-400 text-sm font-semibold" > { plantMetrics.plantCapacityKW } kW Instalados </span>
                        </div>
                        </div>

    {/* Métricas principales */ }
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" >
        <Card className="bg-black-200 border-gray-800" >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                <CardTitle className="text-sm font-medium text-gray-300" > Costo Anual Actual </CardTitle>
                    < DollarSign className = "h-4 w-4 text-green-500" />
                        </CardHeader>
                        < CardContent >
                        <div className="text-2xl font-bold text-white" > { formatCurrency(annualMetrics.totalInvoice) } </div>
                            < p className = "text-xs text-gray-400" > Incluye costos energéticos e impuestos </p>
                                </CardContent>
                                </Card>

                                < Card className = "bg-black-200 border-gray-800" >
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                                        <CardTitle className="text-sm font-medium text-gray-300" > Generación Anual </CardTitle>
                                            < Zap className = "h-4 w-4 text-blue-500" />
                                                </CardHeader>
                                                < CardContent >
                                                <div className="text-2xl font-bold text-white" >
                                                    { plantMetrics.annualGenerationMWh.toLocaleString() } MWh
                                                        </div>
                                                        < p className = "text-xs text-gray-400" > Energía total generada </p>
                                                            </CardContent>
                                                            </Card>

                                                            < Card className = "bg-black-200 border-gray-800" >
                                                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                                                                    <CardTitle className="text-sm font-medium text-gray-300" > Beneficio Durante Leasing </CardTitle>
                                                                        < PiggyBank className = "h-4 w-4 text-yellow-500" />
                                                                            </CardHeader>
                                                                            < CardContent >
                                                                            <div className="text-2xl font-bold text-white" > { formatCurrency(netBenefits.duringLeasing) } </div>
                                                                                < p className = "text-xs text-gray-400" > Beneficio neto anual </p>
                                                                                    </CardContent>
                                                                                    </Card>

                                                                                    < Card className = "bg-black-200 border-gray-800" >
                                                                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                                                                                            <CardTitle className="text-sm font-medium text-gray-300" > ROI Total 25 Años </CardTitle>
                                                                                                < TrendingUp className = "h-4 w-4 text-purple-500" />
                                                                                                    </CardHeader>
                                                                                                    < CardContent >
                                                                                                    <div className="text-2xl font-bold text-white" > { formatCurrency(total25YearBenefits) } </div>
                                                                                                        < p className = "text-xs text-gray-400" > Retorno total de inversión </p>
                                                                                                            </CardContent>
                                                                                                            </Card>
                                                                                                            </div>

    {/* Gráficos */ }
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" >
        <Card className="bg-black-200 border-gray-800" >
            <CardHeader>
            <CardTitle className="text-gray-300" > Flujo de Caja Proyectado </CardTitle>
                </CardHeader>
                < CardContent >
                <div className="h-[300px] w-full" >
                    <LineChart width={ 500 } height = { 300} data = { cashFlowData } >
                        <CartesianGrid strokeDasharray="3 3" stroke = "#374151" />
                            <XAxis dataKey="year" stroke = "#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                    <Tooltip 
                                    contentStyle={ { backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' } }
    formatter = {(value) => formatCurrency(value)}
labelStyle = {{ color: '#9CA3AF' }}
                                />
    < Line
type = "monotone"
dataKey = "beneficio"
stroke = "#10B981"
strokeWidth = { 2}
dot = { false}
    />
    </LineChart>
    </div>
    </CardContent>
    </Card>

    < Card className = "bg-black-200 border-gray-800" >
        <CardHeader>
        <CardTitle className="text-gray-300" > Distribución de Energía </CardTitle>
            </CardHeader>
            < CardContent >
            <div className="h-[300px] w-full" >
                <BarChart width={ 500 } height = { 300} data = { energyData } >
                    <CartesianGrid strokeDasharray="3 3" stroke = "#374151" />
                        <XAxis dataKey="name" stroke = "#9CA3AF" />
                            <YAxis stroke="#9CA3AF" />
                                <Tooltip 
                                    contentStyle={ { backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' } }
labelStyle = {{ color: '#9CA3AF' }}
                                />
    < Bar dataKey = "valor" fill = "#3B82F6" radius = { [4, 4, 0, 0]} />
        </BarChart>
        </div>
        </CardContent>
        </Card>
        </div>

{/* Detalles financieros */ }
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6" >
    <Card className="bg-black-200 border-gray-800" >
        <CardHeader>
        <CardTitle className="text-gray-300" > Período de Leasing(6 años) </CardTitle>
            </CardHeader>
            < CardContent >
            <div className="space-y-4" >
                <div className="flex justify-between items-center py-2 border-b border-gray-800" >
                    <span className="text-gray-400" > Primero Factura Actual </span>
                        < span className = "text-white font-medium" >
                            { formatCurrency(monthlyMetrics.totalInvoice * 12) }
                            </span>
                            </div>
                            < div className = "flex justify-between items-center py-2 border-b border-gray-800" >
                                <span className="text-gray-400" > Costo anual leasing </span>
                                    < span className = "text-white font-medium" >
                                        { formatCurrency(104000 * (plantMetrics.plantCapacityKW / 600))}
</span>
    </div>
    < div className = "flex justify-between items-center py-2 bg-gray-900 px-3 rounded-lg" >
        <span className="text-gray-300" > Total período leasing </span>
            < span className = "text-green-400 font-bold" >
                { formatCurrency(netBenefits.duringLeasing * 6) }
                </span>
                </div>
                </div>
                </CardContent>
                </Card>

                < Card className = "bg-black-200 border-gray-800" >
                    <CardHeader>
                    <CardTitle className="text-gray-300" > Período Post - Leasing(19 años) </CardTitle>
                        </CardHeader>
                        < CardContent >
                        <div className="space-y-4" >
                            <div className="flex justify-between items-center py-2 border-b border-gray-800" >
                                <span className="text-gray-400" > Beneficio neto anual </span>
                                    < span className = "text-white font-medium" >
                                        { formatCurrency(netBenefits.afterLeasing) }
                                        </span>
                                        </div>
                                        < div className = "flex justify-between items-center py-2" >
                                            <span className="text-gray-400" > Cargos fijos anuales </span>
                                                < span className = "text-white font-medium" >
                                                    { formatCurrency(annualMetrics.fixedCharges) }
                                                    </span>
                                                    </div>
                                                    < div className = "flex justify-between items-center py-2 bg-gray-900 px-3 rounded-lg" >
                                                        <span className="text-gray-300" > Total período post - leasing </span>
                                                            < span className = "text-green-400 font-bold" >
                                                                { formatCurrency(netBenefits.afterLeasing * 19) }
                                                                </span>
                                                                </div>
                                                                </div>
                                                                </CardContent>
                                                                </Card>
                                                                </div>
                                                                </div>
    );
};

export default AhorrosYBeneficios;