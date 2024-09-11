"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line, ComposedChart } from 'recharts'
import { parqueSolarData } from '@/data/parqueDashSim'

export default function EnergyGeneration() {
    const [viewType, setViewType] = useState('monthly')
    const { generacionMensual, generacionAnual, factorCapacidad, produccionAnual } = parqueSolarData

    const data = viewType === 'monthly' ? generacionMensual : generacionAnual

    return (
        <section id= "energia" className = "mt-8" >
            <Card className="bg-black-200 border-gray-800" >
                <CardHeader className="flex flex-row items-center justify-between" >
                    <CardTitle className="text-xl font-bold text-white" > Generación de Energía </CardTitle>
                        < Select value = { viewType } onValueChange = { setViewType } >
                            <SelectTrigger className="w-[180px] bg-black-100 text-white border-gray-700" >
                                <SelectValue placeholder="Seleccionar vista" />
                                    </SelectTrigger>
                                    < SelectContent className = "bg-black-100 text-white border-gray-700" >
                                        <SelectItem value="monthly" > Vista Mensual </SelectItem>
                                            < SelectItem value = "yearly" > Vista Anual </SelectItem>
                                                </SelectContent>
                                                </Select>
                                                </CardHeader>
                                                < CardContent >
                                                <ResponsiveContainer width="100%" height = { 400} >
                                                    <ComposedChart data={ data }>
                                                        <CartesianGrid strokeDasharray="3 3" stroke = "#4a5568" />
                                                            <XAxis 
                dataKey={ viewType === 'monthly' ? 'mes' : 'año' }
    stroke = "#718096"
        />
        <YAxis 
                stroke="#718096"
    label = {{ value: `Generación (${produccionAnual.unidad})`, angle: -90, position: 'insideLeft', fill: '#718096' }
}
              />
    < Tooltip
contentStyle = {{ backgroundColor: '#2D3748', border: '1px solid #4A5568' }}
labelStyle = {{ color: '#E2E8F0' }}
itemStyle = {{ color: '#A0AEC0' }}
              />
    < Legend wrapperStyle = {{ color: '#A0AEC0' }} />
        < Bar dataKey = "generacion" fill = "#4299E1" name = {`Generación (${produccionAnual.unidad})`} />
{
    viewType === 'yearly' && (
        <Line type="monotone" dataKey = "generacion" stroke = "#48BB78" name = "Tendencia" />
              )
}
</ComposedChart>
    </ResponsiveContainer>
    < div className = "mt-4 text-center" >
        <p className="text-sm text-gray-300" >
            Factor de Capacidad: <span className="font-semibold text-white" > { factorCapacidad } % </span>
                </p>
                < p className = "text-sm text-gray-300 mt-2" >
                    Producción Anual Estimada: <span className="font-semibold text-white" > { produccionAnual.estimada.toLocaleString() } { produccionAnual.unidad } </span>
                        </p>
                        </div>
                        </CardContent>
                        </Card>
                        </section>
  )
}