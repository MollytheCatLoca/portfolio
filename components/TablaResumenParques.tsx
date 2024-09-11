"use client"
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const datosParques = [
    {
        tamanio: "350 kW",
        costo: 377000,
        generacionAnual: 615,
        ahorroMensual: 7143,
        cuotaLeasing: 8180
    },
    {
        tamanio: "500 kW",
        costo: 538571,
        generacionAnual: 879,
        ahorroMensual: 11067,
        cuotaLeasing: 11685
    },
    {
        tamanio: "750 kW",
        costo: 807857,
        generacionAnual: 1581,
        ahorroMensual: 18267,
        cuotaLeasing: 17528
    },
    {
        tamanio: "1000 kW",
        costo: 1077143,
        generacionAnual: 2108,
        ahorroMensual: 25689,
        cuotaLeasing: 23371
    },
    {
        tamanio: "1500 kW",
        costo: 1615714,
        generacionAnual: 3162,
        ahorroMensual: 38534,
        cuotaLeasing: 35057
    }
];

export default function ResumenParquesSolares() {
    return (
        <div className= "container2 min-h-screen bg-gradient-overlay text-white" >
        <div className="wrapper py-16" >
            <div className="logo-container mb-8" >
                <img src="/BISLogo.svg" alt = "Logo" className = "scale" />
                    </div>
                    < h1 className = "text-2xl md:text-3xl lg:text-4xl text-blue mb-12 text-center font-bold" >
                        Resumen de Parques Solares
                            </h1>
                            < div className = "overflow-x-auto mb-12" >
                                <table className="w-full text-sm text-center rounded-lg overflow-hidden" >
                                    <thead className="text-xs uppercase bg-gray-700 text-gray-400" >
                                        <tr>
                                        <th className="px-6 py-3" > Tamaño del Parque </th>
                                            < th className = "px-6 py-3" > Costo del Parque(USD) </th>
                                                < th className = "px-6 py-3" > Generación Anual(MWh) </th>
                                                    < th className = "px-6 py-3" > Ahorro Mensual(USD) </th>
                                                        < th className = "px-6 py-3" > Cuota Leasing(USD) </th>
                                                            </tr>
                                                            </thead>
                                                            <tbody>
    {
        datosParques.map((parque, index) => (
            <tr key= { index } className = "bg-gray-800 border-b border-gray-700" >
            <td className="px-6 py-4 font-medium whitespace-nowrap" > { parque.tamanio } </td>
        < td className = "px-6 py-4" > { parque.costo.toLocaleString() } </td>
        < td className = "px-6 py-4" > { parque.generacionAnual } </td>
        < td className = "px-6 py-4" > { parque.ahorroMensual.toLocaleString() } </td>
        < td className = "px-6 py-4" > { parque.cuotaLeasing.toLocaleString() } </td>
        </tr>
        ))
    }
    </tbody>
        </table>
        </div>
        < h2 className = "text-xl md:text-2xl lg:text-3xl text-blue mb-8 text-center font-bold" >
            Ahorro vs Cuota por Escenario
                </h2>
                < div className = "h-96 w-full" >
                    <ResponsiveContainer width="100%" height = "100%" >
                        <BarChart
              data={ datosParques }
    margin = {{
        top: 20,
            right: 30,
                left: 20,
                    bottom: 5,
              }
}
            >
    <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="tamanio" />
            <YAxis />
            < Tooltip />
            <Legend />
            < Bar dataKey = "ahorroMensual" name = "Ahorro Mensual" fill = "#8884d8" />
                <Bar dataKey="cuotaLeasing" name = "Cuota Leasing" fill = "#82ca9d" />
                    </BarChart>
                    </ResponsiveContainer>
                    </div>
                    </div>
                    </div>
  );
}