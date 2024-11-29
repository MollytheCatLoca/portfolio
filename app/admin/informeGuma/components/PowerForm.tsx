'use client';

import React from 'react';
import { Zap, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from 'axios';

interface PowerFormProps {
    onSubmit: (values: any) => void;
}

const PowerForm: React.FC<PowerFormProps> = ({ onSubmit }) => {
    const [values, setValues] = React.useState({
        installedPowerKW: ''
    });

    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isSaving, setIsSaving] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    // Cargar datos guardados
    React.useEffect(() => {
        async function loadPowerData() {
            try {
                const response = await axios.get('/api/power');
                if (response.data) {
                    setValues({
                        installedPowerKW: response.data.installedPowerKW?.toString() || ''
                    });
                }
            } catch (error) {
                console.error('Error loading power data:', error);
            } finally {
                setIsLoading(false);
            }
        }
        loadPowerData();
    }, []);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const power = Number(values.installedPowerKW);

        if (!power) {
            newErrors.installedPowerKW = 'La potencia instalada es requerida';
        } else if (power <= 0) {
            newErrors.installedPowerKW = 'La potencia debe ser mayor a 0';
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
                const powerData = {
                    power: {
                        installedPowerKW: Number(values.installedPowerKW)
                    }
                };

                // Guardar en el backend
                await axios.post('/api/power', powerData);

                // Notificar al componente padre
                await onSubmit(powerData.power);

                // Mostrar mensaje de éxito
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.classList.remove('opacity-0');
                    setTimeout(() => {
                        successMessage.classList.add('opacity-0');
                    }, 3000);
                }
            } catch (error) {
                console.error('Error saving power data:', error);
            } finally {
                setIsSaving(false);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
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
                <Zap className="h-6 w-6 text-green-400" />
                    <h2 className="text-2xl font-bold text-white" > Potencia Instalada </h2>
                        </div>

                        < div id = "successMessage" className = "bg-green-900/50 border border-green-500/50 text-green-200 px-4 py-3 rounded-3xl text-sm mb-6 opacity-0 transition-opacity duration-300" >
                            Potencia instalada guardada correctamente
                                </div>

                                < form onSubmit = { handleSubmit } className = "space-y-6" >
                                    <div className="relative" >
                                        <label htmlFor="installedPowerKW" className = "block text-sm text-white mb-1" >
                                            Potencia Instalada(kW)
                                                </label>
                                                < input
    type = "number"
    id = "installedPowerKW"
    name = "installedPowerKW"
    value = { values.installedPowerKW }
    onChange = { handleChange }
    className = {`h-8 w-full text-right font-mono bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 text-white outline-none
                            ${errors.installedPowerKW ? 'border-red-500' : ''}`
}
placeholder = "0.00"
step = "0.01"
min = "0"
    />
{
    errors.installedPowerKW && (
        <p className="text-sm text-red-400 mt-1"> { errors.installedPowerKW } </p>
                    )
}
    </div>

    < Button
type = "submit"
disabled = { isSaving }
className = "w-full bg-[#4a4ae2] hover:bg-[#3b3be0] text-white font-bold py-2 px-6 rounded-3xl flex items-center justify-center gap-2"
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
    Guardar Potencia
        </>
                    )}
</Button>
    </form>
    </div>
    );
};

export default PowerForm;