import React from 'react';
import { Calculator, LeafyGreen, Zap, WalletCards, LineChart } from 'lucide-react';

const PowerSummary = ({
    plantMetrics,
    monthlyMetrics,
    netBenefits,
    formatCurrency
}) => {
    // Cálculos
    const coveragePercentage = plantMetrics.selfConsumptionPercentage || 0;
    //const annualSavings = ((netBenefits.duringLeasing * 6) + (netBenefits.afterLeasing * 19)) / 25;
    const annualSavings = ((395540 + 1252544) / 25)
    const savingsPercentage =
        isNaN(annualSavings / (monthlyMetrics.totalInvoice * 12)) || !isFinite(annualSavings / (monthlyMetrics.totalInvoice * 12))
            ? plantMetrics.selfConsumptionPercentage * 0.89
            : (annualSavings / (monthlyMetrics.totalInvoice * 12)) * 100;


    const benefitsList = [
        {
            icon: <Zap className="h-6 w-6" />,
            value: `${coveragePercentage.toFixed(1)}%`,
            text: 'Cobertura del consumo energético anual'
        },
        {
            icon: <WalletCards className="h-6 w-6" />,
            value: formatCurrency(annualSavings).split('.')[0],
            text: 'Ahorro económico anual promedio'
        },
        {
            icon: <Calculator className="h-6 w-6" />,
            value: `${savingsPercentage.toFixed(1)}%`,
            text: 'Reducción en costos operativos'
        },
        {
            icon: <LeafyGreen className="h-6 w-6" />,
            value: '100%',
            text: 'Energía limpia y renovable'
        },
        {
            icon: <LineChart className="h-6 w-6" />,
            value: '25 años',
            text: 'Vida útil garantizada'
        }
    ];

    return (
        <div className= "w-[270mm] bg-[#0a0b14] relative overflow-hidden min-h-[200mm] flex flex-col text-white p-8" >
        {/* Gradientes de fondo */ }
        < div className = "absolute top-[-20%] left-[-10%] w-1/3 h-1/2 bg-[radial-gradient(circle,rgba(64,58,180,0.2)_0%,rgba(0,0,0,0)_70%)]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-1/3 h-1/2 bg-[radial-gradient(circle,rgba(138,58,180,0.2)_0%,rgba(0,0,0,0)_70%)]" />

                {/* Header */ }
                < div className = "z-10 mb-8" >
                    <p className="text-xs uppercase tracking-wider mb-2 text-gray-400" >
                        Resultados del Análisis
                            </p>
                            < h1 className = "text-3xl font-bold" >
                                Conclusiones y{ ' ' }
    <span className="text-[#8a3ab4]" > Recomendaciones </span>
        </h1>
        </div>

    {/* Dashboard Cards en línea */ }
    <div className="z-10 grid grid-cols-5 gap-4 mb-12" >
    {
        benefitsList.map((benefit, index) => (
            <div 
                        key= { index }
                        className = "bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800 flex flex-col items-center text-center"
            >
            <div className="text-[#8a3ab4] mb-3" >
            { benefit.icon }
            </div>
        < div className = "text-xl font-bold text-white mb-1" >
        { benefit.value }
        </div>
        < div className = "text-xs text-gray-400 leading-tight" >
        { benefit.text }
        </div>
        </div>
        ))
    }
        </div>

    {/* Plan de Implementación */ }
    <div className="z-10" >
        <h2 className="text-2xl font-bold text-center mb-8" >
            Plan de < span className = "text-[#8a3ab4]" > Implementación </span>
                </h2>
                < div className = "grid grid-cols-3 gap-6" >
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800" >
                        <div className="flex items-center gap-3 mb-4" >
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8a3ab4]/20 text-[#8a3ab4] font-bold" > 1 </span>
                                < h3 className = "text-lg font-semibold text-white" > Formalización </h3>
                                    </div>
                                    < ul className = "text-sm text-gray-400 space-y-2" >
                                        <li>• Revisión del contrato </li>
                                            <li>• Firma de documentación </li>
                                                <li>• Establecimiento de términos </li>
                                                    </ul>
                                                    </div>

                                                    < div className = "bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800" >
                                                        <div className="flex items-center gap-3 mb-4" >
                                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8a3ab4]/20 text-[#8a3ab4] font-bold" > 2 </span>
                                                                < h3 className = "text-lg font-semibold text-white" > Instalación </h3>
                                                                    </div>
                                                                    < ul className = "text-sm text-gray-400 space-y-2" >
                                                                        <li>• Cronograma detallado </li>
                                                                            <li>• Coordinación técnica </li>
                                                                                <li>• Capacitación del personal </li>
                                                                                    </ul>
                                                                                    </div>

                                                                                    < div className = "bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800" >
                                                                                        <div className="flex items-center gap-3 mb-4" >
                                                                                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8a3ab4]/20 text-[#8a3ab4] font-bold" > 3 </span>
                                                                                                < h3 className = "text-lg font-semibold text-white" > Seguimiento </h3>
                                                                                                    </div>
                                                                                                    < ul className = "text-sm text-gray-400 space-y-2" >
                                                                                                        <li>• Sistema de monitoreo </li>
                                                                                                            <li>• Evaluación continua </li>
                                                                                                                <li>• Optimización constante </li>
                                                                                                                    </ul>
                                                                                                                    </div>
                                                                                                                    </div>
                                                                                                                    </div>
                                                                                                                    </div>
    );
};

export default PowerSummary;