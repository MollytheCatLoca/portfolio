import React from 'react';
import { useConstants } from '../contexts/ConstantsContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { LineChart, BarChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Sun, DollarSign, BatteryCharging, TrendingUp, Zap, Leaf, PiggyBank } from 'lucide-react';
import { usecalcularMetricasManuales } from '../data/constants_pdf';
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

const AhorrosYBeneficios2: React.FC = () => {
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

    const metricasManuales = usecalcularMetricasManuales(plantMetrics.plantCapacityKW)
    const total25YearBenefits = metricasManuales.ahorroTotalProyecto

    // Datos para gráficos
    const cashFlowData = Array.from({ length: 25 }, (_, i) => ({
        year: i + 1,
        //beneficio: i < 6 ? netBenefits.duringLeasing : netBenefits.afterLeasing
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
    //const calculatedValueAfterLeasing = netBenefits.afterLeasing
    const annualLeasingCost = 104000 * (plantMetrics.plantCapacityKW / 600);

    //const calculatedValueNetLeasing = annualMetrics.totalInvoice - annualLeasingCost - annualMetrics.fixedCharges
    const calculatedValueNetLeasing = metricasManuales.ahorroEnLeasing
    //const calculatedValueAfterLeasing = annualMetrics.totalInvoice - annualLeasingCost - annualMetrics.fixedCharges
    const calculatedValueAfterLeasing = metricasManuales.ahorroFueraLeasing
    const calculatedValue = metricasManuales.ahorroFueraLeasingTotalPeriodo

    const AuxCashFlowData = cashFlowData.map(data => ({
        year: data.year,
        beneficio: data.beneficio
    }));


    return (
        <div className= "mt-8 space-y-6" >
        {/* Header */ }
        < div className = "flex justify-between items-center" >
            <h2 className="text-2xl font-bold text-white" > </h2>
                < div className = "px-4 py-2 bg-green-900 rounded-full" >
                    <span className="text-green-400 text-sm font-semibold" >
                        { Number(plantMetrics.plantCapacityKW).toLocaleString('en-US').split('.')[0] } kW Instalados
                            </span>
                            </div>
                            </div>

    {/* Gráficos */ }
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" >
        {/* Aquí van tus gráficos */ }
        </div>

    {/* Detalles financieros */ }
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" >
        <Card className="bg-black-200 border-gray-800" >
            <CardHeader>
            <CardTitle className="text-gray-300 flex items-center gap-2" >
                <PiggyBank className="h-5 w-5 text-yellow-500" />
                    Período de Leasing - 6 años
                        </CardTitle>
                        </CardHeader>
                        < CardContent >
                        <div className="space-y-4" >
                            <div className="flex justify-between items-center py-3 border-b border-gray-800" >
                                <span className="text-gray-400" > Factura Actual </span>
                                    < span className = "text-white font-medium" >
                                        { formatCurrency(monthlyMetrics.totalInvoice * 12).split('.')[0] }
                                        </span>
                                        </div>
                                        < div className = "flex justify-between items-center py-3 border-b border-gray-800" >
                                            <span className="text-gray-400" > Costo anual leasing </span>
                                                < span className = "text-white font-medium" >
                                                    { formatCurrency(104000 * (plantMetrics.plantCapacityKW / 600)).split('.')[0]
}
</span>
    </div>
    < div className = "flex justify-between items-center py-3 bg-gray-900 px-4 rounded-lg" >
        <span className="text-gray-300 font-medium" > Ahorro en el período Leasing </span>
            < span className = "text-green-400 font-bold" >
                { formatCurrency(calculatedValueNetLeasing * 6).split('.')[0] }
                </span>
                </div>
                </div>
                </CardContent>
                </Card>

                < Card className = "bg-black-200 border-gray-800" >
                    <CardHeader>
                    <CardTitle className="text-gray-300 flex items-center gap-2" >
                        <TrendingUp className="h-5 w-5 text-purple-500" />
                            Período Post - Leasing(19 años)
                                </CardTitle>
                                </CardHeader>
                                < CardContent >
                                <div className="space-y-4" >
                                    <div className="flex justify-between items-center py-3 border-b border-gray-800" >
                                        <span className="text-gray-400" > Beneficio neto anual </span>
                                            < span className = "text-white font-medium" >
                                                { formatCurrency(calculatedValueAfterLeasing).split('.')[0] }
                                                </span>
                                                </div>
                                                < div className = "flex justify-between items-center py-3 border-b border-gray-800" >
                                                    <span className="text-gray-400" > Cargos fijos anuales </span>
                                                        < span className = "text-white font-medium" >
                                                            { formatCurrency(annualMetrics.fixedCharges).split('.')[0] }
                                                            </span>
                                                            </div>
                                                            < div className = "flex justify-between items-center py-3 bg-gray-900 px-4 rounded-lg" >
                                                                <span className="text-gray-300 font-medium" > Total período post - leasing </span>
                                                                    < span className = "text-green-400 font-bold" >
                                                                        { formatCurrency(calculatedValueAfterLeasing * 19).split('.')[0] }
                                                                        </span>
                                                                        </div>
                                                                        </div>
                                                                        </CardContent>
                                                                        </Card>
                                                                        </div>
                                                                        </div>
    );
};

export default AhorrosYBeneficios2;