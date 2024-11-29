import React, { useState, useEffect } from 'react';
import { Calculator,Sun,Zap, DollarSign, TrendingUp, Clock, Package, Wallet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card3";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { usecalcularMetricasManuales } from '../data/constants_pdf';
import { useConstants } from '../contexts/ConstantsContext';

interface FinancialMetrics {
    totalInvestment: number;
    yearlyGeneration: number;
    energyUnitPrice: number;
    yearlyTotalSavings: number;
    monthlyLeasingPayment: number;
}

interface CashFlowEntry {
    year: number;
    yearlyFlow: number;
    accumulatedFlow: number;
    isLeasingPeriod: boolean;
}

const SolarQuotation: React.FC = () => {
    const { constants } = useConstants();
    const LEASING_YEARS = 6;
    const PROJECT_YEARS = 25;

    const calculatePlantMetrics = () => ({
        plantCapacityKW: constants.detailedMetrics.capacityMW,
        annualGenerationMWh: constants.detailedMetrics.valoresAnuales.generacionTotal,
        selfConsumptionMWh: constants.detailedMetrics.valoresAnuales.autoconsumo,
        gridInjectionMWh: constants.detailedMetrics.valoresAnuales.inyeccion,
        curtailmentMWh: constants.detailedMetrics.valoresAnuales.curtailment
    });

    const plantMetrics = calculatePlantMetrics();
    const manualMetrics = usecalcularMetricasManuales(plantMetrics.plantCapacityKW);

    const [financials, setFinancials] = useState<FinancialMetrics>({
        totalInvestment: manualMetrics.costoParque * 1000,
        yearlyGeneration: manualMetrics.energiaGenerada,
        energyUnitPrice: manualMetrics.precioUnitarioEnergia,
        yearlyTotalSavings: 0,
        monthlyLeasingPayment: 0,
    });

    const [cashFlowData, setCashFlowData] = useState<CashFlowEntry[]>([]);

    useEffect(() => {
        const yearlyTotalSavings = manualMetrics.ahorroTotalProyecto;
        const monthlyLeasing = (financials.totalInvestment / 72) * 1.06; // 72 meses (6 años), 1.06% mensual

        // Generar el flujo de caja considerando períodos de leasing y post-leasing
        const generateCashFlow = (): CashFlowEntry[] => {
            const cashFlowEntries: CashFlowEntry[] = [];
            let accumulatedFlow = 0;

            for (let year = 1; year <= PROJECT_YEARS; year++) {
                const isLeasingPeriod = year <= LEASING_YEARS;
                const yearlyFlow = isLeasingPeriod
                    ? manualMetrics.ahorroEnLeasing
                    : manualMetrics.ahorroFueraLeasing;

                accumulatedFlow += yearlyFlow;

                cashFlowEntries.push({
                    year,
                    yearlyFlow,
                    accumulatedFlow,
                    isLeasingPeriod
                });
            }

            return cashFlowEntries;
        };

        const newCashFlow = generateCashFlow();
        setCashFlowData(newCashFlow);

        setFinancials(prev => ({
            ...prev,
            yearlyTotalSavings,
            monthlyLeasingPayment: monthlyLeasing,
        }));
    }, [manualMetrics, financials.totalInvestment]);

    const totalROI = cashFlowData.length > 0
        ? (cashFlowData[cashFlowData.length - 1].accumulatedFlow / financials.totalInvestment) * 100
        : 0;

    // Formato de números para la visualización
    const formatCurrency = (value: number) =>
        `U$D ${Math.round(value).toLocaleString()}`;

    const formatPercentage = (value: number) =>
        `${Math.round(value)}%`;



    const calculateDimensions = () => {
        // Convert mm to pixels (1mm ≈ 3.7795275591 pixels)
        const widthPx = 330 * 3.7795275591;
        const heightPx = 140 * 3.7795275591;
        return { width: Math.round(widthPx), height: Math.round(heightPx) };
    };

    const dimensions = calculateDimensions();

    return (
        <div style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }} 
             className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6 rounded-2xl">
            <div className="h-full flex flex-col gap-6">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl p-4 flex justify-between items-center border border-blue-500/20 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-xl shadow-lg">
                            <Sun className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-200 via-blue-100 to-purple-200 bg-clip-text ">
                                Solar Power Plant {plantMetrics.plantCapacityKW * 1000} kW
                            </h2>
                            <p className="text-sm text-blue-200/70">Enterprise Solution • {PROJECT_YEARS} Years Lifespan</p>
                        </div>
                    </div>
                    <div className="bg-blue-500/10 px-6 py-2 rounded-lg border border-blue-400/30 shadow-lg">
                        <span className="text-blue-200 font-semibold">BIS Sizer</span>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-12 gap-6 flex-grow">
                    {/* Key Metrics */}
                    <div className="col-span-8 grid grid-cols-3 gap-4">
                        {[
                            {
                                icon: <Package className="h-6 w-6" />,
                                title: "Total Investment",
                                value: formatCurrency(financials.totalInvestment),
                                subtext: `${formatCurrency(financials.totalInvestment / plantMetrics.plantCapacityKW)} / kW`,
                                gradient: "from-emerald-500/20 to-teal-900/40",
                                borderColor: "border-emerald-500/30"
                            },
                            {
                                icon: <Wallet className="h-6 w-6" />,
                                title: "Monthly Leasing",
                                value: formatCurrency(financials.monthlyLeasingPayment),
                                subtext: `${LEASING_YEARS} Years Term`,
                                gradient: "from-purple-500/20 to-purple-900/40",
                                borderColor: "border-purple-500/30"
                            },
                            {
                                icon: <Zap className="h-6 w-6" />,
                                title: "Annual Generation",
                                value: `${financials.yearlyGeneration} MWh`,
                                subtext: formatCurrency(financials.energyUnitPrice) + " per MWh",
                                gradient: "from-amber-500/20 to-orange-900/40",
                                borderColor: "border-amber-500/30"
                            }
                        ].map((metric, i) => (
                            <div key={i} 
                                 className={`bg-gradient-to-br ${metric.gradient} rounded-xl p-5 border ${metric.borderColor} 
                                           backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}>
                                <div className={`flex items-center gap-3 mb-4`}>
                                    <div className="bg-white/10 p-2 rounded-lg">
                                        {metric.icon}
                                    </div>
                                    <h3 className="text-sm font-medium tracking-wide text-gray-300">
                                        {metric.title}
                                    </h3>
                                </div>
                                <div className="text-2xl font-bold tracking-tight text-white mb-2">
                                    {metric.value}
                                </div>
                                <div className="text-sm text-gray-400">
                                    {metric.subtext}
                                </div>
                            </div>
                        ))}

                        {/* ROI Card */}
                        <div className="col-span-3 bg-gradient-to-br from-blue-600/20 to-blue-900/40 rounded-xl border border-blue-500/30 backdrop-blur-md h-40">
    <div className="grid grid-cols-2 gap-8 h-full p-6">
        <div className="flex flex-col justify-between border-r border-blue-500/20">
            <div>
                <p className="text-blue-200/70 text-sm">Project ROI</p>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent mt-2">
                    {formatPercentage(totalROI)}
                </div>
            </div>
            <div className="text-xs text-blue-200/50">
                {PROJECT_YEARS} Years Return
            </div>
        </div>
        <div className="flex flex-col justify-between">
            <div>
                <p className="text-blue-200/70 text-sm">Total Savings</p>
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent mt-2">
                    {cashFlowData.length > 0
                        ? formatCurrency(cashFlowData[cashFlowData.length - 1].accumulatedFlow)
                        : formatCurrency(0)}
                </div>
            </div>
            <div className="text-xs text-blue-200/50">
                Projected Lifetime Savings
            </div>
        </div>
    </div>
</div>
                    </div>

                    {/* Project Scope */}
                    <div className="col-span-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-2 
                                  border border-gray-600/30 backdrop-blur-md ">
                        <div className="flex items-center gap-4 mb-2">
                            <div className="bg-white/10 p-2 rounded-lg">
                                <Package className="h-6 w-6 text-blue-200" />
                            </div>
                            <h3 className="font-semibold text-blue-200">Project Scope</h3>
                        </div>
                        <div className="space-y-2">
                            {[
                                'Shelter Completo & Equipado',
                                'Solar Panels & String Configurado',
                                'Instalación y conexión a la red',
                                'Capacitación Operativa',
                                'Paquete de Mantenimiento por 1 Año'
                            ].map((item, i) => (
                                <div key={i} 
                                     className="flex items-center gap-2 bg-white/5 p-4 rounded-lg border border-white/10 
                                              transition-all duration-300 hover:bg-white/10">
                                    <div className="h-2 w-2 rounded-full bg-emerald-400 shadow-lg"></div>
                                    <span className="text-gray-300">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SolarQuotation;