import React from 'react';
import { Card, CardContent } from "@/components/ui/Card3";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, DollarSign, Percent, Clock, BarChart2 } from 'lucide-react';
import { SOLAR_PROJECT_DATA } from '../data/data_gen';
const SolarProjectFinancial = () => {
    const data = SOLAR_PROJECT_DATA;

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        }
        return `${(num / 1000).toFixed(0)}k`;
    };

    // Calculamos valores máximos para las escalas
    // Cálculo de valores máximos y mínimos para los indicadores
    const maxVAN = Math.max(...data.map(d => d.van));
    const minVAN = Math.min(...data.map(d => d.van));
    const maxTIR = Math.max(...data.map(d => d.retorno));
    const minTIR = Math.min(...data.map(d => d.retorno));
    const totalInversion = Math.max(...data.map(d => d.inversion));
    //const maxROI = maxTIR > 0 ? (maxTIR * totalInversion) / 100 : 0; // Ejemplo de cómo calcular el ROI en base a TIR y la inversión
    const maxROI = 3.9

    // Estilo común para tooltips y etiquetas
    const customTooltipStyle = {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        border: '1px solid rgba(75, 85, 99, 0.3)',
        borderRadius: '6px',
        padding: '8px 12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontSize: '12px',
        color: '#E5E7EB'
    };

    const axisLabelStyle = {
        fontSize: '11px',
        fill: '#9CA3AF',
        opacity: 0.8
    };

    return (
        <div className= "w-[983px] h-[378px] p-3 bg-gray-900 rounded-xl" >
        <div className="flex justify-between items-center mb-2" >
            <div className="flex items-center gap-2" >
                <TrendingUp className="h-5 w-5 text-emerald-400" />
                    <h2 className="text-lg font-bold text-white" > Análisis Financiero - Proyecto Solar </h2>
                        </div>
                        < div className = "grid grid-cols-4 gap-2" >
                            {
                                [
                                    { icon: DollarSign, label: 'VAN Máx', value: `$${formatNumber(maxVAN)}`, color: 'text-emerald-400' },
                                    { icon: Percent, label: 'TIR Máx', value: `${maxTIR}%`, color: 'text-yellow-400' },
                                    { icon: BarChart2, label: 'Inversión Total', value: `$${formatNumber(totalInversion)}`, color: 'text-blue-400' },
                                    { icon: Clock, label: 'PAY', value: `${(maxROI)}`, color: 'text-purple-400' }
                                ].map((metric, idx) => (
                                    <Card key= { idx } className = "bg-gray-800/50 border-gray-700/50 backdrop-blur-sm" >
                                    <CardContent className="p-2 flex items-center gap-2" >
                                <metric.icon className={`h-6 w-6 ${metric.color}`} />
                            <div>
                            <p className="text-xs font-medium text-gray-400" > { metric.label } </p>
                                < p className = {`text-base font-bold ${metric.color}`
}> { metric.value } </p>
    </div>
    </CardContent>
    </Card>
                    ))}
</div>
    </div>

    < div className = "grid grid-cols-2 gap-4 h-[290px]" >
        <Card className="bg-gray-800/50 border-gray-700/50 backdrop-blur-sm" >
            <CardContent className="p-2 h-full" >
                <h3 className="text-sm font-semibold text-gray-300 mb-1" > Valor Actual Neto por Potencia Instalada </h3>
                    < div className = "h-[230px]" >
                        <ResponsiveContainer width="100%" height = "100%" >
                            <AreaChart data={ data } margin = {{ top: 10, right: 30, bottom: 20, left: 10 }}>
                                <defs>
                                <linearGradient id="vanGradient" x1 = "0" y1 = "0" x2 = "0" y2 = "1" >
                                    <stop offset="5%" stopColor = "#10B981" stopOpacity = { 0.3} />
                                        <stop offset="95%" stopColor = "#10B981" stopOpacity = { 0} />
                                            </linearGradient>
                                            </defs>
                                            < XAxis
dataKey = "mw"
tick = {{ fontSize: 11 }}
stroke = "#4B5563"
label = {{ value: 'MW', position: 'bottom', offset: 0, ...axisLabelStyle }}
                                    />
    < YAxis
domain = { [0, Math.ceil(maxVAN / 1000000) * 1000000]}
tickFormatter = { formatNumber }
tick = {{ fontSize: 11 }}
stroke = "#4B5563"
label = {{ value: 'VAN', angle: -90, position: 'insideLeft', offset: 0, ...axisLabelStyle }}
tickCount = { 6}
    />
    <Tooltip 
                                        contentStyle={ customTooltipStyle }
formatter = {(value) => [`$${formatNumber(value)}`, 'VAN']}
labelFormatter = {(value) => `${value} MW`}
                                    />
    < Area
type = "natural"
dataKey = "van"
stroke = "#10B981"
fillOpacity = { 1}
fill = "url(#vanGradient)"
strokeWidth = { 2}
    />
    </AreaChart>
    </ResponsiveContainer>
    </div>
    </CardContent>
    </Card>

    < Card className = "bg-gray-800/50 border-gray-700/50 backdrop-blur-sm" >
        <CardContent className="p-2 h-full" >
            <h3 className="text-sm font-semibold text-gray-300 mb-1" > Tasa Interna de Retorno vs Potencia </h3>
                < div className = "h-[230px]" >
                    <ResponsiveContainer width="100%" height = "100%" >
                        <LineChart data={ data } margin = {{ top: 10, right: 30, bottom: 20, left: 10 }}>
                            <XAxis
                                        dataKey="mw"
tick = {{ fontSize: 11 }}
stroke = "#4B5563"
label = {{ value: 'MW', position: 'bottom', offset: 0, ...axisLabelStyle }}
                                    />
    < YAxis
domain = { [Math.floor(minTIR * 0.95), Math.ceil(maxTIR * 1.05)]}
tick = {{ fontSize: 11 }}
stroke = "#4B5563"
label = {{ value: 'TIR', angle: -90, position: 'insideLeft', offset: 0, ...axisLabelStyle }}
tickCount = { 6}
tickFormatter = {(value) => `${value}%`}
                                    />
    < Tooltip
contentStyle = { customTooltipStyle }
formatter = {(value) => [`${value}%`, 'TIR']}
labelFormatter = {(value) => `${value} MW`}
                                    />
    < Line
type = "natural"
dataKey = "retorno"
stroke = "#FBBF24"
strokeWidth = { 2}
dot = {{ r: 3 }}
activeDot = {{ r: 4 }}
                                    />
    </LineChart>
    </ResponsiveContainer>
    </div>
    </CardContent>
    </Card>
    </div>
    </div>
    );
};

export default SolarProjectFinancial;