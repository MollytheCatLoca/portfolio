// components/SolarParkForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useSolarPark } from '../contexts/SolarParkContext';
import { ParqueSolar } from '../types/solarPark';

export default function SolarParkForm() {
    const { updateSolarParkData } = useSolarPark();
    const [formData, setFormData] = useState<Partial<ParqueSolar>>({
        nombre: '',
        ubicacion: {
            ciudad: '',
            provincia: '',
            latitud: 0,
            longitud: 0
        },
        potencia: 0
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: name === 'potencia' ? Number(value) : value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        updateSolarParkData(formData);
    };

    return (
        <form onSubmit= { handleSubmit } >
        <input name="nombre" value = { formData.nombre } onChange = { handleChange } placeholder = "Nombre del Parque Solar" />
            <input name="ubicacion.ciudad" value = { formData.ubicacion?.ciudad } onChange = { handleChange } placeholder = "Ciudad" />
                <input name="ubicacion.provincia" value = { formData.ubicacion?.provincia } onChange = { handleChange } placeholder = "Provincia" />
                    <input name="ubicacion.latitud" type = "number" value = { formData.ubicacion?.latitud } onChange = { handleChange } placeholder = "Latitud" />
                        <input name="ubicacion.longitud" type = "number" value = { formData.ubicacion?.longitud } onChange = { handleChange } placeholder = "Longitud" />
                            <input name="potencia" type = "number" value = { formData.potencia } onChange = { handleChange } placeholder = "Potencia (MW)" />
                                <button type="submit" > Actualizar Datos del Parque Solar </button>
                                    </form>
  );
}