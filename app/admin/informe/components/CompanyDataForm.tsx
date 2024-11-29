'use client';

import React from 'react';
import { Building2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from 'axios';

interface CompanyDataFormProps {
    onSubmit: (values: any) => void;
}

const CompanyDataForm: React.FC<CompanyDataFormProps> = ({ onSubmit }) => {
    const [values, setValues] = React.useState({
        companyName: '',
        latitude: '',
        longitude: '',
        address: ''
    });

    const [errors, setErrors] = React.useState<Record<string, string>>({});
    const [isSaving, setIsSaving] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    // Cargar datos guardados
    React.useEffect(() => {
        async function loadCompanyData() {
            try {
                const response = await axios.get('/api/constants');
                if (response.data && response.data.company) {
                    setValues({
                        companyName: response.data.company.companyName || '',
                        latitude: response.data.company.latitude?.toString() || '',
                        longitude: response.data.company.longitude?.toString() || '',
                        address: response.data.company.address || ''
                    });
                }
            } catch (error) {
                console.error('Error loading company data:', error);
            } finally {
                setIsLoading(false);
            }
        }
        loadCompanyData();
    }, []);

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

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!values.companyName.trim()) {
            newErrors.companyName = 'El nombre de la empresa es requerido';
        }

        if (values.latitude) {
            const lat = Number(values.latitude);
            if (isNaN(lat) || lat < -90 || lat > 90) {
                newErrors.latitude = 'La latitud debe estar entre -90 y 90 grados';
            }
        }

        if (values.longitude) {
            const lon = Number(values.longitude);
            if (isNaN(lon) || lon < -180 || lon > 180) {
                newErrors.longitude = 'La longitud debe estar entre -180 y 180 grados';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSaving(true);
            try {
                // Preparar los datos para guardar
                const companyData = {
                    companyName: values.companyName,
                    latitude: values.latitude ? Number(values.latitude) : null,
                    longitude: values.longitude ? Number(values.longitude) : null,
                    address: values.address || null
                };

                // Guardar en el backend
                await axios.post('/api/constants', { company: companyData });

                // Guardar la imagen estática
                await axios.get(`/api/map?lat=${values.latitude}&lon=${values.longitude}`);

                // Notificar al componente padre
                await onSubmit(companyData);

                // Mostrar mensaje de éxito
                const successMessage = document.getElementById('successMessage');
                if (successMessage) {
                    successMessage.classList.remove('opacity-0');
                    setTimeout(() => {
                        successMessage.classList.add('opacity-0');
                    }, 3000);
                }
            } catch (error) {
                console.error('Error saving company data:', error);
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

    if (isLoading) {
        return (
            <div className= "flex items-center justify-center h-40" >
            <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                </div>
        );
    }

return (
    <div className= "w-full max-w-2xl mx-auto p-4 md:p-8 rounded-3xl" style = { customStyle } >
        <div className="flex items-center gap-2 mb-6" >
            <Building2 className="h-6 w-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white" > Datos de la Empresa </h2>
                    </div>

                    < div id = "successMessage" className = "bg-green-900/50 border border-green-500/50 text-green-200 px-4 py-3 rounded-3xl text-sm mb-6 opacity-0 transition-opacity duration-300" >
                        Datos de la empresa guardados correctamente
                            </div>

                            < form onSubmit = { handleSubmit } className = "space-y-6" >
                                <div className="grid grid-cols-1 gap-4" >
                                    {/* Nombre de la Empresa */ }
                                    < div className = "relative" >
                                        <label htmlFor="companyName" className = "block text-sm text-white mb-1" > Nombre de la Empresa * </label>
                                            < input
type = "text"
id = "companyName"
name = "companyName"
value = { values.companyName }
onChange = { handleChange }
className = {`h-8 w-full bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 text-white outline-none
                                ${errors.companyName ? 'border-red-500' : ''}`}
placeholder = "Empresa S.A."
    />
{
    errors.companyName && (
        <p className="text-sm text-red-400 mt-1"> { errors.companyName } </p>
                        )
}
    </div>

{/* Latitud */ }
<div className="relative" >
    <label htmlFor="latitude" className = "block text-sm text-white mb-1" > Latitud(opcional) </label>
        < input
type = "text"
id = "latitude"
name = "latitude"
value = { values.latitude }
onChange = { handleChange }
className = {`h-8 w-full bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 text-white outline-none
                                ${errors.latitude ? 'border-red-500' : ''}`}
placeholder = "-33.4489"
    />
{
    errors.latitude && (
        <p className="text-sm text-red-400 mt-1"> { errors.latitude } </p>
                        )
}
    </div>

{/* Longitud */ }
<div className="relative" >
    <label htmlFor="longitude" className = "block text-sm text-white mb-1" > Longitud(opcional) </label>
        < input
type = "text"
id = "longitude"
name = "longitude"
value = { values.longitude }
onChange = { handleChange }
className = {`h-8 w-full bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 text-white outline-none
                                ${errors.longitude ? 'border-red-500' : ''}`}
placeholder = "-70.6693"
    />
{
    errors.longitude && (
        <p className="text-sm text-red-400 mt-1"> { errors.longitude } </p>
                        )
}
    </div>

{/* Dirección */ }
<div className="relative" >
    <label htmlFor="address" className = "block text-sm text-white mb-1" > Dirección(opcional) </label>
        < input
type = "text"
id = "address"
name = "address"
value = { values.address }
onChange = { handleChange }
className = "h-8 w-full bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 text-white outline-none"
placeholder = "Av. Principal 123, Ciudad"
    />
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
    <Building2 className= "h-4 w-4" />
    Guardar Datos de la Empresa
        </>
                    )}
</Button>
    </form>
    </div>
    );
};

export default CompanyDataForm;
