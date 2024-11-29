import React from 'react';
import { useConstants } from '../contexts/ConstantsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Sun, DollarSign, BatteryCharging, TrendingUp, Zap, Leaf, PiggyBank } from 'lucide-react';
import { calcularMetricasManuales } from '../data/constants_pdf';
import { metadata } from '@/app/layout';


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

const AhorrosYBeneficios1: React.FC = () => {
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


    // 3. Métricas de Planta
    const calculatePlantMetrics = (): PlantMetrics => ({
        plantCapacityKW: constants.detailedMetrics.capacityMW * 1000,
        annualGenerationMWh: constants.detailedMetrics.valoresAnuales.generacionTotal,
        selfConsumptionMWh: constants.detailedMetrics.valoresAnuales.autoconsumo,
        gridInjectionMWh: constants.detailedMetrics.valoresAnuales.inyeccion,
        curtailmentMWh: constants.detailedMetrics.valoresAnuales.curtailment
    });



    // Cálculos en orden
    const { monthlyMetrics, annualMetrics } = calculateInvoiceMetrics();

    const plantMetrics = calculatePlantMetrics();


    const metricasManuales = calcularMetricasManuales(plantMetrics.plantCapacityKW);
    const total25YearBenefits = metricasManuales.ahorroEnLeasing * 6 + metricasManuales.ahorroFueraLeasing * 19
    const plantCost = metricasManuales.costoParque

    const cashFlowData = Array.from({ length: 25 }, (_, i) => ({
        year: i + 1,
        beneficio: i < 6 ? metricasManuales.ahorroEnLeasing : metricasManuales.ahorroFueraLeasing

    }));
    const energyData = [
        { name: 'Autoconsumo', valor: plantMetrics.selfConsumptionMWh },
        { name: 'Inyección', valor: plantMetrics.gridInjectionMWh },
        { name: 'Curtailment', valor: plantMetrics.curtailmentMWh }
    ];


    //const calculatedValueNetLeasing = netBenefits.duringLeasing
    //calculatedValue = total25YearBenefits
    //AuxCashFlowData =  cashFlowData
    const annualLeasingCost = metricasManuales.cuotaLeasing

    //const calculatedValueNetLeasing = annualMetrics.totalInvoice - annualLeasingCost - annualMetrics.fixedCharges
    const calculatedValueNetLeasing = metricasManuales.ahorroEnLeasing
    const caclulatedValueAfterLeasing = metricasManuales.ahorroFueraLeasing
    const calculatedValue = calculatedValueNetLeasing * 6 + caclulatedValueAfterLeasing * 19

    const AuxCashFlowData = cashFlowData.map(data => ({
        year: data.year,
        beneficio: data.beneficio
    }));


    return (
        <div className = "w-full max-w-[1020px] mx-auto space-y-6" >
        {/* Header con capacidad instalada */ }
        < div className = "flex justify-between items-center" >
            <h2 className="text-2xl font-bold text-white" > </h2>
                < div className = "px-4 py-2 bg-green-900 rounded-full" >
                    <span className="text-green-400 text-sm font-semibold" >
                        { Number(plantMetrics.plantCapacityKW).toLocaleString('en-US').split('.')[0] } kW Instalados
                            </span>
                            </div>
                            </div>

                            < div className = "flex flex-col md:flex-row gap-6" >
                                {/* Panel izquierdo con métricas */ }
                                < div className = "grid grid-cols-2 md:w-2/5 gap-4" >
                                    <Card className="bg-black-200 border-gray-800" >
                                        <CardHeader className="flex flex-row items-center justify-between pb-2" >
                                            <CardTitle className="text-sm font-medium text-gray-300" > Costo Anual Actual </CardTitle>
                                                < DollarSign className = "h-4 w-4 text-green-500" />
                                                    </CardHeader>
                                                    < CardContent >
                                                    <div className="text-xl font-bold text-white" >
                                                        { formatCurrency(annualMetrics.totalInvoice).split('.')[0] }
                                                        </div>
                                                        < p className = "text-xs text-gray-400" > Incluye Energia, Fijos e Impuestos </p>
                                                            </CardContent>
                                                            </Card>

                                                            < Card className = "bg-black-200 border-gray-800" >
                                                                <CardHeader className="flex flex-row items-center justify-between pb-2" >
                                                                    <CardTitle className="text-sm font-medium text-gray-300" > Inversion Parque </CardTitle>
                                                                        < Zap className = "h-4 w-4 text-blue-500" />
                                                                            </CardHeader>
                                                                            < CardContent >
                                                                            <div className="text-xl font-bold text-white" >
                                                                                { formatCurrency(plantCost).split('.')[0] }
                                                                                </div>
                                                                                < p className = "text-xs text-gray-400" > Costo Total Instalado </p>
                                                                                    </CardContent>
                                                                                    </Card>

                                                                                    < Card className = "bg-black-200 border-gray-800" >
                                                                                        <CardHeader className="flex flex-row items-center justify-between pb-2" >
                                                                                            <CardTitle className="text-sm font-medium text-gray-300" > Ahorro Leasing </CardTitle>
                                                                                                < PiggyBank className = "h-4 w-4 text-yellow-500" />
                                                                                                    </CardHeader>
                                                                                                    < CardContent >
                                                                                                    <div className="text-xl font-bold text-white" >
                                                                                                        { formatCurrency(calculatedValueNetLeasing).split('.')[0] }
                                                                                                        </div>
                                                                                                        < p className = "text-xs text-gray-400" > Ahorro Descontado Cuota Leasing - Anual </p>
                                                                                                            </CardContent>
                                                                                                            </Card>

                                                                                                            < Card className = "bg-black-200 border-gray-800" >
                                                                                                                <CardHeader className="flex flex-row items-center justify-between pb-2" >
                                                                                                                    <CardTitle className="text-sm font-medium text-gray-300" > Ahorro Total </CardTitle>
                                                                                                                        < TrendingUp className = "h-4 w-4 text-purple-500" />
                                                                                                                            </CardHeader>
                                                                                                                            < CardContent >
                                                                                                                            <div className="text-xl font-bold text-white" >
                                                                                                                                { formatCurrency(calculatedValue).split('.')[0] }
                                                                                                                                </div>
                                                                                                                                < p className = "text-xs text-gray-400" > Ahorro del Proyecto </p>
                                                                                                                                    </CardContent>
                                                                                                                                    </Card>
                                                                                                                                    </div>

    {/* Panel derecho con gráficos */ }
    <div className="flex-1 grid grid-cols-2 gap-4" >
        <Card className="bg-black-200 border-gray-800" >
            <CardHeader className="pb-2" >
                <CardTitle className="text-sm text-gray-300" > Flujo de Caja Proyectado </CardTitle>
                    </CardHeader>
                    < CardContent >
                    <div className="h-[270px]" >
                        <ResponsiveContainer width="100%" height = "100%" >
                            <LineChart data={ AuxCashFlowData }>
                                <CartesianGrid strokeDasharray="3 3" stroke = "#374151" />
                                    <XAxis 
                                            dataKey="year"
    stroke = "#9CA3AF"
    tick = {{ fontSize: 11 }
}
                                        />
    < YAxis
stroke = "#9CA3AF"
tick = {{ fontSize: 11 }}
tickFormatter = {(value) => formatCurrency(value).split('.')[0]}
                                        />
    < Tooltip
contentStyle = {{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
formatter = {(value) => formatCurrency(value).split('.')[0]}
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
    </ResponsiveContainer>
    </div>
    </CardContent>
    </Card>

    < Card className = "bg-black-200 border-gray-800" >
        <CardHeader className="pb-2" >
            <CardTitle className="text-sm text-gray-300" > Distribución de Energía </CardTitle>
                </CardHeader>
                < CardContent >
                <div className="h-[270px]" >
                    <ResponsiveContainer width="100%" height = "100%" >
                        <BarChart data={ energyData }>
                            <CartesianGrid strokeDasharray="3 3" stroke = "#374151" />
                                <XAxis 
                                            dataKey="name"
stroke = "#9CA3AF"
tick = {{ fontSize: 11 }}
                                        />
    < YAxis
stroke = "#9CA3AF"
tick = {{ fontSize: 11 }}
                                        />
    < Tooltip
contentStyle = {{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
labelStyle = {{ color: '#9CA3AF' }}
                                        />
    < Bar
dataKey = "valor"
fill = "#3B82F6"
radius = { [4, 4, 0, 0]}
    />
    </BarChart>
    </ResponsiveContainer>
    </div>
    </CardContent>
    </Card>
    </div>
    </div>
    </div>
    );

};

export default AhorrosYBeneficios1;