import React from 'react';
import { Sun, Battery, Gauge, WalletCards, LineChart } from 'lucide-react';
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
        plantCapacityKW: constants.detailedMetrics.capacityMW,
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
            icon: <Sun className="h-6 w-6" />,
            value: `${summaryData.potenciaInstalada} kW`,
            text: 'Potencia total instalada'
        },
        {
            icon: <Battery className="h-6 w-6" />,
            value: `${summaryData.generacionAnual} MWh`,
            text: 'Generación anual estimada'
        },
        {
            icon: <WalletCards className="h-6 w-6" />,
            value: formatCurrency(summaryData.ahorroAnual),
            text: 'Ahorro anual proyectado'
        },
        {
            icon: <Gauge className="h-6 w-6" />,
            value: '98.6%',
            text: 'Eficiencia del sistema'
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
                        Análisis Técnico - Financiero
                            </p>
                            < h1 className = "text-3xl font-bold" >
                                Resumen del{ ' ' }
    <span className="text-[#8a3ab4]" > Parque Solar </span>
        </h1>
        </div>

    {/* Dashboard Cards */ }
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
            Proceso de < span className = "text-[#8a3ab4]" > Implementación </span>
                </h2>
                < div className = "grid grid-cols-3 gap-6" >
                    <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800" >
                        <div className="flex items-center gap-3 mb-4" >
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8a3ab4]/20 text-[#8a3ab4] font-bold" > 1 </span>
                                < h3 className = "text-lg font-semibold text-white" > Provisión </h3>
                                    </div>
                                    < ul className = "text-sm text-gray-400 space-y-2" >
                                        <li>• Shelter equipado completo </li>
                                            <li>• { summaryData.potenciaInstalada } kW en paneles </li>
                                                <li>• Strings e inversores </li>
                                                    <li>• Sistema de monitoreo </li>
                                                        </ul>
                                                        </div>

                                                        < div className = "bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800" >
                                                            <div className="flex items-center gap-3 mb-4" >
                                                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8a3ab4]/20 text-[#8a3ab4] font-bold" > 2 </span>
                                                                    < h3 className = "text-lg font-semibold text-white" > Instalación </h3>
                                                                        </div>
                                                                        < ul className = "text-sm text-gray-400 space-y-2" >
                                                                            <li>• Montaje de estructuras </li>
                                                                                <li>• Conexión eléctrica </li>
                                                                                    <li>• Configuración de inversores </li>
                                                                                        <li>• Puesta en marcha </li>
                                                                                            </ul>
                                                                                            </div>

                                                                                            < div className = "bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800" >
                                                                                                <div className="flex items-center gap-3 mb-4" >
                                                                                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#8a3ab4]/20 text-[#8a3ab4] font-bold" > 3 </span>
                                                                                                        < h3 className = "text-lg font-semibold text-white" > Operación </h3>
                                                                                                            </div>
                                                                                                            < ul className = "text-sm text-gray-400 space-y-2" >
                                                                                                                <li>• Capacitación del personal </li>
                                                                                                                    <li>• Mantenimiento incluido 1 año </li>
                                                                                                                        <li>• Soporte técnico continuo </li>
                                                                                                                            <li>• Optimización del sistema </li>
                                                                                                                                </ul>
                                                                                                                                </div>
                                                                                                                                </div>
                                                                                                                                </div>
                                                                                                                                </div>
    );
};

export default SolarParkSummary;