import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FinancialAnalysisMetrics from '../utils/FinancialAnalysisMetrics';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card3";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Download, Calculator, LineChart as LineChartIcon } from "lucide-react";

interface Inputs {
    rangeStart: number;
    rangeEnd: number;
    step: number;
    unidad: "MW" | "kW";
    precioEnergia: number;
    tasaInteres: number;
    omAnualFinanciamiento: number;
    omAnualPostFinanciamiento: number;
    anosFinanciacion: number;
    tasaDescuento: number;
    porcentajeFinanciado: number;
    costoBase: number;
    coefLinear: number;
    coefQuadratic: number;
    // Nuevos parámetros opcionales
    tasaBonoVerde: number;
    tasaAhorroFiscal: number;
    factorGeneracionAnual: number;
    anosVidaUtil: number;
    costoParqueMin: number;
    costoParqueMax: number;
}

const CashFlowSimulator: React.FC = () => {
    const [inputs, setInputs] = useState<Inputs>({
        rangeStart: 1,
        rangeEnd: 15,
        step: 1,
        unidad: "MW",
        precioEnergia: 77.1,
        tasaInteres: 0.06,
        omAnualFinanciamiento: 30000,
        omAnualPostFinanciamiento: 100000,
        anosFinanciacion: 6,
        tasaDescuento: 0.08,
        porcentajeFinanciado: 0.8,
        costoBase: 1000000,
        coefLinear: -20000,
        coefQuadratic: 100,
        tasaBonoVerde: 0.08,
        tasaAhorroFiscal: 0.10,
        factorGeneracionAnual: 2295,
        anosVidaUtil: 25,
        costoParqueMin: 750000,
        costoParqueMax: 1200000
    });

    const [results, setResults] = useState<any[] | null>(null);
    const [cashFlows, setCashFlows] = useState<any[] | null>(null);
    const [activeTab, setActiveTab] = useState('resultados');

    const calculateResults = () => {
        const resultData = [];
        const cashFlowData = [];

        for (let potencia = inputs.rangeStart; potencia <= inputs.rangeEnd; potencia += inputs.step) {
            const metrics = new FinancialAnalysisMetrics({
                potencia,
                ...inputs
            });

            const resumen = metrics.obtenerResumenFinanciero();

            resultData.push({
                potencia,
                ...resumen
            });

            const cashFlowCompleto = metrics.generarCashflowCompleto();
            cashFlowData.push({
                potencia,
                cashFlow: cashFlowCompleto
            });
        }

        setResults(resultData);
        setCashFlows(cashFlowData);
    };

    const formatNumber = (number: number, decimals = 2) => {
        return new Intl.NumberFormat('es-AR', {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        }).format(number);
    };

    const saveToFile = () => {
        if (!results || !cashFlows) return;

        const exportData = {
            inputs,
            results,
            cashFlows
        };

        const content = `export const simulationResults = ${JSON.stringify(exportData, null, 2)};`;
        const blob = new Blob([content], { type: 'text/typescript' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'simulation_results.ts';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
    };

    // Preparar datos para el gráfico
    const prepareChartData = (potencia: number) => {
        const cashFlow = cashFlows?.find(cf => cf.potencia === potencia)?.cashFlow;
        if (!cashFlow) return [];

        return cashFlow.map((value: number, index: number) => ({
            año: index,
            flujo: value
        }));
    };

    return (
        <div className= "w-full space-y-4 p-4" >
        {/* Inputs principales */ }
        < Card >
        <CardHeader>
        <CardTitle>Configuración </CardTitle>
        </CardHeader>
        < CardContent >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4" >
            <div>
            <label className="text-sm font-medium" > Potencia </label>
                < Input
    type = "number"
    value = { inputs.rangeStart }
    onChange = {(e) => setInputs({ ...inputs, rangeStart: Number(e.target.value) })}
                            />
    </div>
    < div >
    <label className="text-sm font-medium" > Unidad </label>
        < select
value = { inputs.unidad }
onChange = {(e) => setInputs({ ...inputs, unidad: e.target.value as "MW" | "kW" })}
className = "w-full border p-2 rounded"
    >
    <option value="MW" > MW </option>
        < option value = "kW" > kW </option>
            </select>
            </div>
            < div >
            <label className="text-sm font-medium" > Precio Energía(USD) </label>
                < Input
type = "number"
value = { inputs.precioEnergia }
onChange = {(e) => setInputs({ ...inputs, precioEnergia: Number(e.target.value) })}
                            />
    </div>
    < div >
    <label className="text-sm font-medium" > Tasa Interés </label>
        < Input
type = "number"
value = { inputs.tasaInteres * 100 }
onChange = {(e) => setInputs({ ...inputs, tasaInteres: Number(e.target.value) / 100 })}
                            />
    </div>
    < div >
    <label className="text-sm font-medium" > O & M Anual Financiamiento </label>
        < Input
type = "number"
value = { inputs.omAnualFinanciamiento }
onChange = {(e) => setInputs({ ...inputs, omAnualFinanciamiento: Number(e.target.value) })}
                            />
    </div>
    < div >
    <label className="text-sm font-medium" > O & M Anual Post - Financiamiento </label>
        < Input
type = "number"
value = { inputs.omAnualPostFinanciamiento }
onChange = {(e) => setInputs({ ...inputs, omAnualPostFinanciamiento: Number(e.target.value) })}
                            />
    </div>
    < div >
    <label className="text-sm font-medium" > Años Financiación </label>
        < Input
type = "number"
value = { inputs.anosFinanciacion }
onChange = {(e) => setInputs({ ...inputs, anosFinanciacion: Number(e.target.value) })}
                            />
    </div>
    < div >
    <label className="text-sm font-medium" >% Financiado </label>
        < Input
type = "number"
value = { inputs.porcentajeFinanciado * 100 }
onChange = {(e) => setInputs({ ...inputs, porcentajeFinanciado: Number(e.target.value) / 100 })}
                            />
    </div>
    </div>
    < div className = "flex gap-4 mt-4" >
        <Button onClick={ calculateResults }> Calcular </Button>
            < Button onClick = { saveToFile } disabled = {!results} variant = "outline" >
                Exportar
                </Button>
                </div>
                </CardContent>
                </Card>

{
    results && (
        <>
        {/* Resultados de cálculos base */ }
        < Card >
        <CardHeader>
        <CardTitle>Cálculos Base </CardTitle>
            </CardHeader>
            < CardContent >
            <Table>
            <TableBody>
            <TableRow>
            <TableCell className="font-medium" > Generación Anual USD </TableCell>
                < TableCell > { formatNumber(results[0].generacionAnualUSD) } </TableCell>
                < TableCell className = "text-gray-500" >= { results[0].potencia } * 2295 * { inputs.precioEnergia } </TableCell>
                    </TableRow>
                    < TableRow >
                    <TableCell className="font-medium" > Inversión Total </TableCell>
                        < TableCell > { formatNumber(results[0].inversion) } </TableCell>
                        < TableCell className = "text-gray-500" >= { results[0].potencia } * { formatNumber(results[0].costoParque) } </TableCell>
                            </TableRow>
                            < TableRow >
                            <TableCell className="font-medium" > Monto a Financiar </TableCell>
                                < TableCell > { formatNumber(results[0].montoFinanciar) } </TableCell>
                                < TableCell className = "text-gray-500" >= { formatNumber(results[0].inversion) } * { inputs.porcentajeFinanciado } </TableCell>
                                    </TableRow>
                                    < TableRow >
                                    <TableCell className="font-medium" > Pagos Anuales </TableCell>
                                        < TableCell > { formatNumber(results[0].pagosAnuales) } </TableCell>
                                        < TableCell className = "text-gray-500" > PMT({ inputs.tasaInteres }, { inputs.anosFinanciacion }, { formatNumber(- results[0].montoFinanciar)
})</TableCell>
    </TableRow>
    < TableRow >
    <TableCell className="font-medium" > Beneficios Leasing </TableCell>
        < TableCell > { formatNumber(results[0].beneficiosLeasing) } </TableCell>
        < TableCell className = "text-gray-500" >= { formatNumber(results[0].montoFinanciar) } * 0.10 </TableCell>
            </TableRow>
            < TableRow >
            <TableCell className="font-medium" > Beneficios Post - Leasing </TableCell>
                < TableCell > { formatNumber(results[0].beneficiosFueraLeasing) } </TableCell>
                < TableCell className = "text-gray-500" >= { formatNumber(results[0].generacionAnualUSD) } * 0.08 </TableCell>
                    </TableRow>
                    </TableBody>
                    </Table>
                    </CardContent>
                    </Card>

{/* Cash Flow detallado */ }
<Card>
    <CardHeader>
    <CardTitle>Cash Flow Detallado </CardTitle>
        </CardHeader>
        < CardContent >
        <div className="overflow-x-auto" >
            <Table>
            <TableHeader>
            <TableRow>
            <TableHead>Año </TableHead>
            < TableHead > Flujo </TableHead>
            < TableHead > Generación </TableHead>
            < TableHead > O & M </TableHead>
            < TableHead > Pagos Leasing </TableHead>
                < TableHead > Beneficios </TableHead>
                < TableHead > Total </TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
{/* Inversión Inicial */ }
<TableRow>
    <TableCell className="font-medium" > 0 </TableCell>
        < TableCell colSpan = { 5} > Inversión Inicial </TableCell>
            < TableCell className = "font-medium text-red-500" >
                -{ formatNumber(results[0].inversion) }
                </TableCell>
                </TableRow>

{/* Período Leasing */ }
{
    Array.from({ length: inputs.anosFinanciacion }, (_, i) => (
        <TableRow key= {`leasing-${i + 1}`}>
            <TableCell className="font-medium" > { i+ 1}</TableCell>
                < TableCell > { formatNumber(results[0].generacionAnualUSD) } </TableCell>
                < TableCell > -{ formatNumber(inputs.omAnualFinanciamiento) } </TableCell>
                < TableCell > -{ formatNumber(results[0].pagosAnuales) } </TableCell>
                < TableCell > { formatNumber(results[0].beneficiosLeasing) } </TableCell>
                < TableCell className = "font-medium" >
                {
                    formatNumber(
                        results[0].generacionAnualUSD -
                            inputs.omAnualFinanciamiento -
                            results[0].pagosAnuales +
                            results[0].beneficiosLeasing
                                                    )
                }
                    </TableCell>
                    </TableRow>
                                        ))}

{/* Período Post-Leasing */ }
{
    Array.from({ length: inputs.anosVidaUtil - inputs.anosFinanciacion }, (_, i) => (
        <TableRow key= {`post-${i + inputs.anosFinanciacion + 1}`}>
            <TableCell className="font-medium" > { i+ inputs.anosFinanciacion + 1}</TableCell>
                < TableCell > { formatNumber(results[0].generacionAnualUSD) } </TableCell>
                < TableCell > -{ formatNumber(inputs.omAnualPostFinanciamiento) } </TableCell>
                < TableCell > 0 </TableCell>
                < TableCell > { formatNumber(results[0].beneficiosFueraLeasing) } </TableCell>
                < TableCell className = "font-medium" >
                {
                    formatNumber(
                        results[0].generacionAnualUSD -
                            inputs.omAnualPostFinanciamiento +
                            results[0].beneficiosFueraLeasing
                                                    )
                }
                    </TableCell>
                    </TableRow>
                                        ))}
</TableBody>
    </Table>
    </div>
    </CardContent>
    </Card>

{/* Indicadores Finales */ }
<Card>
    <CardHeader>
    <CardTitle>Indicadores Finales </CardTitle>
        </CardHeader>
        < CardContent >
        <Table>
        <TableBody>
        <TableRow>
        <TableCell className="font-medium" > VAN </TableCell>
            < TableCell > { formatNumber(results[0].van) } </TableCell>
            </TableRow>
            < TableRow >
            <TableCell className="font-medium" > TIR </TableCell>
                < TableCell > { results[0].tir ? `${formatNumber(results[0].tir * 100)}%` : 'N/A' } </TableCell>
                </TableRow>
                < TableRow >
                <TableCell className="font-medium" > Payback Simple </TableCell>
                    < TableCell > { results[0].paybackSimple ? formatNumber(results[0].paybackSimple) : 'N/A' } años </TableCell>
                        </TableRow>
                        < TableRow >
                        <TableCell className="font-medium" > Ahorro Total </TableCell>
                            < TableCell > { formatNumber(results[0].ahorroTotal) } </TableCell>
                            </TableRow>
                            </TableBody>
                            </Table>
                            </CardContent>
                            </Card>
                            </>
            )}
</div>
    );
};

export default CashFlowSimulator;