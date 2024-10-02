import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { SunIcon, DollarSignIcon, BatteryChargingIcon, LeafIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Scenario = {
    id_escenario: number;
    nombre: string;
    capacidad: {
        actual: number;
        maxima: number;
        unidad: string;
    };
    inversion: {
        total: number;
        unidad: string;
    };
    analisisFinanciero: {
        year: number;
        generacion: number;
        ingresos: number;
        cuotaInversion: number;
    }[];
};

type GlobalExecutiveSummaryProps = {
    scenarios: Scenario[];
    queryParams: {
        provincia: string;
        localidad: string;
        capacidad: string;
        area: string;
        scenarioId: string;
    };
};

export default function GlobalExecutiveSummary({ scenarios, queryParams }: GlobalExecutiveSummaryProps) {
    const totalCapacidad = scenarios.reduce((sum, scenario) => sum + scenario.capacidad.actual, 0);
    const totalInversion = scenarios.reduce((sum, scenario) => sum + scenario.inversion.total, 0);
    const totalAhorroAnual = scenarios.reduce((sum, scenario) => sum + scenario.analisisFinanciero[0].ingresos, 0);
    const totalCuotaAnual = scenarios.reduce((sum, scenario) => sum + scenario.analisisFinanciero[0].cuotaInversion, 0);

    return (
        <section id= "resumen" className = "mt-1 mb-8" >
            <h1 className="text-2xl font-bold mb-4 text-white" > </h1>
                < div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" >
                    <Card className="bg-black-200 border-gray-800" >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                            <CardTitle className="text-sm font-medium text-gray-300" > Capacidad Total </CardTitle>
                                < SunIcon className = "h-4 w-4 text-yellow-500" />
                                    </CardHeader>
                                    < CardContent >
                                    <div className="text-2xl font-bold text-white" > { totalCapacidad.toFixed(2) } { scenarios[0].capacidad.unidad } </div>
                                        < p className = "text-xs text-gray-400" > Agregado de { scenarios.length } escenarios </p>
                                            </CardContent>
                                            </Card>

                                            < Card className = "bg-black-200 border-gray-800" >
                                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                                                    <CardTitle className="text-sm font-medium text-gray-300" > Inversión Total </CardTitle>
                                                        < DollarSignIcon className = "h-4 w-4 text-green-500" />
                                                            </CardHeader>
                                                            < CardContent >
                                                            <div className="text-2xl font-bold text-white" > { totalInversion.toFixed(2) } { scenarios[0].inversion.unidad } </div>
                                                                < p className = "text-xs text-gray-400" > Suma de todos los escenarios </p>
                                                                    </CardContent>
                                                                    </Card>

                                                                    < Card className = "bg-black-200 border-gray-800" >
                                                                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                                                                            <CardTitle className="text-sm font-medium text-gray-300" > Ahorro Anual Total </CardTitle>
                                                                                < BatteryChargingIcon className = "h-4 w-4 text-blue-500" />
                                                                                    </CardHeader>
                                                                                    < CardContent >
                                                                                    <div className="text-2xl font-bold text-white" > { totalAhorroAnual.toFixed(2) } kUSD </div>
                                                                                        < p className = "text-xs text-gray-400" > Estimación agregada </p>
                                                                                            </CardContent>
                                                                                            </Card>

                                                                                            < Card className = "bg-black-200 border-gray-800" >
                                                                                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2" >
                                                                                                    <CardTitle className="text-sm font-medium text-gray-300" > Cuota Anual Total </CardTitle>
                                                                                                        < LeafIcon className = "h-4 w-4 text-green-500" />
                                                                                                            </CardHeader>
                                                                                                            < CardContent >
                                                                                                            <div className="text-2xl font-bold text-white" > { totalCuotaAnual.toFixed(2) } kUSD </div>
                                                                                                                < p className = "text-xs text-gray-400" > Suma de cuotas anuales </p>
                                                                                                                    </CardContent>
                                                                                                                    </Card>
                                                                                                                    </div>

                                                                                                                    < h3 className = "text-xl font-semibold mb-4 text-white" > Comparación de Escenarios </h3>
                                                                                                                        < div className = "overflow-x-auto" >
                                                                                                                            <table className="w-full text-sm text-left text-gray-300" >
                                                                                                                                <thead className="text-xs uppercase bg-gray-700 text-gray-400" >
                                                                                                                                    <tr>
                                                                                                                                    <th scope="col" className = "px-6 py-3" > Escenario </th>
                                                                                                                                        < th scope = "col" className = "px-6 py-3" > Capacidad </th>
                                                                                                                                            < th scope = "col" className = "px-6 py-3" > Inversión </th>
                                                                                                                                                < th scope = "col" className = "px-6 py-3" > Ahorro Anual </th>
                                                                                                                                                    < th scope = "col" className = "px-6 py-3" > Cuota Anual </th>
                                                                                                                                                        < th scope = "col" className = "px-6 py-3" > Acciones </th>
                                                                                                                                                            </tr>
                                                                                                                                                            </thead>
                                                                                                                                                            <tbody>
    {
        scenarios.map((scenario) => (
            <tr key= { scenario.id_escenario } className = "border-b bg-gray-800 border-gray-700" >
            <th scope="row" className = "px-6 py-4 font-medium whitespace-nowrap text-white" >
            { scenario.nombre }
            </th>
            < td className = "px-6 py-4" > { scenario.capacidad.actual } { scenario.capacidad.unidad } </td>
        < td className = "px-6 py-4" > { scenario.inversion.total } { scenario.inversion.unidad } </td>
        < td className = "px-6 py-4" > { scenario.analisisFinanciero[0].ingresos.toFixed(2) } kUSD </td>
        < td className = "px-6 py-4" > { scenario.analisisFinanciero[0].cuotaInversion.toFixed(2) } kUSD </td>
        < td className = "px-6 py-4" >
        <Link 
                                        href={{
            pathname: `/energy/dashboard/${scenario.id_escenario}`,
            query: {
                ...queryParams,
                escenarioId: scenario.id_escenario.toString()
            }
        }}
    passHref
        >
        <Button variant="outline" size = "sm" >
            Ver Detalle
                </Button>
                </Link>
                </td>
                </tr>
                        ))
}
</tbody>
    </table>
    </div>
    </section>
    );
}