import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card3";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, DollarSign, Percent, Clock, BatteryCharging, PiggyBank, Zap } from 'lucide-react';
import { SOLAR_PROJECT_DATA } from '../data/data_gen';

const SolarProjectFinancial = () => {
    // Usamos los datos existentes
    const data = SOLAR_PROJECT_DATA;

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return `${(num / 1000000).toFixed(1)}M`;
        }
        return `${(num / 1000).toFixed(0)}k`;
    };

    const tooltipStyle = {
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        border: '1px solid rgba(75, 85, 99, 0.3)',
        borderRadius: '6px',
        padding: '8px 12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        fontSize: '12px',
        color: '#E5E7EB'
    };

    // Datos para 14.9 MW
    const targetMW = 14;
    const targetData = data[13]; // Usamos los datos más cercanos a 14.9 MW

    return (
        <div className= "w-[786px] h-[302px] p-4 bg-gray-900 rounded-xl" >
        <div className="flex justify-between items-center mb-3" >
            <div className="flex items-center gap-2" >
                <BatteryCharging className="h-5 w-5 text-green-400" />
                    <h2 className="text-lg font-bold text-white" > Proyecto Solar { targetMW } MW </h2>
                        < span className = "px-2 py-1 bg-green-900/50 rounded-full text-green-400 text-xs font-semibold" >
                            { formatNumber(targetData.generacion) } MWh / año
                                </span>
                                </div>
                                </div>

                                < div className = "grid grid-cols-12 gap-4 h-[242px]" >
                                    <div className="col-span-8" >
                                        <Card className="bg-gray-800/50 border-gray-700/50 h-full" >
                                            <CardHeader className="p-3" >
                                                <CardTitle className="text-sm text-gray-300 flex items-center gap-2" >
                                                    <PiggyBank className="h-4 w-4 text-yellow-500" />
                                                        Análisis Financiero
                                                            </CardTitle>
                                                            </CardHeader>
                                                            < CardContent className = "p-3" >
                                                                <div className="grid grid-cols-2 gap-6" >
                                                                    <div className="space-y-3" >
                                                                        <div className="flex justify-between items-center py-2 border-b border-gray-700" >
                                                                            <span className="text-gray-400 text-sm" > Inversión Total </span>
                                                                                < span className = "text-white font-medium" > ${ formatNumber(targetData.inversion) } </span>
                                                                                    </div>
                                                                                    < div className = "flex justify-between items-center py-2 border-b border-gray-700" >
                                                                                        <span className="text-gray-400 text-sm" > VAN </span>
                                                                                            < span className = "text-white font-medium" > ${ formatNumber(targetData.van) } </span>
                                                                                                </div>
                                                                                                < div className = "flex justify-between items-center py-2" >
                                                                                                    <span className="text-gray-400 text-sm" > Payback </span>
                                                                                                        < span className = "text-white font-medium" > { targetData.payback } años </span>
                                                                                                            </div>
                                                                                                            </div>
                                                                                                            < div className = "space-y-3" >
                                                                                                                <div className="flex justify-between items-center py-2 border-b border-gray-700" >
                                                                                                                    <span className="text-gray-400 text-sm" > TIR </span>
                                                                                                                        < span className = "text-green-400 font-medium" > { targetData.retorno } % </span>
                                                                                                                            </div>
                                                                                                                            < div className = "flex justify-between items-center py-2 border-b border-gray-700" >
                                                                                                                                <span className="text-gray-400 text-sm" > Generación Anual </span>
                                                                                                                                    < span className = "text-white font-medium" > { formatNumber(targetData.generacion) } MWh </span>
                                                                                                                                        </div>
                                                                                                                                        < div className = "flex justify-between items-center py-2" >
                                                                                                                                            <span className="text-gray-400 text-sm" > Costo por MW </span>
                                                                                                                                                < span className = "text-white font-medium" > ${ formatNumber(targetData.inversion / targetMW) } </span>
                                                                                                                                                    </div>
                                                                                                                                                    </div>
                                                                                                                                                    </div>
                                                                                                                                                    </CardContent>
                                                                                                                                                    </Card>
                                                                                                                                                    </div>

                                                                                                                                                    < div className = "col-span-4" >
                                                                                                                                                        <Card className="bg-gray-800/50 border-gray-700/50 h-full" >
                                                                                                                                                            <CardHeader className="p-3" >
                                                                                                                                                                <CardTitle className="text-sm text-gray-300 flex items-center gap-2" >
                                                                                                                                                                    <TrendingUp className="h-4 w-4 text-purple-500" />
                                                                                                                                                                        Indicadores Clave
                                                                                                                                                                            </CardTitle>
                                                                                                                                                                            </CardHeader>
                                                                                                                                                                            < CardContent className = "p-3" >
                                                                                                                                                                                <div className="space-y-4" >
                                                                                                                                                                                    <div className="bg-gray-900/50 p-3 rounded-lg" >
                                                                                                                                                                                        <div className="text-xs text-gray-400 mb-1" > ROI </div>
                                                                                                                                                                                            < div className = "text-2xl font-bold text-purple-400" > 119 % </div>
                                                                                                                                                                                                </div>
                                                                                                                                                                                                < div className = "bg-gray-900/50 p-3 rounded-lg" >
                                                                                                                                                                                                    <div className="text-xs text-gray-400 mb-1" > Rendimiento </div>
                                                                                                                                                                                                        < div className = "text-2xl font-bold text-green-400" > 2, 310 </div>
                                                                                                                                                                                                            < div className = "text-xs text-gray-500" > kWh / kWp </div>
                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                < div className = "bg-gray-900/50 p-3 rounded-lg" >
                                                                                                                                                                                                                    <div className="text-xs text-gray-400 mb-1" > Factor de Planta </div>
                                                                                                                                                                                                                        < div className = "text-2xl font-bold text-yellow-400" > 26.4 % </div>
                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                            </CardContent>
                                                                                                                                                                                                                            </Card>
                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                            </div>
    );
};

export default SolarProjectFinancial;
