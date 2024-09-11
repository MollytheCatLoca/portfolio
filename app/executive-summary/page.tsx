'use client';

import React from 'react';

type Scenario = {
    id_escenario: number;
    nombre: string;
};

type GlobalExecutiveSummaryProps = {
    scenarios: Scenario[] | null | undefined; // Aseguramos que pueda ser null o undefined
    onNavigate: (path: string) => void;
};

export default function GlobalExecutiveSummary({ scenarios, onNavigate }: GlobalExecutiveSummaryProps) {
    // Si scenarios es null o undefined, mostramos un mensaje de error o un estado vacío
    if (!scenarios || scenarios.length === 0) {
        return (
            <div className= "mt-24 p-4 bg-gray-100 rounded-lg" >
            <h2 className="text-xl font-bold mb-4" > Resumen Ejecutivo Global </h2>
                < p className = "text-red-500" > No se encontraron escenarios disponibles.</p>
                    </div>
        );
    }

    return (
        <div className= "mt-24 p-4 bg-gray-100 rounded-lg" >
        <h2 className="text-xl font-bold mb-4" > Resumen Ejecutivo Global </h2>
    {
        scenarios.map((scenario) => (
            <div key= { scenario.id_escenario } className = "mb-4 p-4 bg-white rounded shadow" >
            <p className="font-semibold" > { scenario.nombre } </p>
        < button 
                        onClick = {() => onNavigate(`/energy/dashboard/${scenario.id_escenario}`)}
    className = "mr-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
        Ver Detalle
            </button>
            < button
    onClick = {() => onNavigate(`/energy/dashboard/${scenario.id_escenario}?debug=true`)
}
className = "mr-2 px-4 py-2 bg-green-500 text-white rounded"
    >
    Debug View
        </button>
        < button
onClick = {() => alert(`Clicked scenario ${scenario.id_escenario}`)}
className = "px-4 py-2 bg-red-500 text-white rounded"
    >
    Alert
    </button>
    </div>
            ))}
</div>
    );
}
