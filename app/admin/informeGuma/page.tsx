'use client';

import React, { useState, useEffect } from 'react';
import ConstantsEditor from './components/ConstantsEditors';
import { DimensioningProvider, useDimensioning } from './contexts/DimensionarContext';
import { ConstantsProvider, useConstants } from './contexts/ConstantsContext';
import { calculateMonthlyConsumption, calcularParametros } from './utils/utils';
import ConsumptionForm from './components/ConsumptionForm';
import InvoiceDataFormLargeCompany from './components/InvoiceDataFormLargeCompany';
import DimensionarForm from './components/DimensionarForm';
import DimensionarContainer from './components/DimensionarContainer';
import DimensionarContainer1 from './components/DimensionarContainer1';
import DimensionarContainer2 from './components/DimensionarContainer2';
import PowerForm from './components/PowerForm';
import StateMonitor from './components/StateMonitor';
import { Settings, Zap, Calculator, BarChart3 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import AhorrosComponent from './components/AhorrosComponentAUX';
import AhorrosYBeneficios1 from './components/AhorrosComponent1';
import AhorrosYBeneficios2 from './components/AhorrosComponent2';
import BasePage from './components/BasePage';
import PowerHero_Informe from './components/PowerHero_Informe';
import { heroSectionData } from './data/constants_pdf';
import VentajasAllinOne_Informe from './components/VentajasAllInOne_Informe';
import PDFPage from './components/PDFPage';
import PDFSection from './components/PDFSection';
import Footer_Energy from '@/components/Footer-EnergyPDF';
import AnalisisParqueSolar from './components/AnalisisParqueSolar';
import PowerSummary from './components/PowerSummary';
import CompanyDataForm from './components/CompanyDataForm';
import CompanyPresentation from './components/CompanyPresentation';
import EnergyGeneration from './components/GeneracionSolar';
import SolarProjectMetrics from './components/SolarProjectMetrics';
import SolarProjectFinancial from './components/SolarProjectFinancial';
import Dashboard from './components/DashSimEs';




const MainContent = () => {
    const [consumptionData, setConsumptionData] = useState(null);
    const [invoiceData, setInvoiceData] = useState(null);
    const [invoiceDataGuma, setInvoiceDataGuma] = useState(null);
    const [monthlyConsumptions, setMonthlyConsumptions] = useState(null);
    const [calculationResult, setCalculationResult] = useState(null);
    const [powerData, setPowerData] = useState(null);
    const [detailedMetrics, setDetailedMetrics] = useState(null);
    const [companyData, setCompanyData] = useState(null);

    const totalPages = 14;


    // Usamos los dos contextos
    const {
        constants,
        isLoading: constantsLoading,
        error: constantsError
    } = useConstants();

    //const {
    //    dimensioningData,
    //    isLoading: dimensioningLoading,
    //    error: dimensioningError
    //} = useDimensioning();

    /// Función para formatear moneda sin decimales


    // Cálculo de los datos para PowerSummary
    const [detailedMetrics_Power, setDetailedMetrics_Power] = useState({
        selfConsumptionPercentage: constants?.detailedMetrics?.porcentajes?.ahorroTotal || 0,
        plantCapacityKW: constants?.detailedMetrics?.capacityMW,
        duringLeasingBenefit: 28976,
        afterLeasingBenefit: 172339
    });

    const [constants_Power] = useState({
        detailedMetrics: {
            capacityMW: constants?.detailedMetrics?.capacityMW,
            valoresAnuales: {
                generacionTotal: constants?.detailedMetrics?.valoresAnuales.generacionTotal,
                autoconsumo: constants?.detailedMetrics?.valoresAnuales.autoconsumo,
                inyeccion: constants?.detailedMetrics?.valoresAnuales.inyeccion,
                curtailment: constants?.detailedMetrics?.valoresAnuales.curtailment
            }
        }
    });





    const [monthlyMetrics_Power] = useState({
        totalInvoice: 3144000,
        fixedCharges: 600000
    });

    const [netBenefits_Power] = useState({
        duringLeasing: 55700,
        afterLeasing: 178000
    });

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    // Función para actualizar cuando tengamos los datos
    // Para hacerlo dinámico, usaríamos un useEffect:
    useEffect(() => {
        if (constants?.detailedMetrics?.porcentajes?.ahorroTotal) {
            setDetailedMetrics_Power(prev => ({
                ...prev,
                selfConsumptionPercentage: constants.detailedMetrics.porcentajes.ahorroTotal
            }));
        }
    }, [constants?.detailedMetrics?.porcentajes?.ahorroTotal]);


    const handleConsumptionSubmit = (values) => {
        setConsumptionData(values);
        setMonthlyConsumptions(calculateMonthlyConsumption(values));
    };

    const handleInvoiceSubmit = (values) => {
        setInvoiceData(values);
    };

    const handleInvoiceGumaSubmit = (values) => {
        setInvoiceDataGuma_Power(values);

        // Aquí puedes agregar la lógica adicional para enviar datos al backend o al contexto, si es necesario
        console.log("Datos de factura GUMA enviados:", values);
    };



    const handlePowerSubmit = (values) => {
        setPowerData(values);
    };

    const handleCompanySubmit = (values) => {
        setCompanyData(values);
    };


    // || dimensioningLoading
    if (constantsLoading) {
        return (
            <div className= "min-h-screen flex items-center justify-center" >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" > </div>
                </div>
        );
}
//|| dimensioningError
if (constantsError) {
    return (
        <div className= "min-h-screen flex items-center justify-center" >
        <div className="text-red-500 text-xl" >
        {
            constantsError
        }
            </div>
            </div>
        );
}

return (
    <div className= "min-h-screen bg-[#0B0F19] p-4" >
    {/* Header */ }
    < div className = "mb-6 flex items-center gap-2" >
        <BarChart3 className="h-6 w-6 text-blue-400" />
            <h1 className="text-xl font-medium text-gray-200" > Dashboard Energético GUMA </h1>
                </div>

{/* Main Grid */ }
<div className="grid grid-cols-3 gap-4" >
    {/* Left Column - 1/3 width */ }
    < div className = "space-y-4" >
        {/* Consumo */ }
        < div >
        <div className="text-sm text-gray-400 font-medium px-2 mb-2" >
            Consumo
            </div>
            < Card className = "bg-[#131825] border-none shadow-lg" >
                <CardContent className="p-4" >
                    <div className="text-sm text-gray-200 font-medium mb-4" >
                        Datos de Consumo Energético
                            </div>

                            </CardContent>
                            </Card>
                            </div>

{/* Datos de la Empresa */ }
<div>
    <div className="text-sm text-gray-400 font-medium px-2 mb-2" >
        Datos de la Empresa
            </div>
            < Card className = "bg-[#131825] border-none shadow-lg" >
                <CardContent className="p-4" >
                    <div className="text-sm text-gray-200 font-medium mb-4" >
                        Información de la Empresa
                            </div>
                            < CompanyDataForm onSubmit = { handleCompanySubmit } />
                                </CardContent>
                                </Card>
                                </div>

                                < div >
                                <div className="text-sm text-gray-400 font-medium px-2 mb-2" >
                                    Datos de la Empresa
                                        </div>
                                        < Card className = "bg-[#131825] border-none shadow-lg" >
                                            <CardContent className="p-4" >
                                                <CompanyPresentation />
                                                </CardContent>
                                                </Card>
                                                </div>




{/* Facturación */ }
<div>
    <div className="text-sm text-gray-400 font-medium px-2 mb-2" >
        Facturación
        </div>
        < Card className = "bg-[#131825] border-none shadow-lg" >
            <CardContent className="p-4" >
                <div className="text-sm text-gray-200 font-medium mb-4" >
                    Datos de la Factura
                        </div>
                        < InvoiceDataFormLargeCompany onSubmit = { handleInvoiceGumaSubmit } />
                            </CardContent>
                            </Card>
                            </div>

{/* Potencia */ }
<div>
    <div className="text-sm text-gray-400 font-medium px-2 mb-2" >
        Potencia
        </div>
        < Card className = "bg-[#131825] border-none shadow-lg" >
            <CardContent className="p-4" >
                <div className="text-sm text-gray-200 font-medium mb-4" >
                    Potencia Instalada
                        </div>
                        < PowerForm onSubmit = { handlePowerSubmit } />
                            </CardContent>
                            </Card>
                            </div>

{/* Parámetros */ }
<div>
    <div className="text-sm text-gray-400 font-medium px-2 mb-2" >
        Constantes
        </div>
        < Card className = "bg-[#131825] border-none shadow-lg" >
            <CardContent className="p-4" >
                <div className="text-sm text-gray-200 font-medium mb-4" >
                    Parámetros del Sistema
                        </div>
                        < ConstantsEditor />
                        </CardContent>
                        </Card>
                        </div>
                        </div>

{/* Monitor de estado
<div className="mt-4" >
    <div className="text-sm text-gray-400 font-medium px-2 mb-2" >
        Debug
        </div>
        < StateMonitor
consumptionData = { consumptionData }
invoiceData = { invoiceData }
monthlyConsumptions = { monthlyConsumptions }
calculationResult = { calculationResult }
powerData = { powerData }
    />
    </div>  */ }

{/* Right Column - 2/3 width */ }
<div className="col-span-2" >
    <div className="text-sm text-gray-400 font-medium px-2 mb-2" >
        Dimensionamiento
        </div>
        < Card className = "bg-[#131825] border-none shadow-lg" >
            <CardContent className="p-4" >
                <div className="text-sm text-gray-200 font-medium mb-4" >
                    Dimensionar Parque Solar
                        </div>
                        < DimensionarContainer />
                        {/* Integración del componente de Ahorros */ }
                        < div className = "mt-6" >
                            <h3 className="text-sm text-gray-200 font-medium mb-4" > Análisis de Ahorros </h3>
                                < AhorrosComponent />
                                </div>
                                </CardContent>
                                </Card>
                                </div>
                                </div>



{/* Results Section */ }
{
    calculationResult && (
        <div className="mt-4" >
            <Card className="bg-[#131825] border-none shadow-lg" >
                <CardContent className="p-4" >
                    <div className="text-sm text-gray-200 font-medium mb-4" >
                        Resultados del Cálculo
                            </div>
                            < div className = "text-gray-300" >
                                {/* Contenido de resultados */ }
                                </div>
                                </CardContent>
                                </Card>
                                </div>
            )
}


<div>
    {/* Página de Inicio */ }
    < BasePage pageNumber = { 1 } totalPages = { totalPages } >
        <PowerHero_Informe data={ { heroSection: heroSectionData } } />
            </BasePage>

{/* Ventajas de All-in-One */ }
<BasePage pageNumber={ 2 } totalPages = { totalPages } >
    <div style = {
    {
        transform: 'scale(1.05) translate(-15px, -10px)', // Ajusta el valor de escala y desplazamiento aquí
            transformOrigin: 'top left', // Define el punto de referencia para la transformación
                overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
            }
}>
    <VentajasAllinOne_Informe />
    </div>
    </BasePage>

{/* Empresa */ }
<PDFPage pageNumber={ 3 } totalPages = { totalPages } >
    <PDFSection sectionTitle="Locacion" >

        </PDFSection>
        < div style = {{
    transform: 'scale(0.75) translate(160px, 50px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
        }}>
    <CompanyPresentation />
    </div>
    </PDFPage>


    < PDFPage pageNumber = { 4 } totalPages = { totalPages } >
        <PDFSection sectionTitle="Dimensionamiento del Parque Solar" >

            </PDFSection>
            < div style = {{
    transform: 'scale(0.73) translate(130px, 0px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
    }}>
    <ConsumptionForm />
    </div>
    </PDFPage>


    < PDFPage pageNumber = { 5 } totalPages = { totalPages } >
        <PDFSection sectionTitle="Dimensionamiento del Parque Solar" >

            </PDFSection>
            < div style = {{
    transform: 'scaleX(0.8) scaleY(0.8) translate(110px, 10px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
            }}>
    <EnergyGeneration />
    </div>
    </PDFPage>



{/* Tercera Página con Distribución 2/3 y 1/3 */ }


</div>

{/* Dimensionamiento del Parque Solar */ }
<PDFPage pageNumber={ 6 } totalPages = { totalPages } >
    <PDFSection sectionTitle="Dimensionamiento del Parque Solar" >

        </PDFSection>
        < div style = {{
    transform: 'scale(0.72) translate(190px, 0px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
            }}>
    <DimensionarContainer1 />
    </div>
    </PDFPage>

    < PDFPage pageNumber = { 7 } totalPages = { totalPages } >
        <PDFSection sectionTitle="Dimensionamiento del Parque Solar" >

            </PDFSection>
            < div style = {{
    transform: 'scale(0.8) translate(130px, 20px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
            }}>
    <DimensionarContainer2 />
    </div>
    </PDFPage>


{/* Analitica Dimensionamiento */ }
<PDFPage pageNumber={ 8 } totalPages = { totalPages } >
    <PDFSection sectionTitle="Metricas" >

        </PDFSection>
        < div style = {{
    transform: 'scaleX(0.90) scaleY(1.08) translate(93px, 50px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
            }}>
    <SolarProjectMetrics chartOption={ 1 } />
        </div>

        </PDFPage>

        < PDFPage pageNumber = { 9 } totalPages = { totalPages } >
            <PDFSection sectionTitle="Metricas" >

                </PDFSection>
                < div style = {{
    transform: 'scaleX(0.90) scaleY(1.08) translate(93px, 50px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
            }}>
    <SolarProjectMetrics chartOption={ 2 } />

        </div>

        </PDFPage>

        < PDFPage pageNumber = { 10 } totalPages = { totalPages } >
            <PDFSection sectionTitle="Analisis Financiero" >

                </PDFSection>
                < div style = {{
    transform: 'scaleX(0.95) scaleY(1.08) translate(50px, 60px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
            }}>
    <SolarProjectFinancial />
    </div>

    </PDFPage>

{/* Analisis Financiero */ }
<PDFPage pageNumber={ 11 } totalPages = { totalPages } >
    <PDFSection sectionTitle="Analisis Financiero" >

        </PDFSection>
        < div style = {{
    transform: 'scaleX(1.12) scaleY(1.12) translate(65px, 50px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
            }}>
    <AhorrosYBeneficios2 />
    </div>

    </PDFPage>


{/* Analisis Financiero */ }
<PDFPage pageNumber={ 12 } totalPages = { totalPages } >
    <PDFSection sectionTitle="Escenarios" >

        </PDFSection>
        < div style = {{
    transform: 'scaleX(0.9) scaleY(0.9) translate(60px, 50px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
        }}>
    <Dashboard />
    </div>

    </PDFPage>



{/* Conclusiones */ }
<PDFPage pageNumber={ 13 } totalPages = { totalPages } >
    <PDFSection sectionTitle="Analisis Financiero" >

        </PDFSection>
        < div style = {{
    transform: 'scale(0.80) translate(130px, 20px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
            }}>
    <PowerSummary
            plantMetrics={ detailedMetrics_Power }
monthlyMetrics = { monthlyMetrics_Power }
netBenefits = { netBenefits_Power }
formatCurrency = { formatCurrency }
    />

    </div>

    </PDFPage>






{/* Página Final */ }
<BasePage pageNumber={ 14 } totalPages = { totalPages } >
    <div
        style={
    {
        marginTop: '90mm',
            transform: 'scale(0.99)',
                transformOrigin: 'bottom center',
        }
}
      >
    <Footer_Energy />
    </div>
    </BasePage>






    </div>

    );
};

const InformePage = () => {


    return (
        <ConstantsProvider>

        <MainContent />


        </ConstantsProvider>
    );
};

export default InformePage;