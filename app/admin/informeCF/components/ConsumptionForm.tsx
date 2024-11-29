'use client';

import React from 'react';
import { Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from 'axios';

interface ConsumptionFormProps {
    onSubmit: (values: any) => void;
}

const ConsumptionForm: React.FC<ConsumptionFormProps> = ({ onSubmit }) => {
    const [values, setValues] = React.useState({
        annualConsumption: '',
        picoMonthly: '',
        valleMonthly: '',
        restoMonthly: ''
    });

    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isSaving, setIsSaving] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [lastUpdated, setLastUpdated] = React.useState<'annual' | 'monthly' | null>(null);

    // Cargar datos guardados
    React.useEffect(() => {
        async function loadConsumptionData() {
            try {
                const response = await axios.get('/api/consumption');
                if (response.data) {
                    setValues({
                        annualConsumption: response.data.annualConsumption?.toString() || '',
                        picoMonthly: response.data.picoMonthly?.toString() || '',
                        valleMonthly: response.data.valleMonthly?.toString() || '',
                        restoMonthly: response.data.restoMonthly?.toString() || ''
                    });
                }
            } catch (error) {
                console.error('Error loading consumption data:', error);
            } finally {
                setIsLoading(false);
            }
        }
        loadConsumptionData();
    }, []);

    // Cálculos automáticos
    const calculateFromAnnual = (annualValue: number) => {
        const monthlyTotal = annualValue / 12;
        setValues(prev => ({
            ...prev,
            annualConsumption: annualValue.toString(),
            picoMonthly: (monthlyTotal * 0.4).toFixed(2),  // 40% pico
            valleMonthly: (monthlyTotal * 0.3).toFixed(2), // 30% valle
            restoMonthly: (monthlyTotal * 0.3).toFixed(2)  // 30% resto
        }));
        setLastUpdated('annual');
    };

    const calculateFromMonthly = (pico: number, valle: number, resto: number) => {
        const monthlyTotal = pico + valle + resto;
        setValues(prev => ({
            ...prev,
            annualConsumption: (monthlyTotal * 12).toFixed(2),
            picoMonthly: pico.toString(),
            valleMonthly: valle.toString(),
            restoMonthly: resto.toString()
        }));
        setLastUpdated('monthly');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const numValue = Number(value);

        if (name === 'annualConsumption' && !isNaN(numValue)) {
            calculateFromAnnual(numValue);
        } else if (['picoMonthly', 'valleMonthly', 'restoMonthly'].includes(name)) {
            const newValues = {
                ...values,
                [name]: value
            };

            // Solo calculamos si tenemos los tres valores
            const pico = Number(name === 'picoMonthly' ? value : values.picoMonthly);
            const valle = Number(name === 'valleMonthly' ? value : values.valleMonthly);
            const resto = Number(name === 'restoMonthly' ? value : values.restoMonthly);

            if (!isNaN(pico) && !isNaN(valle) && !isNaN(resto)) {
                calculateFromMonthly(pico, valle, resto);
            } else {
                setValues(newValues);
            }
        }

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const annual = Number(values.annualConsumption);
        const pico = Number(values.picoMonthly);
        const valle = Number(values.valleMonthly);
        const resto = Number(values.restoMonthly);

        if (lastUpdated === 'annual') {
            // Validar que los porcentajes sean correctos
            const monthlyTotal = annual / 12;
            const picoPercentage = (pico / monthlyTotal) * 100;
            const vallePercentage = (valle / monthlyTotal) * 100;
            const restoPercentage = (resto / monthlyTotal) * 100;

            if (Math.abs(picoPercentage - 40) > 0.1) {
                newErrors.picoMonthly = 'El consumo pico debe ser 40% del mensual';
            }
            if (Math.abs(vallePercentage - 30) > 0.1) {
                newErrors.valleMonthly = 'El consumo valle debe ser 30% del mensual';
            }
            if (Math.abs(restoPercentage - 30) > 0.1) {
                newErrors.restoMonthly = 'El consumo resto debe ser 30% del mensual';
            }
        } else {
            // Validar que la suma * 12 coincida con el anual
            const calculatedAnnual = (pico + valle + resto) * 12;
            if (Math.abs(calculatedAnnual - annual) > 0.1) {
                newErrors.annualConsumption = 'El consumo anual debe coincidir con la suma de los consumos mensuales * 12';
            }
        }

        // Validaciones generales
        if (!annual || annual < 0) {
            newErrors.annualConsumption = 'El consumo anual debe ser positivo';
        }
        if (!pico || pico < 0) {
            newErrors.picoMonthly = 'El consumo pico debe ser positivo';
        }
        if (!valle || valle < 0) {
            newErrors.valleMonthly = 'El consumo valle debe ser positivo';
        }
        if (!resto || resto < 0) {
            newErrors.restoMonthly = 'El consumo resto debe ser positivo';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSaving(true);
            try {
                // Preparar datos para guardar
                const consumptionData = {
                    consumption: {
                        annualConsumption: Number(values.annualConsumption),
                        picoMonthly: Number(values.picoMonthly),
                        valleMonthly: Number(values.valleMonthly),
                        restoMonthly: Number(values.restoMonthly)
                    }
                };

                // Guardar en el backend
                await axios.post('/api/consumption', consumptionData);

                // Notificar al componente padre
                await onSubmit(consumptionData.consumption);

                // Mostrar mensaje de éxito
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.classList.remove('opacity-0');
                    setTimeout(() => {
                        successMessage.classList.add('opacity-0');
                    }, 3000);
                }
            } catch (error) {
                console.error('Error saving consumption data:', error);
            } finally {
                setIsSaving(false);
            }
        }
    };

    const customStyle = {
        backdropFilter: "blur(16px) saturate(180%)",
        backgroundColor: "rgba(17, 25, 40, 0.75)",
        border: "1px solid rgba(255, 255, 255, 0.125)",
    };

    return (
        <div className= "w-full max-w-2xl mx-auto p-4 md:p-8 rounded-3xl" style = { customStyle } >
            <div className="flex items-center gap-2 mb-6" >
                <Zap className="h-6 w-6 text-yellow-400" />
                    <h2 className="text-2xl font-bold text-white" > Datos de Consumo Energético </h2>
                        </div>

                        < div id = "successMessage" className = "bg-green-900/50 border border-green-500/50 text-green-200 px-4 py-3 rounded-3xl text-sm mb-6 opacity-0 transition-opacity duration-300" >
                            Datos de consumo guardados correctamente
                                </div>

                                < form onSubmit = { handleSubmit } className = "space-y-6" >
                                    <div className="grid grid-cols-2 gap-4" >
                                        {/* Consumo Anual */ }
                                        < div className = "relative" >
                                            <label htmlFor="annualConsumption" className = "block text-sm text-white mb-1" >
                                                Consumo Anual(kWh / año)
                                                    </label>
                                                    < input
    type = "text"
    id = "annualConsumption"
    name = "annualConsumption"
    value = { Number(values.annualConsumption).toLocaleString('en-US').split('.')[0] }
    onKeyPress = {(e) => {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
}}
onChange = {(e) => {
    const value = e.target.value.replace(/\D/g, '');
    handleChange({
        target: {
            name: 'annualConsumption',
            value: value
        }
    } as React.ChangeEvent<HTMLInputElement>);
}}
className = {`h-8 w-full text-right font-mono bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 text-white outline-none
                                ${errors.annualConsumption ? 'border-red-500' : ''}`}
placeholder = "0"
    />
{
    errors.annualConsumption && (
        <p className="text-sm text-red-400 mt-1"> { errors.annualConsumption } </p>
                        )
}
    </div>

{/* Consumo Pico */ }
<div className="relative" >
    <label htmlFor="picoMonthly" className = "block text-sm text-white mb-1" >
        Consumo Pico(kWh / mes)
            </label>
            < input
type = "text"
id = "picoMonthly"
name = "picoMonthly"
value = { Number(values.picoMonthly).toLocaleString('en-US').split('.')[0] }
onKeyPress = {(e) => {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
}}
onChange = {(e) => {
    const value = e.target.value.replace(/\D/g, '');
    handleChange({
        target: {
            name: 'picoMonthly',
            value: value
        }
    } as React.ChangeEvent<HTMLInputElement>);
}}
className = {`h-8 w-full text-right font-mono bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 text-white outline-none
                                ${errors.picoMonthly ? 'border-red-500' : ''}`}
placeholder = "0"
    />
{
    errors.picoMonthly && (
        <p className="text-sm text-red-400 mt-1"> { errors.picoMonthly } </p>
                        )
}
    </div>

{/* Consumo Valle */ }
<div className="relative" >
    <label htmlFor="valleMonthly" className = "block text-sm text-white mb-1" >
        Consumo Valle(kWh / mes)
            </label>
            < input
type = "text"
id = "valleMonthly"
name = "valleMonthly"
value = { Number(values.valleMonthly).toLocaleString('en-US').split('.')[0] }
onKeyPress = {(e) => {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
}}
onChange = {(e) => {
    const value = e.target.value.replace(/\D/g, '');
    handleChange({
        target: {
            name: 'valleMonthly',
            value: value
        }
    } as React.ChangeEvent<HTMLInputElement>);
}}
className = {`h-8 w-full text-right font-mono bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 text-white outline-none
                                ${errors.valleMonthly ? 'border-red-500' : ''}`}
placeholder = "0"
    />
{
    errors.valleMonthly && (
        <p className="text-sm text-red-400 mt-1"> { errors.valleMonthly } </p>
                        )
}
    </div>

{/* Consumo Resto */ }
<div className="relative" >
    <label htmlFor="restoMonthly" className = "block text-sm text-white mb-1" >
        Consumo Resto(kWh / mes)
            </label>
            < input
type = "text"
id = "restoMonthly"
name = "restoMonthly"
value = { Number(values.restoMonthly).toLocaleString('en-US').split('.')[0] }
onKeyPress = {(e) => {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
}}
onChange = {(e) => {
    const value = e.target.value.replace(/\D/g, '');
    handleChange({
        target: {
            name: 'restoMonthly',
            value: value
        }
    } as React.ChangeEvent<HTMLInputElement>);
}}
className = {`h-8 w-full text-right font-mono bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 text-white outline-none
                                ${errors.restoMonthly ? 'border-red-500' : ''}`}
placeholder = "0"
    />
{
    errors.restoMonthly && (
        <p className="text-sm text-red-400 mt-1"> { errors.restoMonthly } </p>
                        )
}
    </div>
    </div>

    < Button
type = "submit"
disabled = { isSaving }
className = "w-full bg-[#4a4ae2] hover:bg-[#3b3be0] text-white font-bold py-2 px-6 rounded-3xl flex items-center justify-center gap-2 mt-8"
    >
{
    isSaving?(
                        <>
    <Loader2 className="h-4 w-4 animate-spin" />
        Guardando...
</>
                    ) : (
    <>
    <Zap className= "h-4 w-4" />
    Guardar Consumo
        </>
                    )}
</Button>
    </form>
    </div>
    );
};

export default ConsumptionForm;