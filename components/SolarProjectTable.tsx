"use client"

import React from 'react';
import { ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line, ResponsiveContainer } from 'recharts';

const data = [
    { potencia: 100, ahorro: 12452, cuotaAjustada: 18547, cuotaNominal: 27514 },
    { potencia: 250, ahorro: 31130, cuotaAjustada: 37094, cuotaNominal: 54135 },
    { potencia: 350, ahorro: 43582, cuotaAjustada: 49459, cuotaNominal: 72012 },
    { potencia: 500, ahorro: 62260, cuotaAjustada: 61823, cuotaNominal: 91563 },
    { potencia: 750, ahorro: 93390, cuotaAjustada: 92735, cuotaNominal: 135514 },
    { potencia: 1000, ahorro: 124520, cuotaAjustada: 111282, cuotaNominal: 162315 },
    { potencia: 3000, ahorro: 373560, cuotaAjustada: 370000, cuotaNominal: 386945 },
    { potencia: 5000, ahorro: 622600, cuotaAjustada: 620000, cuotaNominal: 651575 }
];

const SolarProjectChart = () => {
    return (
        <ResponsiveContainer width= "100%" height = { 500} >
            <ComposedChart
        data={ data }
    margin = {{
        top: 20, right: 30, left: 20, bottom: 5,
        }
}
      >
    <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="potencia"
label = {{ value: 'Potencia (kW)', position: 'insideBottom', offset: -5 }}
scale = "log"
domain = { [100, 5000]}
type = "number"
ticks = { [100, 250, 350, 500, 750, 1000, 3000, 5000]}
    />
    <YAxis label={ { value: 'USD/año', angle: -90, position: 'insideLeft' } } />
        < Tooltip />
        <Legend />
        < Bar dataKey = "ahorro" fill = "#8dd1e1" name = "Ahorro" />
            <Bar dataKey="cuotaAjustada" fill = "#a4de9c" name = "Cuota Ajustada" />
                <Bar dataKey="cuotaNominal" fill = "#ffc658" name = "Cuota Nominal" />
                    <Line type="monotone" dataKey = "ahorro" stroke = "#82ca9d" dot = { false} />
                        <Line type="monotone" dataKey = "cuotaAjustada" stroke = "#8884d8" dot = { false} />
                            <Line type="monotone" dataKey = "cuotaNominal" stroke = "#ff7300" dot = { false} />
                                </ComposedChart>
                                </ResponsiveContainer>
  );
};

export default SolarProjectChart;