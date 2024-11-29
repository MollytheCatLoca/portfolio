import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const CapacitySelector = ({
    selectedMetrics,
    onCapacitySelect,
    maxCapacity = 5000 // 5MW en kW por defecto
}) => {
    // Estado local para el input
    const [inputCapacity, setInputCapacity] = useState(
        selectedMetrics ? selectedMetrics.capacity : ''
    );

    // Actualizar input cuando cambia la selección en el gráfico
    useEffect(() => {
        if (selectedMetrics) {
            setInputCapacity(selectedMetrics.capacity);
        }
    }, [selectedMetrics]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputCapacity(value);

        // Solo disparar el callback si el valor es válido
        if (value && !isNaN(value) && value > 0 && value <= maxCapacity * 1000) {
            // Simular el mismo formato de datos que viene del gráfico
            const simulatedClickData = {
                activePayload: [{
                    payload: {
                        capacity: Number(value)
                    }
                }]
            };
            onCapacitySelect(simulatedClickData);
        }
    };

    return (
        <Card className= "bg-gray-800 border-gray-700 mt-4" >
        <CardContent className="pt-4" >
            <div className="flex items-center gap-4" >
                <div className="flex-grow" >
                    <label className="block text-sm font-medium text-gray-200 mb-1" >
                        Capacidad Instalada(kW)
                            </label>
                            < Input
    type = "number"
    value = { inputCapacity }
    onChange = { handleInputChange }
    className = "bg-gray-700 text-white border-gray-600"
    min = "0"
    max = { maxCapacity * 1000}
    step = "1"
    placeholder = "Ingrese la capacidad en kW"
        />
        </div>
        < div className = "text-sm text-gray-400 mt-6" >
            { inputCapacity? `${(inputCapacity / 1000).toFixed(2)} MW` : ''
}
</div>
    </div>
    </CardContent>
    </Card>
  );
};

export default CapacitySelector;