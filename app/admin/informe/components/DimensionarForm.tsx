import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Sun, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/Card3";
import {
    ComposedChart,
    ReferenceLine,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Area
} from 'recharts';
import { useConstants } from '../contexts/ConstantsContext';
import CapacitySelector from './CapacitySelector';

// Interface for component props
interface DimensionarFormProps {
    contractedPower?: number;
    annualConsumption?: number;
    onSubmit?: (data: any) => void; // Adjust as needed
}

// Interface for constants
interface Constants {
    plantGenXMw: number;              // Annual generation per MW installed
    MAX_CURTAILMENT_PERCENTAGE: number;
    HOURS_GENERATION_PER_DAY: number; // Typically 8
    ENERGY_PRICE_USD_PER_KWH: number;
    contractedPower: number;
    totalConsumption: number;
}

// Interface for chart data points
interface ChartDataPoint {
    capacity: number;
    ahorroTotal: number;
    autoconsumo: number;
    inyeccion: number;
    curtailment: number;
}

const DimensionarForm: React.FC<DimensionarFormProps> = () => {
    // Access global constants and update functions from context
    const {
        constants: globalConstants,
        updateTechnicalConstant,
        updateConsumptionConstant,
        updateDetailedMetrics
    } = useConstants();

    // State variables for user inputs
    const [contractedPower, setContractedPower] = useState(globalConstants.technical?.contractedPowerKW || 500);
    const [totalConsumption, setTotalConsumption] = useState(globalConstants.consumption?.annualConsumption || 1000000);

    // Memoized constants derived from global constants and local state
    const constants = useMemo(() => ({
        plantGenXMw: globalConstants.technical?.referenceAnnualGenerationMWH || 1000,
        MAX_CURTAILMENT_PERCENTAGE: globalConstants.technical?.maxCurtailmentPercentage || 1,
        HOURS_GENERATION_PER_DAY: 8, // Fixed value
        ENERGY_PRICE_USD_PER_KWH: 0.1, // Fixed value
        contractedPower,    // Include contractedPower from state
        totalConsumption,   // Include totalConsumption from state
    }), [globalConstants.technical, contractedPower, totalConsumption]);

    // Other state variables
    const [maxCapacity, setMaxCapacity] = useState<number>(5); // Max capacity for chart scaling
    const [chartData, setChartData] = useState<ChartDataPoint[]>([]); // Data for the chart
    const [optimalRange, setOptimalRange] = useState({ start: 0, end: 0 }); // Optimal capacity range
    const [optimalAreaData, setOptimalAreaData] = useState<Array<{ capacity: number, optimalArea: number | null }>>([]); // Data for optimal area shading
    const [selectedMetrics, setSelectedMetrics] = useState<ChartDataPoint | null>(null); // Metrics for selected capacity
    const [isSaving, setIsSaving] = useState(false); // Saving state
    const [detailedMetrics, setDetailedMetrics] = useState<any>(null); // Detailed metrics for selected capacity
    const [showSuccess, setShowSuccess] = useState(false); // Success message visibility
    const [errors, setErrors] = useState({}); // Error messages

    // Synchronize local state with global constants when they change
    useEffect(() => {
        const newContractedPower = globalConstants.technical?.contractedPowerKW || 500;
        if (newContractedPower !== contractedPower) {
            setContractedPower(newContractedPower);
        }

        const newTotalConsumption = globalConstants.consumption?.annualConsumption || 1000000;
        if (newTotalConsumption !== totalConsumption) {
            setTotalConsumption(newTotalConsumption);
        }
    }, [globalConstants.technical?.contractedPowerKW, globalConstants.consumption?.annualConsumption]);

    // Function to update constants based on user input
    const updateConstant = async (key: 'contractedPower' | 'totalConsumption', value: string) => {
        const numValue = Number(value);
        if (!isNaN(numValue) && numValue >= 0) {
            if (key === 'contractedPower') {
                setContractedPower(numValue);
                // Update global context
                try {
                    await updateTechnicalConstant('contractedPowerKW', numValue);
                } catch (error) {
                    console.error('Error updating technical constant:', error);
                }
            } else if (key === 'totalConsumption') {
                setTotalConsumption(numValue);
                // Update global context
                try {
                    await updateConsumptionConstant('annualConsumption', numValue);
                } catch (error) {
                    console.error('Error updating consumption constant:', error);
                }
            }
        }
    };

    // Function to calculate solar metrics for a given capacity
    const calculateSolarMetrics = useCallback((capacity: number): ChartDataPoint => {
        const { plantGenXMw, HOURS_GENERATION_PER_DAY, contractedPower, totalConsumption } = constants;

        // Annual generation in kWh
        const annualGenerationKwh = capacity * plantGenXMw * 1000;
        const dailyGenerationKwh = annualGenerationKwh / 365;
        const generationKwhPerHour = dailyGenerationKwh / HOURS_GENERATION_PER_DAY;

        // Consumption during generation hours
        const consumoHorasGeneracionKwhPerHour =
            (totalConsumption / 365 / 24) * HOURS_GENERATION_PER_DAY;

        // Savings and injection calculations
        const ahorroConsumoRedKwhPerHour = Math.min(consumoHorasGeneracionKwhPerHour, generationKwhPerHour);
        const surplusGenerationKwhPerHour = Math.max(0, generationKwhPerHour - consumoHorasGeneracionKwhPerHour);

        // Injection limits and curtailment
        const injectionLimitKw = contractedPower * 1.1;
        const injectionKwhPerHour = Math.min(surplusGenerationKwhPerHour, injectionLimitKw);
        const curtailmentKwhPerHour = surplusGenerationKwhPerHour - injectionKwhPerHour;

        // Annual calculations
        const totalAhorroConsumoRedKwhPerYear = ahorroConsumoRedKwhPerHour * HOURS_GENERATION_PER_DAY * 365;
        const totalInjectionKwhPerYear = injectionKwhPerHour * HOURS_GENERATION_PER_DAY * 365;
        const totalCurtailmentKwhPerYear = curtailmentKwhPerHour * HOURS_GENERATION_PER_DAY * 365;

        // Percentage calculations
        const curtailmentPercentage = (totalCurtailmentKwhPerYear / annualGenerationKwh) * 100;
        const autoconsumoPercentage = (totalAhorroConsumoRedKwhPerYear / annualGenerationKwh) * 100;
        const inyeccionPercentage = (totalInjectionKwhPerYear / annualGenerationKwh) * 100;
        const ahorroTotalPercentage = Math.min(100,
            ((totalAhorroConsumoRedKwhPerYear + totalInjectionKwhPerYear) / totalConsumption) * 100);

        return {
            capacity: capacity * 1000, // Convert capacity to kW
            ahorroTotal: Number(ahorroTotalPercentage.toFixed(2)),
            autoconsumo: Number(autoconsumoPercentage.toFixed(2)),
            inyeccion: Number(inyeccionPercentage.toFixed(2)),
            curtailment: Number(curtailmentPercentage.toFixed(2))
        };
    }, [constants]); // Include constants in dependencies

    // Function to calculate detailed metrics for a selected capacity
    const calculateDetailedMetrics = useCallback((capacityKW: number) => {
        const capacityMW = capacityKW / 1000; // Convert capacity to MW
        const { plantGenXMw, HOURS_GENERATION_PER_DAY, contractedPower, totalConsumption } = constants;

        // Annual generation in kWh
        const annualGenerationKwh = capacityMW * plantGenXMw * 1000;
        const dailyGenerationKwh = annualGenerationKwh / 365;
        const generationKwhPerHour = dailyGenerationKwh / HOURS_GENERATION_PER_DAY;

        // Consumption during generation hours
        const consumoHorasGeneracionKwhPerHour =
            (totalConsumption / 365 / 24);

        // Savings and injection calculations
        const ahorroConsumoRedKwhPerHour = Math.min(consumoHorasGeneracionKwhPerHour, generationKwhPerHour);
        const surplusGenerationKwhPerHour = Math.max(0, generationKwhPerHour - consumoHorasGeneracionKwhPerHour);

        // Injection limits and curtailment
        const injectionLimitKw = contractedPower * 1.1;
        const injectionKwhPerHour = Math.min(surplusGenerationKwhPerHour, injectionLimitKw);
        const curtailmentKwhPerHour = surplusGenerationKwhPerHour - injectionKwhPerHour;

        // Annual calculations
        const totalAhorroConsumoRedKwhPerYear = ahorroConsumoRedKwhPerHour * HOURS_GENERATION_PER_DAY * 365;
        const totalInjectionKwhPerYear = injectionKwhPerHour * HOURS_GENERATION_PER_DAY * 365;
        const totalCurtailmentKwhPerYear = curtailmentKwhPerHour * HOURS_GENERATION_PER_DAY * 365;

        // Percentage calculations
        const curtailmentPercentage = (totalCurtailmentKwhPerYear / annualGenerationKwh) * 100;
        const autoconsumoPercentage = (totalAhorroConsumoRedKwhPerYear / annualGenerationKwh) * 100;
        const inyeccionPercentage = (totalInjectionKwhPerYear / annualGenerationKwh) * 100;
        const ahorroTotalPercentage = Math.min(100,
            ((totalAhorroConsumoRedKwhPerYear + totalInjectionKwhPerYear) / totalConsumption) * 100);

        return {
            capacityMW,
            valoresAnuales: {
                generacionTotal: annualGenerationKwh / 1000, // Convert to MWh
                autoconsumo: totalAhorroConsumoRedKwhPerYear / 1000, // Convert to MWh
                inyeccion: totalInjectionKwhPerYear / 1000, // Convert to MWh
                curtailment: totalCurtailmentKwhPerYear / 1000 // Convert to MWh
            },
            porcentajes: {
                ahorroTotal: ahorroTotalPercentage,
                autoconsumo: autoconsumoPercentage,
                inyeccion: inyeccionPercentage,
                curtailment: curtailmentPercentage
            }
        };
    }, [constants]); // Include constants in dependencies

    // Function to calculate data for the chart
    const calculateChartData = useCallback(() => {
        const MIN_OPTIMAL_CAPACITY = 0.2; // Minimum optimal capacity in MW
        const capacities = Array.from(
            { length: Math.floor(maxCapacity * 10) + 1 },
            (_, i) => (i * 0.1) // Capacities in MW
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

            // Determine optimal range based on criteria
            if (metrics.ahorroTotal >= 100 && optimalStart === 0) {
                optimalStart = metrics.capacity;
            }
            if (metrics.curtailment > constants.MAX_CURTAILMENT_PERCENTAGE && optimalEnd === 0) {
                optimalEnd = metrics.capacity;
            }
        });

        // Final adjustments for optimal range
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

    // Recalculate chart data when inputs change
    useEffect(() => {
        calculateChartData();
    }, [calculateChartData]);

    // Function to update detailed metrics in context and API
    const updateMetrics = async (metricsData) => {
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
            await updateDetailedMetrics(updatedData);
        } catch (error) {
            console.error('Error updating metrics:', error);
            throw new Error('Error al actualizar las métricas detalladas');
        }
    };

    // Function to handle save action
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

    // Render component
    return (
        <div className= "w-full max-w-4xl mx-auto p-4 md:p-8 rounded-3xl bg-opacity-75 backdrop-blur-lg bg-gray-900" >
        {/* Header */ }
        < div className = "flex items-center gap-2 mb-6" >
            <Sun className="h-6 w-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white" > Dimensionar Parque Solar </h2>
                    </div>

    {/* Input variables */ }
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" >
        {/* Left card */ }
        < Card className = "bg-gray-800 border-gray-700" >
            <CardContent className="pt-6" >
                <div className="space-y-4" >
                    {/* Contracted Power */ }
                    < div >
                    <label className="block text-sm font-medium text-gray-200 mb-1" >
                        Potencia Contratada(kW)
                            </label>
                            < Input
    type = "number"
    value = { contractedPower }
    onChange = {(e) => updateConstant('contractedPower', e.target.value)}
className = "bg-gray-700 text-white border-gray-600"
min = "0"
step = "10"
    />
    <p className="text-xs text-gray-400 mt-1" >
        Determina el límite de inyección a la red
            </p>
            </div>

{/* Annual Consumption */ }
<div>
    <label className="block text-sm font-medium text-gray-200 mb-1" >
        Consumo Anual(kWh / año)
            </label>
            < Input
type = "number"
value = { totalConsumption }
onChange = {(e) => updateConstant('totalConsumption', e.target.value)}
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

{/* Right card */ }
<Card className="bg-gray-800 border-gray-700" >
    <CardContent className="pt-6" >
        <div className="space-y-4" >
            {/* Max Curtailment Percentage */ }
            < div >
            <label className="block text-sm font-medium text-gray-200 mb-1" >
                Curtailment Máximo(%)
                    </label>
                    < Input
type = "number"
value = { constants.MAX_CURTAILMENT_PERCENTAGE }
className = "bg-gray-700 text-white border-gray-600"
min = "0"
max = "100"
step = "1"
disabled // Assuming this is not user-editable
    />
    <p className="text-xs text-gray-400 mt-1" >
        Límite aceptable de pérdida por curtailment
            </p>
            </div>

{/* Plant Generation per MW */ }
<div>
    <label className="block text-sm font-medium text-gray-200 mb-1" >
        Factor de Generación(MWh / MW / año)
            </label>
            < Input
type = "number"
value = { constants.plantGenXMw }
className = "bg-gray-700 text-white border-gray-600"
min = "0"
step = "100"
disabled // Assuming this is not user-editable
    />
    <p className="text-xs text-gray-400 mt-1" >
        Generación anual esperada por MW instalado
            </p>
            </div>
            </div>
            </CardContent>
            </Card>
            </div>

{/* Capacity Selector */ }
<div className="mt-4" >
    <CapacitySelector
                    selectedMetrics={ selectedMetrics }
onCapacitySelect = { async(data) => {
    if (data && data.activePayload && data.activePayload[0]) {
        const selectedData = data.activePayload[0].payload;
        setSelectedMetrics(selectedData);

        try {
            const metrics = calculateDetailedMetrics(selectedData.capacity);
            setDetailedMetrics(metrics);
            await updateMetrics(metrics);
        } catch (error) {
            console.error("Error updating detailed metrics:", error);
        }
    }
}}
maxCapacity = { maxCapacity }
    />
    </div>

{/* Slider for max capacity */ }
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

{/* Chart */ }
<div className="mt-8" style = {{ height: '500px' }}>
    <ResponsiveContainer width="100%" height = "100%" >
        <ComposedChart
                        data={ chartData }
onClick = { async(data) => {
    if (data && data.activePayload && data.activePayload[0]) {
        const selectedData = data.activePayload[0].payload;
        setSelectedMetrics(selectedData);

        try {
            const metrics = calculateDetailedMetrics(selectedData.capacity);
            setDetailedMetrics(metrics);
            await updateMetrics(metrics);
        } catch (error) {
            console.error("Error updating detailed metrics:", error);
        }
    }
}}
                    >
    <CartesianGrid strokeDasharray="3 3" stroke = "#4a5568" />
        <XAxis
                            dataKey="capacity"
stroke = "#718096"
tickFormatter = {(value) => Math.round(value).toString()}
label = {{
    value: 'Capacidad Instalada (kW)',
        position: 'bottom',
            offset: 40,
                fill: '#718096',
                    fontSize: 12
}}
tick = {{ fontSize: 11 }}
                        />
    < YAxis
stroke = "#718096"
label = {{
    value: 'Porcentaje (%)',
        angle: -90,
            position: 'insideLeft',
                offset: -10,
                    fill: '#718096',
                        fontSize: 12
}}
domain = { [0, 100]}
tick = {{ fontSize: 11 }}
                        />
    < Tooltip
contentStyle = {{
    backgroundColor: '#2D3748',
        border: '1px solid #4A5568',
            fontSize: '12px',
                padding: '8px'
}}
labelStyle = {{ color: '#E2E8F0', fontWeight: 'bold', marginBottom: '4px' }}
labelFormatter = {(value) => `Capacidad: ${Math.round(value)} kW`}
formatter = {(value: number) => [`${value?.toFixed(1)}%`]}
                        />
    < Legend
verticalAlign = "bottom"
height = { 36}
wrapperStyle = {{
    paddingTop: '20px',
        fontSize: '12px'
}}
                        />
{/* Area highlighting optimal range */ }
<Area
                            type="monotone"
dataKey = "optimalArea"
data = { optimalAreaData }
name = "Rango Óptimo"
stroke = "#8884d8"
fill = "#8884d8"
fillOpacity = { 0.3}
strokeWidth = { 1}
    />
    {/* Lines for different metrics */ }
    < Line
type = "monotone"
dataKey = "ahorroTotal"
stroke = "#8884d8"
name = "Ahorro Total"
strokeWidth = { 2}
dot = { false}
    />
    <Line
                            type="monotone"
dataKey = "autoconsumo"
stroke = "#82ca9d"
name = "Autoconsumo"
strokeWidth = { 2}
dot = { false}
    />
    <Line
                            type="monotone"
dataKey = "inyeccion"
stroke = "#ffc658"
name = "Inyección"
strokeWidth = { 2}
dot = { false}
    />
    <Line
                            type="monotone"
dataKey = "curtailment"
stroke = "#ff7300"
name = "Curtailment"
strokeWidth = { 2}
dot = { false}
    />

    {/* Reference line for selected capacity */ }
{
    selectedMetrics && (
        <ReferenceLine
                                x={ selectedMetrics.capacity }
    stroke = "red"
    strokeWidth = { 2}
    strokeDasharray = "3 3"
    label = {{
        value: `${(selectedMetrics.capacity / 1000).toFixed(2)} MW`,
            position: 'top',
                fill: 'red',
                    fontSize: 12
    }
}
                            />
                        )}
</ComposedChart>
    </ResponsiveContainer>
    </div>

{/* Section displaying selected metrics */ }
{
    selectedMetrics && detailedMetrics && (
        <div className="mt-6 space-y-6" >
            <Card className="bg-gray-800 border-gray-700" >
                <CardContent className="pt-6" >
                    <h3 className="text-lg font-semibold text-white mb-4" >
                        Análisis para { detailedMetrics.capacityMW.toFixed(2) } MW
                            </h3>
                            < div className = "grid grid-cols-1 md:grid-cols-2 gap-6 mb-4" >
                                {/* Annual Values */ }
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

    {/* Percentage Values */ }
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

    {/* Save Button */ }
    <div className="mt-6 flex justify-end" >
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

export default DimensionarForm;
