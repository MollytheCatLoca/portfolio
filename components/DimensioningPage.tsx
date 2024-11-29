'use client';

import React, { useState, useEffect, useCallback } from 'react';
import HeroDimensionar from './Hero-Dimensionar';
import { useQueryParams } from '@/context/QueryParamsContext';
import { useRouter } from 'next/navigation';
import { FloatingNav } from "@/components/ui/FloatingNav";
import Footer from "@/components/Footer";
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ComposedChart, ReferenceLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area } from 'recharts';
import { Button } from "@/components/ui/button";
import { FaSolarPanel } from "react-icons/fa";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { debounce } from 'lodash';

const INITIAL_VALUES = {
    TOTAL_CONSUMPTION_KWH_PER_YEAR: { value: 2726640, title: "Consumo Total Anual (kWh)" },
    ENERGY_PRICE_USD_PER_KWH: { value: 0.130, title: "Precio de Energía (USD/kWh)" },
    MAX_CURTAILMENT_PERCENTAGE: { value: 10, title: "Máximo Curtailment (%)" },
};

const DimensioningPage = () => {
    const { setQueryParams } = useQueryParams();
    const router = useRouter();

    const [formData, setFormData] = useState({
        plantCapacity: 1.0,
        plantGenXMw: 2110,
        contractedPower: 0.5,
        ...Object.fromEntries(Object.entries(INITIAL_VALUES).map(([key, { value }]) => [key, value])),
    });

    const [chartData, setChartData] = useState([]);
    const [optimalRange, setOptimalRange] = useState({ start: 0, end: 0 });
    const [scenarios, setScenarios] = useState([]);
    const [optimalAreaData, setOptimalAreaData] = useState([]);
    const [maxCapacity, setMaxCapacity] = useState(5); // 5 MW por defecto
    const [nominalConsumption, setNominalConsumption] = useState(272664);
    const [selectedCapacity, setSelectedCapacity] = useState(null);

    const calculateChartData = useCallback(() => {
        const capacities = [0, ...Array.from(
            { length: Math.floor(maxCapacity * 10) },
            (_, i) => ((i + 1) * 0.1).toFixed(1)
        )];
        let optimalStart = 0;
        let optimalEnd = 0;
        const data = [];
        const MIN_OPTIMAL_CAPACITY = 200; // 200 kW mínimo por razones constructivas

        capacities.forEach(capacity => {
            const installedPowerKw = capacity * 1000;
            let dataPoint;

            if (capacity === 0) {
                dataPoint = {
                    capacity: 0,
                    ahorroTotal: 0,
                    autoconsumo: 0,
                    inyeccion: 0,
                    curtailment: 0,
                };
            } else {
                const annualGenerationKwh = capacity * formData.plantGenXMw * 1000;
                const dailyGenerationKwh = annualGenerationKwh / 365;
                const generationKwhPerHour = dailyGenerationKwh / 8;

                const consumoHorasGeneracionKwhPerHour = (formData.TOTAL_CONSUMPTION_KWH_PER_YEAR / 365 / 24) * 8 / 8;
                const ahorroConsumoRedKwhPerHour = Math.min(consumoHorasGeneracionKwhPerHour, generationKwhPerHour);
                const surplusGenerationKwhPerHour = Math.max(0, generationKwhPerHour - consumoHorasGeneracionKwhPerHour);

                const injectionLimitKw = formData.contractedPower * 1000 * 1.1;
                const injectionKwhPerHour = Math.min(surplusGenerationKwhPerHour, injectionLimitKw);
                const curtailmentKwhPerHour = surplusGenerationKwhPerHour - injectionKwhPerHour;

                const totalAhorroConsumoRedKwhPerYear = ahorroConsumoRedKwhPerHour * 8 * 365;
                const totalInjectionKwhPerYear = injectionKwhPerHour * 8 * 365;
                const totalCurtailmentKwhPerYear = curtailmentKwhPerHour * 8 * 365;

                const totalEnergySavingsKwh = Math.min(totalAhorroConsumoRedKwhPerYear + totalInjectionKwhPerYear, formData.TOTAL_CONSUMPTION_KWH_PER_YEAR);
                const ahorroEconomicoUsdPerYear = totalEnergySavingsKwh * formData.ENERGY_PRICE_USD_PER_KWH;

                const curtailmentPercentage = (totalCurtailmentKwhPerYear / annualGenerationKwh) * 100;
                const ahorroTotalPercentage = (totalEnergySavingsKwh / formData.TOTAL_CONSUMPTION_KWH_PER_YEAR) * 100;
                const autoconsumoPercentage = (totalAhorroConsumoRedKwhPerYear / annualGenerationKwh) * 100;
                const inyeccionPercentage = (totalInjectionKwhPerYear / annualGenerationKwh) * 100;

                dataPoint = {
                    capacity: installedPowerKw,
                    ahorroTotal: Number(ahorroTotalPercentage.toFixed(2)),
                    autoconsumo: Number(autoconsumoPercentage.toFixed(2)),
                    inyeccion: Number(inyeccionPercentage.toFixed(2)),
                    curtailment: Number(curtailmentPercentage.toFixed(2)),
                };

                // Establecemos optimalStart cuando se alcanza el 100% de ahorro
                if (ahorroTotalPercentage >= 100 && optimalStart === 0) {
                    optimalStart = installedPowerKw;
                }

                // Actualizamos optimalEnd cuando se supera el MAX_CURTAILMENT_PERCENTAGE
                if (curtailmentPercentage > formData.MAX_CURTAILMENT_PERCENTAGE && optimalEnd === 0) {
                    optimalEnd = installedPowerKw;
                }
            }

            data.push(dataPoint);
        });

        // Si optimalEnd no se estableció, lo configuramos al máximo
        if (optimalEnd === 0) {
            optimalEnd = maxCapacity * 1000;
        }

        // Ajustamos optimalStart si es menor que MIN_OPTIMAL_CAPACITY
        if (optimalStart < MIN_OPTIMAL_CAPACITY) {
            optimalStart = MIN_OPTIMAL_CAPACITY;
        }

        // Determinamos si debemos mostrar una línea en lugar de un área
        const showLine = optimalEnd < MIN_OPTIMAL_CAPACITY;

        const optimalAreaData = data.map(point => ({
            capacity: point.capacity,
            optimalArea: showLine
                ? (point.capacity === MIN_OPTIMAL_CAPACITY ? point.ahorroTotal : null)
                : (point.capacity >= optimalStart && point.capacity <= optimalEnd)
                    ? point.ahorroTotal
                    : null
        }));

        setChartData(data);
        setOptimalRange({ start: optimalStart, end: optimalEnd });
        setOptimalAreaData(optimalAreaData);
    }, [formData, maxCapacity]);


    const debouncedCalculateChartData = useCallback(
        debounce(calculateChartData, 300),
        [calculateChartData]
    );

    useEffect(() => {
        debouncedCalculateChartData();
    }, [formData, debouncedCalculateChartData, nominalConsumption])




    useEffect(() => {
        const fetchScenarios = async () => {
            try {
                const response = await fetch('/api/scenarios');
                if (!response.ok) {
                    throw new Error('Failed to fetch scenarios');
                }
                const data = await response.json();
                setScenarios(data);
            } catch (error) {
                console.error('Error fetching scenarios:', error);
            }
        };

        fetchScenarios();
    }, []);

    const handleChange = (name: string, value: number) => {
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
        if (name === 'TOTAL_CONSUMPTION_KWH_PER_YEAR') {
            setNominalConsumption(value);
        }
    };

    const handleSimulate = () => {
        setQueryParams(formData);
        router.push(`/energy/simulate?${new URLSearchParams(formData).toString()}`);
    };

    const handleChartClick = (data) => {
        if (data && data.activePayload && data.activePayload.length > 0) {
            const selectedData = data.activePayload[0].payload;
            setSelectedCapacity(selectedData.capacity);
            handleChange('plantCapacity', selectedData.capacity / 1000); // Convertir kW a MW

            // Calculamos las métricas y actualizamos el contexto
            const metricsDisplay = calculateMetricsDisplay(selectedData, constants);

            if (metricsDisplay) {
                try {
                    const updatedConstants = {
                        ...constants,
                        detailedMetrics: metricsDisplay
                    };

                    // Enviamos la actualización al API
                    axios.post('/api/constants', updatedConstants)
                        .catch(error => console.error('Error updating metrics:', error));

                } catch (error) {
                    console.error('Error processing metrics:', error);
                }
            }
        }
    };

    const handleChartMouseLeave = () => {
        // No hacemos nada aquí para mantener la línea de referencia
    };

    const formatPercentage = (value) => {
        return typeof value === 'number' ? value.toFixed(2) : value;
    };



    const navItems = [
        { name: "Home", link: "/" },
        { name: "Energy", link: "/energy" },
        { name: "Simulate", link: "/energy/simulate" },
        { name: "All In One", link: "/energy/all-in-one" },
    ];
    //relative bg-gradient-to-b from-[#000B18] to-[#111928] min-h-screen flex justify-center items-center flex-col mx-auto sm:px-5 px-1
    return (
        <main className= "relative bg-gradient-to-b from-[#000B18] to-[#111928] min-h-screen flex flex-col" >

        <div className=" top-0 left-0 right-0 z-50" >
            <div className = "w-full max-w-7xl mx-auto px-1 sm:px-1 lg:px-1" >
                <HeroDimensionar className="w-full" />
                    <div className="mt-1 z-60" >
                        <FloatingNav navItems={ navItems } />
                            </div>
                            < div className = "relative w-full px-6 sm:px-6 lg:px-6 pt-1" >
                                <Card className = "bg-black-200 border-gray-800 mt-20 w-full max-w-none px-2" >
                                    <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-white" > Dimensionamiento del Parque Solar </CardTitle>
                                        </CardHeader>
                                        < CardContent className = "max-w-7xl mx-auto" >
                                            <div className="space-y-4" >
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4" >
                                                    <div>
                                                    <label htmlFor="plantCapacity" className = "block mb-1 text-sm text-white" > Capacidad de la Planta(MW) </label>
                                                        < div className = "flex" >
                                                            <input
                                            type="number"
    id = "plantCapacity"
    value = { formData.plantCapacity }
    onChange = {(e) => handleChange('plantCapacity', Number(e.target.value))}
className = "w-full bg-[#1b1b3a] border border-[#3b3b4f] rounded-l-3xl px-3 py-2 text-sm text-white"
min = "0.1"
max = "5"
step = "0.1"
    />
    <Dialog>
    <DialogTrigger asChild >
    <Button className="bg-[#4a4ae2] hover:bg-[#3b3be0] text-white font-bold py-2 px-4 rounded-r-3xl" >
        Ajustar
        </Button>
        </DialogTrigger>
        < DialogContent className = "bg-[#1b1b3a] text-white" >
            <DialogHeader>
            <DialogTitle>Ajustar Factor de Generación </DialogTitle>
                </DialogHeader>
                < div className = "py-4" >
                    <label htmlFor="plantGenXMw" className = "block mb-1 text-sm" > Generación por MW(MWh / año) </label>
                        < input
type = "number"
id = "plantGenXMw"
value = { formData.plantGenXMw }
onChange = {(e) => handleChange('plantGenXMw', Number(e.target.value))}
className = "w-full bg-[#2d2d5a] border border-[#3b3b4f] rounded-3xl px-3 py-2 text-sm"
    />
    </div>
    </DialogContent>
    </Dialog>
    </div>
    </div>
    < div >
    <label htmlFor="contractedPower" className = "block mb-1 text-sm text-white" > Potencia Contratada(MW) </label>
        < Select
value = { formData.contractedPower.toString() }
onValueChange = {(newValue) => handleChange('contractedPower', Number(newValue))}
                                    >
    <SelectTrigger className="w-full bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 py-2 text-sm text-white" >
        <SelectValue>{ formData.contractedPower } </SelectValue>
        </SelectTrigger>
        < SelectContent className = "bg-[#1b1b3a] border border-[#3b3b4f] text-white" >
        {
            [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3, 4, 5].map((option) => (
                <SelectItem key= { option } value = { option.toString() } > { option } MW </SelectItem>
            ))
        }
            </SelectContent>
            </Select>
            </div>
            < div >
            <label htmlFor="TOTAL_CONSUMPTION_KWH_PER_YEAR" className = "block mb-1 text-sm text-white" > Consumo Total Anual(kWh) </label>
                < div className = "flex" >
                    <Select
                                            value={ formData.TOTAL_CONSUMPTION_KWH_PER_YEAR.toString() }
onValueChange = {(newValue) => handleChange('TOTAL_CONSUMPTION_KWH_PER_YEAR', Number(newValue))}
                                        >
    <SelectTrigger className="w-full bg-[#1b1b3a] border border-[#3b3b4f] rounded-l-3xl px-3 py-2 text-sm text-white" >
        <SelectValue>{ formData.TOTAL_CONSUMPTION_KWH_PER_YEAR } </SelectValue>
        </SelectTrigger>
        < SelectContent className = "bg-[#1b1b3a] border border-[#3b3b4f] text-white" >
        {
            [0.75, 1, 1.25, 1.5, 2].map((factor) => {
                const value = Math.round(nominalConsumption * factor);
                return (
                    <SelectItem key= { value } value = { value.toString() } >
                        { value } kWh({ factor * 100} %)
                            </SelectItem>
                                                    );
        })}
</SelectContent>
    </Select>
    < Dialog >
    <DialogTrigger asChild >
    <Button className="bg-[#4a4ae2] hover:bg-[#3b3be0] text-white font-bold py-2 px-4 rounded-r-3xl" >
        Ajustar
        </Button>
        </DialogTrigger>
        < DialogContent className = "bg-[#1b1b3a] text-white" >
            <DialogHeader>
            <DialogTitle>Ajustar Consumo Nominal </DialogTitle>
                </DialogHeader>
                < div className = "py-4" >
                    <label htmlFor="nominalConsumption" className = "block mb-1 text-sm" > Consumo Nominal(kWh / año) </label>
                        < input
type = "number"
id = "nominalConsumption"
value = { nominalConsumption }
onChange = {(e) => {
    const newValue = Number(e.target.value);
    setNominalConsumption(newValue);
    handleChange('TOTAL_CONSUMPTION_KWH_PER_YEAR', newValue);
}}
className = "w-full bg-[#2d2d5a] border border-[#3b3b4f] rounded-3xl px-3 py-2 text-sm"
    />
    </div>
    </DialogContent>
    </Dialog>
    </div>
    </div>
    < div >
    <label htmlFor="ENERGY_PRICE_USD_PER_KWH" className = "block mb-1 text-sm text-white" > Precio de Energía(USD / kWh) </label>
        < Select
value = { formData.ENERGY_PRICE_USD_PER_KWH.toString() }
onValueChange = {(newValue) => handleChange('ENERGY_PRICE_USD_PER_KWH', Number(newValue))}
                                    >
    <SelectTrigger className="w-full bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 py-2 text-sm text-white" >
        <SelectValue>{ formData.ENERGY_PRICE_USD_PER_KWH } </SelectValue>
        </SelectTrigger>
        < SelectContent className = "bg-[#1b1b3a] border border-[#3b3b4f] text-white" >
        {
            [0.5, 0.75, 1, 1.25, 1.5].map((factor) => {
                const value = (INITIAL_VALUES.ENERGY_PRICE_USD_PER_KWH.value * factor).toFixed(3);
                return (
                    <SelectItem key= { value } value = { value } >
                        { value } USD / kWh
                            </SelectItem>
                                                );
        })}
</SelectContent>
    </Select>
    </div>
    < div >
    <label htmlFor="MAX_CURTAILMENT_PERCENTAGE" className = "block mb-1 text-sm text-white" > Máximo Curtailment(%) </label>
        < Select
value = { formData.MAX_CURTAILMENT_PERCENTAGE.toString() }
onValueChange = {(newValue) => handleChange('MAX_CURTAILMENT_PERCENTAGE', Number(newValue))}
                                    >
    <SelectTrigger className="w-full bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 py-2 text-sm text-white" >
        <SelectValue>{ formData.MAX_CURTAILMENT_PERCENTAGE } </SelectValue>
        </SelectTrigger>
        < SelectContent className = "bg-[#1b1b3a] border border-[#3b3b4f] text-white" >
        {
            [5, 7.5, 10, 12.5, 15].map((value) => (
                <SelectItem key= { value } value = { value.toString() } >
                { value } %
                </SelectItem>
            ))
        }
            </SelectContent>
            </Select>
            </div>
            </div>
            < Button onClick = { calculateChartData } className = "w-full flex items-center justify-center bg-[#4a4ae2] hover:bg-[#3b3be0] text-white font-bold py-2 px-4 rounded-3xl" >
                <FaSolarPanel className="mr-2" />
                    Dimensionar
                    </Button>
                    </div>
{
    chartData.length > 0 && (
        <div className="mt-8" >
            <ResponsiveContainer width="100%" height = { 500} >
                <ComposedChart data={ chartData } margin = {{ top: 5, right: 20, left: 20, bottom: 40 }
}
onClick = { handleChartClick }
onMouseLeave = { handleChartMouseLeave }

    >
    <CartesianGrid strokeDasharray="3 3" stroke = "#4a5568" />
        <XAxis 
                                            dataKey="capacity"
stroke = "#718096"
label = {{ value: 'Capacidad Instalada (kW)', position: 'insideBottom', offset: -10, fill: '#718096' }
}
domain = { [0, maxCapacity * 1000]}
ticks = { [0, ...Array.from({ length: maxCapacity }, (_, i) => (i + 1) * 1000)] }
    />
    <YAxis stroke="#718096" label = {{ value: 'Porcentaje (%)', angle: -90, position: 'insideLeft', fill: '#718096' }} />
        < Tooltip
contentStyle = {{ backgroundColor: '#2D3748', border: '1px solid #4A5568' }}
labelStyle = {{ color: '#E2E8F0' }}
itemStyle = {{ color: '#A0AEC0' }}
                                        />

    < Legend wrapperStyle = {{ color: '#A0AEC0', marginTop: '-14px', fontSize: '16px' }}
verticalAlign = "top"
height = { 36} />
    <Line type = "monotone" dataKey = "ahorroTotal" stroke = "#8884d8" name = "Ahorro Total (%)" />
        <Line type="monotone" dataKey = "autoconsumo" stroke = "#82ca9d" name = "Autoconsumo (%)" />
            <Line type="monotone" dataKey = "inyeccion" stroke = "#ffc658" name = "Inyección a la Red (%)" />
                <Line type="monotone" dataKey = "curtailment" stroke = "#ff7300" name = "Curtailment (%)" />

                    <Area
type = "monotone"
data = { optimalAreaData }
dataKey = "optimalArea"
stroke = "#8884d8"
fill = "#8884d8"
fillOpacity = { 0.3}
activeDot = { false}
dot = { false}
isAnimationActive = { false}
    />
    { selectedCapacity && (
        <ReferenceLine 
            x={ selectedCapacity }
stroke = "red"
label = {{
    value: `${selectedCapacity} kW`,
        position: 'top',
            fill: 'red'
}} 
        />
    )}

</ComposedChart>
    </ResponsiveContainer>
    < div className = "mt-4" >
        <label htmlFor="maxCapacity" className = "block mb-1 text-sm text-white" >
            Capacidad Máxima(MW)
                </label>
                < input
type = "range"
id = "maxCapacity"
value = { maxCapacity }
onChange = {(e) => setMaxCapacity(Number(e.target.value))}
min = "1"
max = "10"
step = "0.5"
className = "w-full"
    />
    <div className="text-white text-sm mt-1" > { maxCapacity } MW </div>
        </div>
        < div className = "mt-4 text-center" >
            <p className="text-sm text-gray-300" >
                Rango Óptimo: <span className="font-semibold text-white" > { optimalRange.start.toFixed(2) } kW - { optimalRange.end.toFixed(2) } kW </span>
                    </p>
                    < Button onClick = { handleSimulate } className = "mt-4 bg-[#4a4ae2] hover:bg-[#3b3be0] text-white font-bold py-2 px-4 rounded-3xl" >
                        Ir a Simulación
                            </Button>
                            </div>
                            </div>
                        )}
</CardContent>
    </Card>
    </div>
    </div>
    </div>
    < Link href = "/" >
        <Footer />
        </Link>
        </main>
    );
    
};

export default DimensioningPage;