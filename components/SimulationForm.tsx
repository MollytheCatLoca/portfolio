"use client"

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { FaSolarPanel } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useQueryParams } from '@/context/QueryParamsContext';
import provinciasLocalidadesData from '@/public/data/provinciasLocalidades.json';
import { Modal } from 'antd';

interface Scenario {
    id: string;
    name: string;
    description: string;
    validez_capacidad_min: number;
    validez_capacidad_max: number;
}

interface SimulationFormProps {
    className?: string;
    onSubmit: (formData: {
        provincia: string;
        localidad: string;
        capacidad: string;
        area: string;
        scenarioId: string;
    }) => void;
}

export function SimulationForm({ className = "", onSubmit }: SimulationFormProps) {
    const router = useRouter();
    const { setQueryParams } = useQueryParams();

    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        provincia: '',
        localidad: '',
        capacidad: '',
        area: '',
        projectDescription: '',
        scenarioId: ''
    });

    const [localidades, setLocalidades] = useState<{ nombre: string; lat: number; lon: number; }[]>([]);
    const [status, setStatus] = useState('');
    const [scenarios, setScenarios] = useState<Scenario[]>([]);
    const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

    useEffect(() => {
        if (formData.provincia) {
            setLocalidades(provinciasLocalidadesData[formData.provincia] || []);
        }
    }, [formData.provincia]);

    useEffect(() => {
        const fetchScenarios = async () => {
            try {
                const response = await fetch('/api/scenarios');
                const data = await response.json();
                setScenarios(data);

                // Find the default scenario
                const defaultScenario = data.find((scenario: Scenario) => scenario.id === 'BASE_1');
                if (defaultScenario) {
                    setFormData(prevData => ({
                        ...prevData,
                        scenarioId: defaultScenario.id
                    }));
                    setSelectedScenario(defaultScenario);
                }


            } catch (error) {
                console.error('Error fetching scenarios:', error);
            }
        };

        fetchScenarios();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));

        if (name === 'provincia') {
            setFormData(prevData => ({
                ...prevData,
                localidad: ''
            }));
        }

        if (name === 'scenarioId') {
            const scenario = scenarios.find(s => s.id === value);
            setSelectedScenario(scenario || null);
        }
    };

    const validateCapacityArea = (capacity: number, area: number) => {
        const minAreaRequired = capacity * 10000;
        return area >= minAreaRequired;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const capacity = parseFloat(formData.capacidad);
        const area = parseFloat(formData.area);

        if (!validateCapacityArea(capacity, area)) {
            setStatus(`Para ${capacity} MW, se requiere un área mínima de ${capacity * 10000} m²`);
            return;
        }

        // Validación de rango de capacidad
        if (selectedScenario) {
            if (capacity < selectedScenario.validez_capacidad_min || capacity > selectedScenario.validez_capacidad_max) {
                setStatus(`En este ESCENARIO la capacidad debe estar entre ${selectedScenario.validez_capacidad_min} MW y ${selectedScenario.validez_capacidad_max} MW para el escenario seleccionado.`);
                return;
            }
        }

        Modal.info({
            title: 'Simulación en Proceso',
            content: (
                <div>
                <p>Esta es una simulación aproximada basada en los datos proporcionados.</p>
                    < p > Nos pondremos en contacto con usted para proporcionar una cotización formal y detallada.</p>
                        </div>
            ),
            onOk() {
            processSimulation();
        }
    });
};

const processSimulation = async () => {
    setStatus('Enviando datos de simulación...');

    const simulationMessage = `SIMULACION: Provincia: ${formData.provincia}, Localidad: ${formData.localidad}, Capacidad: ${formData.capacidad}MW, Área: ${formData.area}m², Descripción: ${formData.projectDescription}, Escenario: ${selectedScenario?.name || 'No seleccionado'}`;

    try {
        console.log("Iniciando envío de datos a la API de contacto");
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: formData.nombre,
                email: formData.email,
                message: simulationMessage
            }),
        });

        console.log("Respuesta recibida de la API de contacto");
        const data = await response.json();
        console.log("Datos de respuesta:", data);

        if (data.success) {
            console.log("Datos de simulación guardados con éxito");
            setStatus('Datos de simulación guardados con éxito.');

            console.log("Actualizando queryParams");
            const newParams = {
                provincia: formData.provincia,
                localidad: formData.localidad,
                capacidad: formData.capacidad,
                area: formData.area,
                scenarioId: formData.scenarioId
            };
            console.log("Nuevos parámetros:", newParams);
            setQueryParams(newParams);
            console.log("QueryParams actualizados");

            console.log("Intentando redirigir al dashboard");
            router.push(`/energy/dashboard?${new URLSearchParams(newParams).toString()}`);
        } else {
            console.error("Error en la respuesta de la API:", data.error);
            setStatus(`Error al guardar los datos de simulación: ${data.error}`);
        }
    } catch (error) {
        console.error('Detailed error:', error);
        if (error instanceof Error) {
            setStatus(`Error al procesar la simulación: ${error.message}`);
        } else {
            setStatus('Error desconocido al procesar la simulación.');
        }
    }
};

const customStyle = {
    backdropFilter: "blur(16px) saturate(180%)",
    backgroundColor: "rgba(17, 25, 40, 0.75)",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.125)",
};

return (
    <div className= {`flex flex-col mb-10 p-4 md:p-12 rounded-3xl items-center w-full max-w-4xl mx-auto relative ${className}`} style = { customStyle } >
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white" > Simulador de Parque Solar </h2>
            < form onSubmit = { handleSubmit } className = "w-full space-y-6" >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6" >
                    <div>
                    <label htmlFor="nombre" className = "block mb-1 text-sm text-white" > Nombre </label>
                        < input
type = "text"
id = "nombre"
name = "nombre"
value = { formData.nombre }
onChange = { handleChange }
className = "bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 py-2 w-full text-sm text-white"
placeholder = "Su nombre"
required
    />
    </div>
    < div >
    <label htmlFor="email" className = "block mb-1 text-sm text-white" > Correo electrónico </label>
        < input
type = "email"
id = "email"
name = "email"
value = { formData.email }
onChange = { handleChange }
className = "bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 py-2 w-full text-sm text-white"
placeholder = "Su correo electrónico"
required
    />
    </div>
    < div >
    <label htmlFor="provincia" className = "block mb-1 text-sm text-white" > Provincia </label>
        < select
id = "provincia"
name = "provincia"
value = { formData.provincia }
onChange = { handleChange }
className = "bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 py-2 w-full text-sm text-white"
required
    >
    <option value="" > Seleccione una provincia </option>
{
    Object.keys(provinciasLocalidadesData).map(provincia => (
        <option key= { provincia } value = { provincia } > { provincia } </option>
    ))
}
</select>
    </div>
    < div >
    <label htmlFor="localidad" className = "block mb-1 text-sm text-white" > Localidad </label>
        < select
id = "localidad"
name = "localidad"
value = { formData.localidad }
onChange = { handleChange }
className = "bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 py-2 w-full text-sm text-white"
required
disabled = {!formData.provincia}
                        >
    <option value="" > Seleccione una localidad </option>
{
    localidades.map(localidad => (
        <option key= { localidad.nombre } value = { localidad.nombre } > { localidad.nombre } </option>
    ))
}
</select>
    </div>
    < div >
    <label htmlFor="capacidad" className = "block mb-1 text-sm text-white" > Capacidad(MW) </label>
        < input
type = "number"
id = "capacidad"
name = "capacidad"
value = { formData.capacidad }
onChange = { handleChange }
className = "bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 py-2 w-full text-sm text-white"
placeholder = "Capacidad en MW"
required
    />
    </div>
    < div >
    <label htmlFor="area" className = "block mb-1 text-sm text-white" > Área disponible(m²) </label>
        < input
type = "number"
id = "area"
name = "area"
value = { formData.area }
onChange = { handleChange }
className = "bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 py-2 w-full text-sm text-white"
placeholder = "Área en m²"
required
    />
    </div>
    < div >
    <label htmlFor="scenario" className = "block mb-1 text-sm text-white" > Escenario </label>
        < select
id = "scenarioId"
name = "scenarioId"
value = { formData.scenarioId }
onChange = { handleChange }
className = "bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 py-2 w-full text-sm text-white"
required
    >
    <option value="" > Seleccione un escenario </option>
{
    scenarios.map((scenario) => (
        <option key= { scenario.id } value = { scenario.id } > { scenario.name } </option>
    ))
}
</select>
    </div>
    </div>
    < div >
    <label htmlFor="projectDescription" className = "block mb-1 text-sm text-white" > Descripción del Proyecto </label>
        < textarea
id = "projectDescription"
name = "projectDescription"
value = { formData.projectDescription }
onChange = { handleChange }
className = "bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 py-2 w-full text-sm text-white"
placeholder = "Cuéntenos sobre su proyecto..."
rows = { 4}
    />
    </div>
{
    selectedScenario && (
        <div>
        <label htmlFor="scenarioDescription" className = "block mb-1 text-sm text-white" > Descripción del Escenario </label>
            < textarea
    id = "scenarioDescription"
    name = "scenarioDescription"
    value = { selectedScenario.description }
    className = "bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 py-2 w-full text-sm text-white"
    readOnly
    rows = { 3}
        />
        <p className="mt-2 text-sm text-white" >
            Rango de capacidad válido: { selectedScenario.validez_capacidad_min } MW - { selectedScenario.validez_capacidad_max } MW
                </p>
                </div>
                )
}
<Button type="submit" className = "w-full flex items-center justify-center bg-[#4a4ae2] hover:bg-[#3b3be0] text-white font-bold py-2 px-4 rounded-3xl" >
    <FaSolarPanel className="mr-2" />
        Iniciar Simulación
            </Button>
            </form>
{ status && <p className="mt-4 text-center text-white" > { status } </p> }
</div>
    );
}