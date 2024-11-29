import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/Card3";
import { ComposedChart, ReferenceLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import { useConstants } from '../contexts/ConstantsContext';

// Definición de la interfaz DimensionarFormProps
interface DimensionarFormProps {
    contractedPower?: number;
    annualConsumption?: number;
    onSubmit?: (data: any) => void; // Puedes cambiar `any` por el tipo específico de datos si lo necesitas
}



interface Constants {
    plantGenXMw: number;              // Generación anual por MW instalado
    TOTAL_CONSUMPTION_KWH_PER_YEAR: number;
    contractedPower: number;          // Potencia contratada en kW
    ENERGY_PRICE_USD_PER_KWH: number;
    MAX_CURTAILMENT_PERCENTAGE: number;
    HOURS_GENERATION_PER_DAY: number; // Típicamente 8
}

interface ChartDataPoint {
    capacity: number;
    ahorroTotal: number;
    autoconsumo: number;
    inyeccion: number;
    curtailment: number;
}

const DimensionarForm2: React.FC<DimensionarFormProps> = () => {
    // Obtenemos los valores del contexto

    const { constants: globalConstants, updateTechnicalConstant, updateConsumptionConstant, updateDetailedMetrics } = useConstants();


    // Estados
    const [maxCapacity, setMaxCapacity] = useState<number>(5); // MW
    const [constants, setConstants] = useState<Constants>({
        plantGenXMw: globalConstants.technical?.referenceAnnualGenerationMWH, // MWh/MW/year
        TOTAL_CONSUMPTION_KWH_PER_YEAR: globalConstants.consumption?.annualConsumption || 1000000,
        contractedPower: globalConstants.technical?.contractedPowerKW || 500, // kW
        ENERGY_PRICE_USD_PER_KWH: 0.1,
        MAX_CURTAILMENT_PERCENTAGE: globalConstants.technical?.maxCurtailmentPercentage || 1,
        HOURS_GENERATION_PER_DAY: 8,
    });

    const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
    const [optimalRange, setOptimalRange] = useState({ start: 0, end: 0 });
    const [optimalAreaData, setOptimalAreaData] = useState<Array<{ capacity: number, optimalArea: number | null }>>([]);
    const [selectedMetrics, setSelectedMetrics] = useState<ChartDataPoint | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [detailedMetrics, setDetailedMetrics] = useState<any>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState({});


    // Función para validar y actualizar constantes
    const updateConstant = async (key: keyof Constants, value: string) => {
        const numValue = Number(value);
        if (!isNaN(numValue) && numValue >= 0) {
            // Actualizamos el estado local
            setConstants(prev => ({
                ...prev,
                [key]: numValue
            }));

            // Sincronizamos con el contexto global según corresponda
            if (key === 'contractedPower') {
                try {
                    await updateTechnicalConstant('contractedPowerKW', numValue);
                } catch (error) {
                    console.error('Error updating technical constant:', error);
                }
            } else if (key === 'TOTAL_CONSUMPTION_KWH_PER_YEAR') {
                try {
                    await updateConsumptionConstant('annualConsumption', numValue);
                } catch (error) {
                    console.error('Error updating consumption constant:', error);
                }
            }
        }
    };

    useEffect(() => {
        setConstants(prev => ({
            ...prev,
            contractedPower: globalConstants.technical?.contractedPowerKW || prev.contractedPower,
            TOTAL_CONSUMPTION_KWH_PER_YEAR: globalConstants.consumption?.annualConsumption || prev.TOTAL_CONSUMPTION_KWH_PER_YEAR,
        }));
    }, [globalConstants.technical?.contractedPowerKW, globalConstants.consumption?.annualConsumption]);


    //funcion de actualizacion de las metricas .
    const updateMetrics = async (metricsData) => {
        // Aseguramos que metricsData tenga la estructura correcta
        const updatedData = {
            capacityMW: metricsData.capacityMW,
            valoresAnuales: {
                generacionTotal: metricsData.valoresAnuales.generacionTotal,
                autoconsumo: metricsData.valoresAnuales.autoconsumo,
                inyeccion: metricsData.valoresAnuales.inyeccion,
                curtailment: metricsData.valoresAnuales.curtailment
            },
            porcentajes: {
                ahorroTotal: metricsData.porcentajes.ahorroTotal,
                autoconsumo: metricsData.porcentajes.autoconsumo,
                inyeccion: metricsData.porcentajes.inyeccion,
                curtailment: metricsData.porcentajes.curtailment
            }
        };

        try {
            // Llamamos a la función que actualiza `detailedMetrics` en el contexto y en la API
            await updateDetailedMetrics(updatedData);
        } catch (error) {
            console.error('Error updating metrics:', error);
            throw new Error('Error al actualizar las métricas detalladas');
        }
    };


    // Función para guardar la configuración
    const handleSave = async () => {
        if (!selectedMetrics || !detailedMetrics) return;

        setIsSaving(true);
        try {
            await updateMetrics(detailedMetrics);

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            console.error('Error saving dimensioning data:', err);
            setErrors(prev => ({
                ...prev,
                submit: 'Error al guardar los datos'
            }));
        } finally {
            setIsSaving(false);
        }
    };




    // Función para calcular métricas solares
    const calculateSolarMetrics = useCallback((capacity: number): ChartDataPoint => {
        const {
            plantGenXMw,
            TOTAL_CONSUMPTION_KWH_PER_YEAR,
            contractedPower,
            HOURS_GENERATION_PER_DAY
        } = constants;

        // Cálculos de generación
        const annualGenerationKwh = capacity * plantGenXMw * 1000;
        const dailyGenerationKwh = annualGenerationKwh / 365;
        const generationKwhPerHour = dailyGenerationKwh / HOURS_GENERATION_PER_DAY;

        // Cálculos de consumo
        const consumoHorasGeneracionKwhPerHour =
            (TOTAL_CONSUMPTION_KWH_PER_YEAR / 365 / 24) * HOURS_GENERATION_PER_DAY / HOURS_GENERATION_PER_DAY;

        // Cálculos de ahorro e inyección
        const ahorroConsumoRedKwhPerHour = Math.min(consumoHorasGeneracionKwhPerHour, generationKwhPerHour);
        const surplusGenerationKwhPerHour = Math.max(0, generationKwhPerHour - consumoHorasGeneracionKwhPerHour);

        // Límites y curtailment
        const injectionLimitKw = contractedPower * 1.1;
        const injectionKwhPerHour = Math.min(surplusGenerationKwhPerHour, injectionLimitKw);
        const curtailmentKwhPerHour = surplusGenerationKwhPerHour - injectionKwhPerHour;

        // Cálculos anuales
        const totalAhorroConsumoRedKwhPerYear = ahorroConsumoRedKwhPerHour * HOURS_GENERATION_PER_DAY * 365;
        const totalInjectionKwhPerYear = injectionKwhPerHour * HOURS_GENERATION_PER_DAY * 365;
        const totalCurtailmentKwhPerYear = curtailmentKwhPerHour * HOURS_GENERATION_PER_DAY * 365;

        // Cálculos de porcentajes
        const curtailmentPercentage = (totalCurtailmentKwhPerYear / annualGenerationKwh) * 100;
        const autoconsumoPercentage = (totalAhorroConsumoRedKwhPerYear / annualGenerationKwh) * 100;
        const inyeccionPercentage = (totalInjectionKwhPerYear / annualGenerationKwh) * 100;
        const ahorroTotalPercentage = Math.min(100,
            ((totalAhorroConsumoRedKwhPerYear + totalInjectionKwhPerYear) / TOTAL_CONSUMPTION_KWH_PER_YEAR) * 100);

        return {
            capacity: capacity * 1000, // Convertir a kW
            ahorroTotal: Number(ahorroTotalPercentage.toFixed(2)),
            autoconsumo: Number(autoconsumoPercentage.toFixed(2)),
            inyeccion: Number(inyeccionPercentage.toFixed(2)),
            curtailment: Number(curtailmentPercentage.toFixed(2))
        };
    }, [constants]);

    // Función para calcular métricas detalladas para una potencia seleccionada
    const calculateDetailedMetrics = (capacityKW: number, constants: Constants) => {
        const capacityMW = capacityKW / 1000;

        // Cálculos de generación
        const annualGenerationKwh = capacityMW * constants.plantGenXMw * 1000;
        const dailyGenerationKwh = annualGenerationKwh / 365;
        const generationKwhPerHour = dailyGenerationKwh / constants.HOURS_GENERATION_PER_DAY;

        // Cálculos de consumo
        const consumoHorasGeneracionKwhPerHour =
            (constants.TOTAL_CONSUMPTION_KWH_PER_YEAR / 365 / 24) * constants.HOURS_GENERATION_PER_DAY / constants.HOURS_GENERATION_PER_DAY;

        // Cálculos de ahorro e inyección
        const ahorroConsumoRedKwhPerHour = Math.min(consumoHorasGeneracionKwhPerHour, generationKwhPerHour);
        const surplusGenerationKwhPerHour = Math.max(0, generationKwhPerHour - consumoHorasGeneracionKwhPerHour);

        // Límites y curtailment
        const injectionLimitKw = constants.contractedPower * 1.1;
        const injectionKwhPerHour = Math.min(surplusGenerationKwhPerHour, injectionLimitKw);
        const curtailmentKwhPerHour = surplusGenerationKwhPerHour - injectionKwhPerHour;

        // Cálculos anuales
        const totalAhorroConsumoRedKwhPerYear = ahorroConsumoRedKwhPerHour * constants.HOURS_GENERATION_PER_DAY * 365;
        const totalInjectionKwhPerYear = injectionKwhPerHour * constants.HOURS_GENERATION_PER_DAY * 365;
        const totalCurtailmentKwhPerYear = curtailmentKwhPerHour * constants.HOURS_GENERATION_PER_DAY * 365;

        // Porcentajes
        const curtailmentPercentage = (totalCurtailmentKwhPerYear / annualGenerationKwh) * 100;
        const autoconsumoPercentage = (totalAhorroConsumoRedKwhPerYear / annualGenerationKwh) * 100;
        const inyeccionPercentage = (totalInjectionKwhPerYear / annualGenerationKwh) * 100;
        const ahorroTotalPercentage = Math.min(100,
            ((totalAhorroConsumoRedKwhPerYear + totalInjectionKwhPerYear) / constants.TOTAL_CONSUMPTION_KWH_PER_YEAR) * 100);

        return {
            capacityMW,
            valoresAnuales: {
                generacionTotal: annualGenerationKwh / 1000, // Convertir a MWh
                autoconsumo: totalAhorroConsumoRedKwhPerYear / 1000, // Convertir a MWh
                inyeccion: totalInjectionKwhPerYear / 1000, // Convertir a MWh
                curtailment: totalCurtailmentKwhPerYear / 1000 // Convertir a MWh
            },
            porcentajes: {
                ahorroTotal: ahorroTotalPercentage,
                autoconsumo: autoconsumoPercentage,
                inyeccion: inyeccionPercentage,
                curtailment: curtailmentPercentage
            }
        };
    };

    // Función para calcular datos del gráfico
    const calculateChartData = useCallback(() => {
        const MIN_OPTIMAL_CAPACITY = 0.2; // 200 kW mínimo
        const capacities = Array.from(
            { length: Math.floor(maxCapacity * 10) + 1 },
            (_, i) => (i * 0.1)
        );

        let optimalStart = 0;
        let optimalEnd = 0;
        const data: ChartDataPoint[] = [];

        capacities.forEach(capacity => {
            if (capacity === 0) {
                data.push({
                    capacity: 0,
                    ahorroTotal: 0,
                    autoconsumo: 0,
                    inyeccion: 0,
                    curtailment: 0
                });
                return;
            }

            const metrics = calculateSolarMetrics(capacity);
            data.push(metrics);

            // Determinar rango óptimo
            if (metrics.ahorroTotal >= 100 && optimalStart === 0) {
                optimalStart = metrics.capacity;
            }
            if (metrics.curtailment > constants.MAX_CURTAILMENT_PERCENTAGE && optimalEnd === 0) {
                optimalEnd = metrics.capacity;
            }
        });

        // Ajustes finales del rango óptimo
        if (optimalEnd === 0) optimalEnd = maxCapacity * 1000;
        if (optimalStart < MIN_OPTIMAL_CAPACITY * 1000) optimalStart = MIN_OPTIMAL_CAPACITY * 1000;

        const showLine = optimalEnd < MIN_OPTIMAL_CAPACITY * 1000;
        const optimalArea = data.map(point => ({
            capacity: point.capacity,
            optimalArea: showLine
                ? (point.capacity === MIN_OPTIMAL_CAPACITY * 1000 ? point.ahorroTotal : null)
                : (point.capacity >= optimalStart && point.capacity <= optimalEnd)
                    ? point.ahorroTotal
                    : null
        }));

        setChartData(data);
        setOptimalRange({ start: optimalStart, end: optimalEnd });
        setOptimalAreaData(optimalArea);
    }, [maxCapacity, calculateSolarMetrics, constants.MAX_CURTAILMENT_PERCENTAGE]);

    // Effect para actualizar datos cuando cambian las constantes
    useEffect(() => {
        calculateChartData();
    }, [calculateChartData]);

    // Función auxiliar para calcular todos los valores nominales y porcentuales
    // `calculateMetricsDisplay` solo realiza cálculos y devuelve los resultados
    const calculateMetricsDisplay = (metrics, constants) => {
        if (!metrics) return null;

        const capacityMW = metrics.capacity / 1000;
        const generacionTotalMWh = capacityMW * constants.plantGenXMw;

        // Cálculos de valores anuales en MWh
        const autoconsumoMWh = (metrics.autoconsumo / 100) * generacionTotalMWh;
        const inyeccionMWh = (metrics.inyeccion / 100) * generacionTotalMWh;
        const curtailmentMWh = (metrics.curtailment / 100) * generacionTotalMWh;

        // Porcentajes ya vienen calculados en metrics
        const porcentajes = {
            ahorroTotal: metrics.ahorroTotal,
            autoconsumo: metrics.autoconsumo,
            inyeccion: metrics.inyeccion,
            curtailment: metrics.curtailment
        };

        return {
            capacityMW,
            valoresAnuales: {
                generacionTotal: generacionTotalMWh,
                autoconsumo: autoconsumoMWh,
                inyeccion: inyeccionMWh,
                curtailment: curtailmentMWh
            },
            porcentajes
        };
    };


    // Llamar a `calculateMetricsDisplay` si `selectedMetrics` está disponible
    const metricsDisplay = selectedMetrics ? calculateMetricsDisplay(selectedMetrics, constants) : null;


    // Aquí iría el return...

    return (
        <div className= "w-full max-w-4xl mx-auto p-4 md:p-8 rounded-3xl bg-opacity-75 backdrop-blur-lg bg-gray-900" >
        <div className="flex items-center gap-2 mb-6" >
            <Sun className="h-6 w-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white" > Dimensionar Parque Solar </h2>
                    </div>

    {/* Variables principales */ }
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" >
        <Card className="bg-gray-800 border-gray-700" >
            <CardContent className="pt-6" >
                <div className="space-y-4" >
                    {/* Potencia Contratada */ }
                    < div >
                    <label className="block text-sm font-medium text-gray-200 mb-1" >
                        Potencia Contratada(kW)
                            </label>
                            < Input
    type = "number"
    value = { constants.contractedPower }
    onChange = {(e) => updateConstant('contractedPower', e.target.value)}
className = "bg-gray-700 text-white border-gray-600"
min = "0"
step = "10"
    />
    <p className="text-xs text-gray-400 mt-1" >
        Determina el límite de inyección a la red
            </p>
            </div>

{/* Consumo Anual */ }
<div>
    <label className="block text-sm font-medium text-gray-200 mb-1" >
        Consumo Anual(kWh / año)
            </label>
            < Input
type = "number"
value = { constants.TOTAL_CONSUMPTION_KWH_PER_YEAR }
onChange = {(e) => updateConstant('TOTAL_CONSUMPTION_KWH_PER_YEAR', e.target.value)}
className = "bg-gray-700 text-white border-gray-600"
min = "0"
step = "1000"
    />
    <p className="text-xs text-gray-400 mt-1" >
        Base para el cálculo de porcentajes de ahorro
            </p>
            </div>
            </div>
            </CardContent>
            </Card>

            < Card className = "bg-gray-800 border-gray-700" >
                <CardContent className="pt-6" >
                    <div className="space-y-4" >
                        {/* Curtailment Máximo */ }
                        < div >
                        <label className="block text-sm font-medium text-gray-200 mb-1" >
                            Curtailment Máximo(%)
                                </label>
                                < Input
type = "number"
value = { constants.MAX_CURTAILMENT_PERCENTAGE }
onChange = {(e) => updateConstant('MAX_CURTAILMENT_PERCENTAGE', e.target.value)}
className = "bg-gray-700 text-white border-gray-600"
min = "0"
max = "100"
step = "1"
    />
    <p className="text-xs text-gray-400 mt-1" >
        Límite aceptable de pérdida por curtailment
            </p>
            </div>

{/* Factor de Generación */ }
<div>
    <label className="block text-sm font-medium text-gray-200 mb-1" >
        Factor de Generación(MWh / MW / año)
            </label>
            < Input
type = "number"
value = { constants.plantGenXMw }
onChange = {(e) => updateConstant('plantGenXMw', e.target.value)}
className = "bg-gray-700 text-white border-gray-600"
min = "0"
step = "100"
    />
    <p className="text-xs text-gray-400 mt-1" >
        Generación anual esperada por MW instalado
            </p>
            </div>
            </div>
            </CardContent>
            </Card>
            </div>

{/* Slider para escala máxima */ }
<div className="mt-4" >
    <label className="block mb-1 text-sm text-white" >
        Escala Máxima de Visualización(MW)
            </label>
            < input
type = "range"
value = { maxCapacity }
onChange = {(e) => setMaxCapacity(Number(e.target.value))}
min = "1"
max = "10"
step = "0.5"
className = "w-full"
    />
    <div className="text-white text-sm mt-1" > { maxCapacity } MW </div>
        </div>

{/* Gráfico */ }

{
    selectedMetrics && detailedMetrics && (
        <div className="mt-6 space-y-6" >
            <Card className="bg-gray-800 border-gray-700" >
                <CardContent className="pt-6" >
                    <h3 className="text-lg font-semibold text-white mb-4" >
                        Análisis para { detailedMetrics.capacityMW.toFixed(2) } MW
                            </h3>
                            < div className = "grid grid-cols-1 md:grid-cols-2 gap-6 mb-4" >
                                {/* Valores Nominales Anuales */ }
                                < div className = "space-y-4" >
                                    <h4 className="text-md font-medium text-gray-300" > Valores Anuales </h4>
                                        < div className = "grid gap-3" >
                                            <div>
                                            <p className="text-sm text-gray-400" > Generación Total </p>
                                                < p className = "text-lg font-semibold text-white" >
                                                    { detailedMetrics.valoresAnuales.generacionTotal.toLocaleString() } MWh / año
                                                        </p>
                                                        </div>
                                                        < div >
                                                        <p className="text-sm text-gray-400" > Autoconsumo </p>
                                                            < p className = "text-lg font-semibold text-green-400" >
                                                                { detailedMetrics.valoresAnuales.autoconsumo.toLocaleString() } MWh / año
                                                                    </p>
                                                                    </div>
                                                                    < div >
                                                                    <p className="text-sm text-gray-400" > Inyección a Red </p>
                                                                        < p className = "text-lg font-semibold text-yellow-400" >
                                                                            { detailedMetrics.valoresAnuales.inyeccion.toLocaleString() } MWh / año
                                                                                </p>
                                                                                </div>
                                                                                < div >
                                                                                <p className="text-sm text-gray-400" > Curtailment </p>
                                                                                    < p className = "text-lg font-semibold text-orange-400" >
                                                                                        { detailedMetrics.valoresAnuales.curtailment.toLocaleString() } MWh / año
                                                                                            </p>
                                                                                            </div>
                                                                                            </div>
                                                                                            </div>

    {/* Valores Porcentuales */ }
    <div className="space-y-4" >
        <h4 className="text-md font-medium text-gray-300" > Porcentajes </h4>
            < div className = "grid gap-3" >
                <div>
                <p className="text-sm text-gray-400" > Ahorro Total del Consumo </p>
                    < p className = "text-lg font-semibold text-white" >
                        { detailedMetrics.porcentajes.ahorroTotal.toFixed(1) } %
                        </p>
                        </div>
                        < div >
                        <p className="text-sm text-gray-400" > Autoconsumo </p>
                            < p className = "text-lg font-semibold text-green-400" >
                                { detailedMetrics.porcentajes.autoconsumo.toFixed(1) } %
                                </p>
                                </div>
                                < div >
                                <p className="text-sm text-gray-400" > Inyección </p>
                                    < p className = "text-lg font-semibold text-yellow-400" >
                                        { detailedMetrics.porcentajes.inyeccion.toFixed(1) } %
                                        </p>
                                        </div>
                                        < div >
                                        <p className="text-sm text-gray-400" > Curtailment </p>
                                            < p className = "text-lg font-semibold text-orange-400" >
                                                { detailedMetrics.porcentajes.curtailment.toFixed(1) } %
                                                </p>
                                                </div>
                                                </div>
                                                </div>
                                                </div>

                                                < div className = "mt-6 flex justify-end" >
                                                    <Button
                        onClick={ handleSave }
    disabled = { isSaving }
    className = "bg-blue-500 hover:bg-blue-600 text-white font-semibold"
        >
    {
        isSaving?(
                            <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Guardando...
    </>
                        ) : (
        'Guardar Configuración'
    )
}
</Button>
    </div>
    </CardContent>
    </Card>
    </div>
)}
</div>
);
};

export default DimensionarForm2;