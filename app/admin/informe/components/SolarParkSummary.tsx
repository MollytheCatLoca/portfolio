import React from 'react';
import { Sun, Battery, Gauge, WalletCards, LineChart, Zap, Clock, Shield, ArrowRight } from 'lucide-react';
import { calcularMetricasManuales } from '../data/constants_pdf';
import { useConstants } from '../contexts/ConstantsContext';

interface SolarSummaryProps {
    formatCurrency?: (value: number) => string;
}

const SolarParkSummary: React.FC<SolarSummaryProps> = ({
    formatCurrency = (value) =>
        new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value)
}) => {
    const { constants } = useConstants();

    const calculatePlantMetrics = () => ({
        plantCapacityKW: constants.detailedMetrics.capacityMW.toFixed(3),
        annualGenerationMWh: constants.detailedMetrics.valoresAnuales.generacionTotal,
        selfConsumptionMWh: constants.detailedMetrics.valoresAnuales.autoconsumo,
        gridInjectionMWh: constants.detailedMetrics.valoresAnuales.inyeccion,
        curtailmentMWh: constants.detailedMetrics.valoresAnuales.curtailment
    });

    const plantMetrics = calculatePlantMetrics();
    const manualMetrics = calcularMetricasManuales(plantMetrics.plantCapacityKW);

    // Datos calculados del parque
    const summaryData = {
        potenciaInstalada: plantMetrics.plantCapacityKW * 1000,
        generacionAnual: manualMetrics.energiaGenerada, // MWh
        ahorroAnual: (manualMetrics.ahorroTotalProyecto / manualMetrics.vidaUtil),
        duracionLeasing: manualMetrics.duracionLeasing,
        vidaUtil: manualMetrics.vidaUtil, // años
    };

    const benefitsList = [
        {
            icon: <Sun className="h-5 w-5" />,
            value: `${summaryData.potenciaInstalada} kW`,
            text: 'Potencia total instalada',
            color: 'from-yellow-600/20 to-yellow-400/5'
        },
        {
            icon: <Battery className="h-5 w-5" />,
            value: `${summaryData.generacionAnual} MWh`,
            text: 'Generación anual estimada',
            color: 'from-green-600/20 to-green-400/5'
        },
        {
            icon: <WalletCards className="h-5 w-5" />,
            value: formatCurrency(summaryData.ahorroAnual),
            text: 'Ahorro anual proyectado',
            color: 'from-blue-600/20 to-blue-400/5'
        },
        {
            icon: <Gauge className="h-5 w-5" />,
            value: '98.6%',
            text: 'Eficiencia del sistema',
            color: 'from-purple-600/20 to-purple-400/5'
        },
        {
            icon: <LineChart className="h-5 w-5" />,
            value: '25 años',
            text: 'Vida útil garantizada',
            color: 'from-indigo-600/20 to-indigo-400/5'
        }
    ];

    const implementationSteps = [
        {
            title: 'Provisión',
            items: [
                'Shelter equipado completo',
                `${summaryData.potenciaInstalada} kW en paneles`,
                'Strings e inversores',
                'Sistema de monitoreo'
            ],
            icon: <Zap className="h-5 w-5" />
        },
        {
            title: 'Instalación',
            items: [
                'Montaje de estructuras',
                'Conexión eléctrica',
                'Configuración de inversores',
                'Puesta en marcha'
            ],
            icon: <Clock className="h-5 w-5" />
        },
        {
            title: 'Operación',
            items: [
                'Capacitación del personal',
                'Mantenimiento incluido 1 año',
                'Soporte técnico continuo',
                'Optimización del sistema'
            ],
            icon: <Shield className="h-5 w-5" />
        }
    ];

    return (
        <div className="w-[270mm] bg-gradient-to-b from-[#0a0b14] to-[#12131e] relative overflow-hidden min-h-[200mm] flex flex-col text-white p-8">
            {/* Elementos decorativos de fondo */}
            <div className="absolute top-[-20%] left-[-10%] w-1/3 h-1/2 bg-[radial-gradient(circle,rgba(64,58,180,0.15)_0%,rgba(0,0,0,0)_70%)]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-1/3 h-1/2 bg-[radial-gradient(circle,rgba(138,58,180,0.15)_0%,rgba(0,0,0,0)_70%)]" />
            <div className="absolute top-[30%] right-[10%] w-24 h-24 bg-[radial-gradient(circle,rgba(64,200,180,0.03)_0%,rgba(0,0,0,0)_70%)]" />
            <div className="absolute bottom-[40%] left-[20%] w-32 h-32 bg-[radial-gradient(circle,rgba(255,180,0,0.03)_0%,rgba(0,0,0,0)_70%)]" />

            {/* Header mejorado */}
            <div className="z-10 mb-8 border-b border-gray-800/50 pb-4">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-xs uppercase tracking-wider mb-1 text-gray-400 pl-1">
                            Análisis Técnico - Financiero
                        </p>
                        <h1 className="text-2xl font-bold flex items-center">
                            Resumen del{' '}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a742d6] to-[#7363d2] ml-1">
                                Parque Solar
                            </span>
                        </h1>
                    </div>
                    <div className="flex items-center text-xs text-gray-400 bg-gray-800/40 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-gray-700/50">
                        <Sun className="h-3.5 w-3.5 mr-2 text-yellow-500" />
                        Capacidad: <span className="font-semibold text-white ml-1">{summaryData.potenciaInstalada} kW</span>
                    </div>
                </div>
            </div>

            {/* Dashboard Cards Mejoradas */}
            <div className="z-10 grid grid-cols-5 gap-4 mb-8">
                {benefitsList.map((benefit, index) => (
                    <div
                        key={index}
                        className="bg-gray-900/40 backdrop-blur-sm p-4 rounded-xl border border-gray-800/60 hover:border-gray-700/50 transition-all duration-300"
                    >
                        <div className={`flex justify-center mb-2.5 bg-gradient-to-r ${benefit.color} p-2 rounded-lg`}>
                            <div className="text-[#a742d6]">
                                {benefit.icon}
                            </div>
                        </div>
                        <div className="text-lg font-bold text-white mb-1 text-center">
                            {benefit.value}
                        </div>
                        <div className="text-xs text-gray-400 leading-tight text-center">
                            {benefit.text}
                        </div>
                    </div>
                ))}
            </div>

            {/* Plan de Implementación Mejorado */}
            <div className="z-10">
                <div className="text-center mb-6">
                    <h2 className="text-xl font-bold inline-block relative">
                        Proceso de{' '}
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#a742d6] to-[#7363d2]">
                            Implementación
                        </span>
                        <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#a742d6]/50 to-transparent"></div>
                    </h2>
                </div>

                <div className="grid grid-cols-3 gap-5">
                    {implementationSteps.map((step, index) => (
                        <div key={index} className="bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-800/60 overflow-hidden hover:border-gray-700/50 transition-all duration-300">
                            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-b border-gray-800/60">
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8a3ab4]/20 text-[#a742d6]">
                                    {step.icon}
                                </div>
                                <div className="flex items-center">
                                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#8a3ab4]/10 text-[#a742d6] text-xs font-bold mr-2">
                                        {index + 1}
                                    </span>
                                    <h3 className="text-base font-semibold text-white">
                                        {step.title}
                                    </h3>
                                </div>
                            </div>
                            <div className="p-4">
                                <ul className="text-sm text-gray-400 space-y-2">
                                    {step.items.map((item, idx) => (
                                        <li key={idx} className="flex items-start">
                                            <ArrowRight className="h-3 w-3 text-[#a742d6] mr-2 mt-1 flex-shrink-0" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pie de página con información adicional */}
            <div className="mt-auto pt-6 z-10 text-center border-t border-gray-800/50">
                <p className="text-xs text-gray-500 italic">
                    Los valores presentados son estimaciones basadas en condiciones óptimas y pueden variar según factores climáticos y operativos.
                </p>
            </div>
        </div>
    );
};

export default SolarParkSummary;