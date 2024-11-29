import React, { useState } from 'react';
import FinancialAnalysisMetrics from '../utils/FinancialAnalysisMetrics';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Calculator } from "lucide-react";
import { Save } from "lucide-react"; // Cambiamos Download por Save



const FinancialAnalysis: React.FC = () => {
    const [inputs, setInputs] = useState({
        potencia: 1,
        precioEnergia: 77.1,
        tasaInteres: 0.06,
        omAnualFinanciamiento: 30000,
        omAnualPostFinanciamiento: 100000,
        anosFinanciacion: 6,
        tasaDescuento: 0.08,
        porcentajeFinanciado: 0.80,
        costoBase: 1000000,
        coefLinear: -20000,
        coefQuadratic: 100,
        unidad: "MW" as "MW" | "kW",
        tasaBonoVerde: 0.08,             // Parámetro de beneficios adicionales
        tasaAhorroFiscal: 0.05,          // Parámetro de ahorro fiscal
        factorGeneracionAnual: 2295,     // Factor de generación anual
        anosVidaUtil: 25,                // Vida útil del proyecto
        costoParqueMin: 750000,          // Costo mínimo del parque
        costoParqueMax: 1200000          // Costo máximo del parque
    });

    const [results, setResults] = useState<any | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [debugInfo, setDebugInfo] = useState<any | null>(null);
    const [saveStatus, setSaveStatus] = useState<string>('');


    const handleInputChange = (key: string, value: any) => {
        setInputs({ ...inputs, [key]: value });
    };

    // Botón para validar tipos de datos
    const validateDataTypes = () => {
        try {
            for (const [key, value] of Object.entries(inputs)) {
                if (typeof value !== 'number' && key !== 'unidad') {
                    throw new Error(`El valor de ${key} debe ser numérico, pero es de tipo ${typeof value}`);
                }
            }
            setError(null);
            alert("Todos los tipos de datos son válidos.");
        } catch (err: any) {
            setError(`Error de validación de tipos: ${err.message}`);
        }
    };

    // Botón para validar signos en el flujo de caja
    const validateCashflowSigns = () => {
        try {
            const metrics = new FinancialAnalysisMetrics(inputs);

            // Captura de todos los valores intermedios necesarios para construir el flujo de caja
            const potenciaConvertida = metrics.convertirPotencia();
            const generacionAnualUSD = metrics.calcularGeneracionAnualUSD();
            const inversion = metrics.calcularInversion();
            const montoFinanciar = metrics.calcularMontoFinanciar();
            const pagosAnuales = metrics.calcularPagosAnuales();
            const ahorroAnualEnPeriodoLeasing = metrics.calcularAhorroAnualEnPeriodoLeasing();
            const ahorroAnualFueraPeriodoLeasing = metrics.calcularAhorroAnualFueraPeriodoLeasing();
            const anosFinanciacion = inputs.anosFinanciacion;
            const anosVidaUtil = metrics.anosVidaUtil;

            // Generar el flujo de caja completo
            const cashflow = metrics.generarCashflowCompleto();
            const hasPositiveFlow = cashflow.some(value => value > 0);
            const hasNegativeFlow = cashflow.some(value => value < 0);

            // Guardar todos los valores en debugInfo
            setDebugInfo({
                potenciaConvertida,
                generacionAnualUSD,
                inversion,
                montoFinanciar,
                pagosAnuales,
                ahorroAnualEnPeriodoLeasing,
                ahorroAnualFueraPeriodoLeasing,
                anosFinanciacion,
                anosVidaUtil,
                cashflow,
                hasPositiveFlow,
                hasNegativeFlow
            });

            if (!hasPositiveFlow || !hasNegativeFlow) {
                throw new Error("El flujo de caja (cashflow) no cumple con la condición de tener al menos un flujo positivo y uno negativo.");
            }

            setError(null);
            alert("El flujo de caja tiene valores positivos y negativos.");
        } catch (err: any) {
            setError(`Error de validación del flujo de caja: ${err.message}`);
        }
    };

    // Botón para mostrar información de depuración
    const showDebugInfo = () => {
        try {
            const metrics = new FinancialAnalysisMetrics(inputs);
            const debugData = {
                potenciaConvertida: metrics.convertirPotencia(),
                generacionAnualUSD: metrics.calcularGeneracionAnualUSD(),
                inversion: metrics.calcularInversion(),
                montoFinanciar: metrics.calcularMontoFinanciar(),
                pagosAnuales: metrics.calcularPagosAnuales(),
                cashflow: metrics.generarCashflowCompleto(),
                van: metrics.calcularVAN(),
                tir: metrics.calcularTIR(),
            };

            setDebugInfo(debugData);
            setError(null);
        } catch (err: any) {
            setError(`Error al obtener información de depuración: ${err.message}`);
        }
    };

    const calculateAnalysis = () => {
        try {
            setError(null);
            const metrics = new FinancialAnalysisMetrics(inputs);

            const resultsData = {
                potencia: inputs.potencia,
                generacionAnualUSD: metrics.calcularGeneracionAnualUSD(),
                inversion: metrics.calcularInversion(),
                montoFinanciar: metrics.calcularMontoFinanciar(),
                pagosAnuales: metrics.calcularPagosAnuales(),
                van: metrics.calcularVAN(),
                tir: metrics.calcularTIR(),
                relacionCuotaIngreso: metrics.calcularRelacionCuotaIngreso(),
                beneficiosLeasing: metrics.calcularBeneficiosLeasing(),
                ahorroAnualEnLeasing: metrics.calcularAhorroAnualEnPeriodoLeasing().total,
                beneficiosFueraLeasing: metrics.calcularBeneficiosFueraLeasing(),
                ahorroAnualFueraLeasing: metrics.calcularAhorroAnualFueraPeriodoLeasing().total,
                ahorroTotal: metrics.calcularAhorroTotal(),
                cashflow: metrics.generarCashflowCompleto()
            };

            setResults(resultsData);
        } catch (err: any) {
            setError(`Error al calcular el análisis financiero: ${err.message}`);
        }
    };

    const saveToServer = async () => {
        if (!results) return;

        setSaveStatus('Guardando...');
        try {
            const dataToSave = {
                timestamp: new Date().toISOString(),
                inputs: { ...inputs },
                results: results
            };

            // Cambiamos la URL para que coincida exactamente
            const response = await fetch('/api/save-analysis', { // quitamos el slash final
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSave)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al guardar los resultados');
            }

            setSaveStatus('Guardado exitoso');
            setTimeout(() => setSaveStatus(''), 3000);
        } catch (err: any) {
            console.error('Error completo:', err);
            setError(`Error al guardar: ${err.message}`);
            setSaveStatus('Error al guardar');
        }
    };


    return (
        <div className= "w-full p-8" >
        <Card>
        <CardHeader>
        <CardTitle>Configuración del Análisis Financiero </CardTitle>
            </CardHeader>
            < CardContent >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6" >
            {
                Object.keys(inputs).map((key) => (
                    <div key= { key } >
                    <label className="text-sm font-medium capitalize" > { key.replace(/([A-Z])/g, ' $1') } </label>
                < Input
                                    type = { typeof inputs[key] === 'number' ? "number" : "text" }
                                    step = { typeof inputs[key] === 'number' ? "0.01" : undefined }
                                    value = { inputs[key]}
                                    onChange = {(e) =>
handleInputChange(
    key,
    typeof inputs[key] === 'number'
        ? Number(e.target.value)
        : e.target.value
)
                                    }
                                />
    </div>
                        ))}
</div>

{/* Botones de Validación */ }
<div className="flex gap-4 mt-4" >
    <Button onClick={ validateDataTypes }>
        Validar Tipos de Datos
            </Button>
            < Button onClick = { validateCashflowSigns } >
                Validar Signos de Flujos de Caja
                    </Button>
                    < Button onClick = { showDebugInfo } >
                        Mostrar Información de Debug
                            </Button>
                            </div>

{/* Botones de Cálculo y Guardar */ }
<div className="flex gap-4 mt-4" >
    <Button onClick={ calculateAnalysis }>
        <Calculator className="w-4 h-4 mr-2" />
            Calcular Análisis
                </Button>
                < Button
onClick = { saveToServer }
disabled = {!results}
            >
    <Save className="w-4 h-4 mr-2" />
        Guardar en Servidor
            </Button>
{
    saveStatus && (
        <span className="ml-4 self-center text-sm" >
            { saveStatus }
            </span>
            )
}
</div>

{/* Mensaje de Error */ }
{
    error && (
        <div className="mt-4 text-red-500" >
            { error }
            </div>
                    )
}

{/* Información de Debug */ }
{
    debugInfo && (
        <div className="mt-6 p-4 border border-gray-300" >
            <h3 className="text-lg font-semibold" > Información de Depuración </h3>
                < pre > { JSON.stringify(debugInfo, null, 2) } </pre>
                </div>
                                        )
}

{/* Resultados del Análisis */ }
{
    results && (
        <div className="mt-6" >
            <Card>
            <CardHeader>
            <CardTitle>Resultados del Análisis Financiero </CardTitle>
                </CardHeader>
                < CardContent >
                <table className="w-full text-left" >
                    <tbody>
                    {
                        Object.entries(results).map(([key, value]) => (
                            <tr key= { key } className = "border-b" >
                            <th className="p-2 font-medium" > { key } </th>
                        < td className = "p-2" >
                        {
                            Array.isArray(value) ? (
                                <ul>
                                {
                                    value.map((item, index) => (
                                        <li key= { index } >
                                        {`Año ${index}: ${typeof item === 'number' ? item.toFixed(0) : "Valor no numérico"}`}
                                </li>
                            ))
                    }
                    </ul>
                                                                            ) : (
        typeof value === 'number' ? value.toFixed(2) : value
    )
}
</td>
    </tr>
                                                                ))}
</tbody>
    </table>
    </CardContent>
    </Card>
    </div>
                                        )}
</CardContent>
    </Card>
    </div>
                        );
                    };

export default FinancialAnalysis;
