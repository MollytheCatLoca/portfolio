import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card3";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Building2, Zap, Receipt, Wallet } from 'lucide-react';
import { INSTALACIONES_MUNICIPALES, TIPO_CAMBIO, calcularTotales, calcularMetricasInstalacion } from '../data/municipalData';


const MunicipioDashboard = () => {
    const totales = calcularTotales();

    const instalacionesConMetricas = INSTALACIONES_MUNICIPALES.map(inst => ({
        ...inst,
        ...calcularMetricasInstalacion(inst)
    }));

    const consumoData = instalacionesConMetricas.map(inst => ({
        name: inst.nombre.split('-')[1] || inst.nombre,
        consumo: inst.consumoMensual,
        factura: inst.facturaTotalUSD,
        potencia: inst.potenciaContratada
    }));

    const totalesUSD = {
        facturaTotal: totales.facturaTotal / TIPO_CAMBIO,
        cargoFijoTotal: totales.cargoFijoTotal / TIPO_CAMBIO,
        facturaAnual: (totales.facturaTotal * 12) / TIPO_CAMBIO
    };

    return (
        <div className= "w-full p-6 bg-gray-50 dark:bg-gray-950" >
        <div className="flex justify-between items-center mb-6" >
            <h2 className="text-3xl font-bold dark:text-white" > Dashboard de Consumos Municipales </h2>
                < div className = "px-4 py-2 bg-blue-100 dark:bg-blue-900 rounded-full" >
                    <span className="text-blue-700 dark:text-blue-300 text-sm font-semibold" >
                        Avellaneda - { new Date().toLocaleDateString('es-AR', { month: 'long', year: 'numeric' }) }
                        </span>
                        </div>
                        </div>

    {/* Métricas Principales */ }
    <div className="grid grid-cols-4 gap-4 mb-6" >
        <Card className="bg-white dark:bg-gray-900 border-0 shadow-lg" >
            <CardHeader className="flex flex-row items-center justify-between pb-2" >
                <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300" > Potencia Total </CardTitle>
                    < Building2 className = "h-4 w-4 text-blue-500" />
                        </CardHeader>
                        < CardContent >
                        <div className="text-2xl font-bold" > { totales.potenciaTotal.toFixed(2) } kW </div>
                            < p className = "text-xs text-gray-500" > Capacidad instalada </p>
                                </CardContent>
                                </Card>

                                < Card className = "bg-white dark:bg-gray-900 border-0 shadow-lg" >
                                    <CardHeader className="flex flex-row items-center justify-between pb-2" >
                                        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300" > Consumo Mensual </CardTitle>
                                            < Zap className = "h-4 w-4 text-yellow-500" />
                                                </CardHeader>
                                                < CardContent >
                                                <div className="text-2xl font-bold" > { totales.consumoMensualTotal.toLocaleString() } kWh </div>
                                                    < p className = "text-xs text-gray-500" > {(totales.consumoAnualTotal).toLocaleString()
} kWh/año</p >
    </CardContent>
    </Card>

    < Card className = "bg-white dark:bg-gray-900 border-0 shadow-lg" >
        <CardHeader className="flex flex-row items-center justify-between pb-2" >
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300" > Factura Mensual </CardTitle>
                < Receipt className = "h-4 w-4 text-green-500" />
                    </CardHeader>
                    < CardContent >
                    <div className="text-2xl font-bold" > USD { totalesUSD.facturaTotal.toLocaleString(undefined, { minimumFractionDigits: 2 }) } </div>
                        < p className = "text-xs text-gray-500" > USD { totalesUSD.facturaAnual.toLocaleString(undefined, { minimumFractionDigits: 2 }) } /año</p >
                            </CardContent>
                            </Card>

                            < Card className = "bg-white dark:bg-gray-900 border-0 shadow-lg" >
                                <CardHeader className="flex flex-row items-center justify-between pb-2" >
                                    <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300" > Cargo Fijo Total </CardTitle>
                                        < Wallet className = "h-4 w-4 text-purple-500" />
                                            </CardHeader>
                                            < CardContent >
                                            <div className="text-2xl font-bold" > USD { totalesUSD.cargoFijoTotal.toLocaleString(undefined, { minimumFractionDigits: 2 }) } </div>
                                                < p className = "text-xs text-gray-500" > Cargo mensual fijo </p>
                                                    </CardContent>
                                                    </Card>
                                                    </div>

{/* Gráficos */ }
<div className="grid grid-cols-2 gap-6 mb-6" >
    <Card className="bg-white dark:bg-gray-900 border-0 shadow-lg" >
        <CardHeader>
        <CardTitle className="text-lg font-semibold" > Consumo por Instalación </CardTitle>
            </CardHeader>
            < CardContent >
            <div className="h-[300px]" >
                <ResponsiveContainer width="100%" height = "100%" >
                    <BarChart data={ consumoData }>
                        <CartesianGrid strokeDasharray="3 3" stroke = "#e5e7eb" />
                            <XAxis
                                        dataKey="name"
angle = {- 45}
textAnchor = "end"
height = { 80}
interval = { 0}
tick = {{ fill: '#6b7280', fontSize: 12 }}
                                    />
    < YAxis tick = {{ fill: '#6b7280' }} />
        < Tooltip
contentStyle = {{
    backgroundColor: '#ffffff',
        borderRadius: '0.5rem',
            border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
}}
                                    />
    < Legend />
    <Bar dataKey="consumo" fill = "#3b82f6" name = "Consumo (kWh)" radius = { [6, 6, 0, 0]} barSize = { 30} />
        </BarChart>
        </ResponsiveContainer>
        </div>
        </CardContent>
        </Card>

        < Card className = "bg-white dark:bg-gray-900 border-0 shadow-lg" >
            <CardHeader>
            <CardTitle className="text-lg font-semibold" > Facturación por Instalación </CardTitle>
                </CardHeader>
                < CardContent >
                <div className="h-[300px]" >
                    <ResponsiveContainer width="100%" height = "100%" >
                        <BarChart data={ consumoData }>
                            <CartesianGrid strokeDasharray="3 3" stroke = "#e5e7eb" />
                                <XAxis
                                        dataKey="name"
angle = {- 45}
textAnchor = "end"
height = { 80}
interval = { 0}
tick = {{ fill: '#6b7280', fontSize: 12 }}
                                    />
    < YAxis tick = {{ fill: '#6b7280' }} />
        < Tooltip
contentStyle = {{
    backgroundColor: '#ffffff',
        borderRadius: '0.5rem',
            border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
}}
                                    />
    < Legend />
    <Bar dataKey="factura" fill = "#10b981" name = "Factura (USD)" radius = { [6, 6, 0, 0]} barSize = { 30} />
        </BarChart>
        </ResponsiveContainer>
        </div>
        </CardContent>
        </Card>
        </div>

{/* Tabla Detallada */ }
<Card className="bg-white dark:bg-gray-900 border-0 shadow-lg" >
    <CardHeader>
    <CardTitle className="text-lg font-semibold" > Detalle por Instalación </CardTitle>
        </CardHeader>
        < CardContent >
        <div className="overflow-x-auto" >
            <Table>
            <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-800" >
                <TableHead>Instalación </TableHead>
                < TableHead className = "text-right" > Potencia(kW) </TableHead>
                    < TableHead className = "text-right" > Consumo Mensual(kWh) </TableHead>
                        < TableHead className = "text-right" > Cargo Fijo(USD) </TableHead>
                            < TableHead className = "text-right" > Factura Total(USD) </TableHead>
                                < TableHead className = "text-right" > USD / kWh </TableHead>
                                    </TableRow>
                                    </TableHeader>
                                    <TableBody>
{
    instalacionesConMetricas.map((inst) => (
        <TableRow key= { inst.id } className = "hover:bg-gray-50 dark:hover:bg-gray-800" >
        <TableCell className="font-medium" > { inst.nombre } </TableCell>
    < TableCell className = "text-right" > { inst.potenciaContratada.toFixed(2) } </TableCell>
    < TableCell className = "text-right" > { inst.consumoMensual.toLocaleString() } </TableCell>
    < TableCell className = "text-right" > { inst.cargoFijoUSD.toFixed(2) } </TableCell>
    < TableCell className = "text-right" > { inst.facturaTotalUSD.toFixed(2) } </TableCell>
    < TableCell className = "text-right" > { inst.costoKWhUSD.toFixed(3) } </TableCell>
    </TableRow>
    ))
}
</TableBody>
    </Table>
    </div>
    </CardContent>
    </Card>
    </div>
    );
};

export default MunicipioDashboard;