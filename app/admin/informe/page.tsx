'use client';

import React, { useState, useEffect, useCallback } from 'react';
import ConstantsEditor from './components/ConstantsEditors';
import { ConstantsProvider, useConstants } from './contexts/ConstantsContext';
import { calculateMonthlyConsumption, calcularParametros } from './utils/utils';
import ConsumptionForm from './components/ConsumptionForm';
import InvoiceDataForm from './components/InvoiceDataForm';
import DimensionarContainer from './components/DimensionarContainer';
import DimensionarContainer1 from './components/DimensionarContainer1';
import DimensionarContainer2 from './components/DimensionarContainer2';
import PowerForm from './components/PowerForm';
import {  BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card3";
import AhorrosYBeneficios1 from './components/AhorrosComponent1';
import AhorrosYBeneficios2 from './components/AhorrosComponent2';
import BasePage from './components/BasePage';
import PowerHero_Informe from './components/PowerHero_Informe';
import { heroSectionData } from './data/constants_pdf';
import VentajasAllinOne_Informe from './components/VentajasAllInOne_Informe';
import PDFPage from './components/PDFPage';
import PDFSection from './components/PDFSection';
import Footer_Energy from '@/components/Footer-EnergyPDF';
import PowerSummary from './components/PowerSummary';
import CompanyDataForm from './components/CompanyDataForm';
import CompanyPresentation from './components/CompanyPresentation';
import AdvancedSolarPark from './components/AdvancedSolarPark';
import SolarQuotation from './components/SolarQuotation';
import SolarParkSummary from './components/SolarParkSummary';
import MetricasViewer from './components/MetricasViewer';
import QuotationManager from './components/QuotationManager';
import EscoDash from './components/EscobarDash';
import SolarImpactDashboard from './components/SolarImpactDashboard';


const MainContent = () => {
    const [consumptionData, setConsumptionData] = useState(null);
    const [invoiceData, setInvoiceData] = useState(null);
    const [monthlyConsumptions, setMonthlyConsumptions] = useState(null);
    const [calculationResult, setCalculationResult] = useState(null);
    const [powerData, setPowerData] = useState(null);
    const [detailedMetrics, setDetailedMetrics] = useState(null);
    const [companyData, setCompanyData] = useState(null);

    const totalPages = 10;
    const totalPagesInd = 9;


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
        duringLeasingBenefit: 0,
        afterLeasingBenefit: 0
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

    const [invoiceData_Power] = useState({
        totalInvoiceAmountPesos: constants?.invoice.totalInvoiceAmountPesos,
        fixedChargesPesos: constants?.invoice.fixedChargesPesos,
        exchangeRate: constants?.invoice.exchangeRate,
        taxesPercentage: constants?.invoice.taxesPercentage
    });

    const [monthlyMetrics_Power] = useState({
        totalInvoice: constants?.invoice.totalInvoiceAmountPesos / (1.15 * constants?.invoice.exchangeRate),
        fixedCharges: constants?.detailedMetrics?.porcentajes.ahorroTotal
    });

    const [netBenefits_Power] = useState({
        duringLeasing: 0,
        afterLeasing: 0
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
            <h1 className="text-xl font-medium text-gray-200" > Dashboard Energético </h1>
                </div>


{/* Quotation Manager - Now outside the grid */ }
<div className="mb-4" >
   
        < Card className = "bg-[#131825] border-none shadow-lg" >
            <CardContent className="p-4" >
                
                        < QuotationManager />
                        </CardContent>
                        </Card>
                        </div>

{/* Main Grid */ }
<div className="grid grid-cols-3 gap-4" >
    {/* Left Column - 1/3 width */ }
    < div className = "space-y-4" >





        {/* Consumo */ }
        < div >

        <Card className = "bg-[#131825] border-none shadow-lg" >
            <CardContent className="p-4" >
                
                        < ConsumptionForm onSubmit = { handleConsumptionSubmit } />
                            </CardContent>
                            </Card>
                            </div>


{/* Facturación */ }
<div>

    <Card className = "bg-[#131825] border-none shadow-lg" >
        <CardContent className="p-4" >
          
                    < InvoiceDataForm onSubmit = { handleInvoiceSubmit } />
                        </CardContent>
                        </Card>
                        </div>



{/* Power */ }
<div>

    <Card className = "bg-[#131825] border-none shadow-lg" >
        <CardContent className="p-4" >
                    < PowerForm onSubmit = { handleConsumptionSubmit } />
                        </CardContent>
                        </Card>
                        </div>


{/* Parámetros */ }
<div>

    <Card className = "bg-[#131825] border-none shadow-lg" >
        <CardContent className="p-4" >
                    < ConstantsEditor />
                    </CardContent>
                    < CardContent className = "p-4" >
                        <div className="text-sm text-gray-200 font-medium mb-4" >
                            Metricas </div>
                            < MetricasViewer />
                            </CardContent>


                            </Card>
                            </div>
                            </div>



{/* Right Column - 2/3 width */ }
<div className="col-span-2" >


    {/* Cliente */ }

    < Card className = "bg-[#131825] border-none shadow-lg" >
        <CardContent className="p-4" >
            <div>
                    < Card className = "bg-[#131825] border-none shadow-lg" >
                        <CardContent className="p-4" >
                                    < CompanyDataForm onSubmit = { handleCompanySubmit } />
                                        </CardContent>
                                        </Card>
                                        </div>
                                        < div >
                                                < Card className = "bg-[#131825] border-none shadow-lg" >
                                                    <CardContent className="p-4" >
                                                        <CompanyPresentation />
                                                        </CardContent>
                                                        </Card>
                                                        </div>

                                                        </CardContent>
                                                        </Card>



{/* Dimensionamiento */ }

<Card className = "bg-[#131825] border-none shadow-lg" >
    <CardContent className="p-4" >
        <DimensionarContainer />
{/* Integración del componente de Ahorros */ }

<div>
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





{/* Tercera Página con Distribución 2/3 y 1/3 */ }
<PDFPage pageNumber={ 4 } totalPages = { totalPages } >
    <PDFSection sectionTitle="Consumo Energético y Análisis" >
        <p className="mb-6" >

            </p>
            < div className = "grid grid-cols-2  p-4 pt-12" >
                <div className="transform scale-90 origin-top-left" >
                    <ConsumptionForm />
                    </div>
                    < div className = "transform scale-90 origin-top-right" >
                        <InvoiceDataForm />
                        </div>
                        </div>
                        </PDFSection>
                        </PDFPage>

                        </div>

{/* Dimensionamiento del Parque Solar */ }
<PDFPage pageNumber={ 5 } totalPages = { totalPages } >
    <PDFSection sectionTitle="Dimensionamiento del Parque Solar" >

        </PDFSection>
        < div style = {{
    transform: 'scale(0.72) translate(180px, -10px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
            }}>
    <DimensionarContainer1 />
    </div>
    </PDFPage>

    < PDFPage pageNumber = { 6 } totalPages = { totalPages } >
        <PDFSection sectionTitle="Dimensionamiento del Parque Solar" >

            </PDFSection>
            < div style = {{
    transform: 'scale(0.8) translate(120px, 10px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
            }}>
    <DimensionarContainer2 />
    </div>
    </PDFPage>


{/* Analitica Dimensionamiento */ }
<PDFPage pageNumber={ 7 } totalPages = { totalPages } >
    <PDFSection sectionTitle="Analisis Financiero" >

        </PDFSection>
        < div style = {{
    transform: 'scaleX(1) scaleY(1) translate(5px, 20px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
            }}>
    <AhorrosYBeneficios1 />
    </div>

    </PDFPage>

{/* Analisis Financiero */ }
<PDFPage pageNumber={ 8 } totalPages = { totalPages } >
    <PDFSection sectionTitle="Analisis Financiero" >

        </PDFSection>
        < div style = {{
    transform: 'scaleX(0.93) scaleY(0.93) translate(35px, 30px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
            }}>
    <AhorrosYBeneficios2 />
    </div>

    </PDFPage>

    /* Analisis Financiero */ }
<PDFPage pageNumber={ 8 } totalPages = { totalPages } >
<PDFSection sectionTitle="Analisis Financiero" >

    </PDFSection>
    < div style = {{
transform: 'scaleX(0.63) scaleY(0.63) translate(35px, 30px)', // Ajusta el valor de escala y desplazamiento aquí
    transformOrigin: 'top left', // Define el punto de referencia para la transformación
        overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
        }}>
<SolarImpactDashboard />
</div>

</PDFPage>


{/* Conclusiones */ }
<PDFPage pageNumber={ 9 } totalPages = { totalPages } >
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
<BasePage pageNumber={ 10 } totalPages = { totalPages } >
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





{/* Página de Inicio */ }
<BasePage pageNumber = { 1 } totalPages = { totalPagesInd } >
    <PowerHero_Informe data={ { heroSection: heroSectionData } } />
        </BasePage>

{/* Ventajas de All-in-One */ }
<BasePage pageNumber={ 2 } totalPages = { totalPagesInd } >
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


    < PDFPage pageNumber = { 3 } totalPages = { totalPagesInd } >
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
{/* Dimensionamiento del Parque Solar */ }
<PDFPage pageNumber={ 4 } totalPages = { totalPagesInd } >
    <PDFSection sectionTitle="Dimensionamiento del Parque Solar" >

        </PDFSection>
        < div style = {{
    transform: 'scale(0.72) translate(180px, 80px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
            }}>
    <DimensionarContainer1 />
    </div>
    </PDFPage>

    < PDFPage pageNumber = { 5 } totalPages = { totalPagesInd } >
        <PDFSection sectionTitle="Dimensionamiento del Parque Solar" >

            </PDFSection>
            < div style = {{
    transform: 'scale(0.8) translate(120px, 10px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
            }}>
    <DimensionarContainer2 />
    </div>
    </PDFPage>

   { /* Dimensionamiento del Parque Solar */ }


<PDFPage pageNumber = { 6 } totalPages = { totalPagesInd } >
    <PDFSection sectionTitle="Techical Data del Parque Solar" >

        </PDFSection>
        < div style = {{
    transform: 'scale(0.68) translate(240px, 0px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
        }}>
    <AdvancedSolarPark />
    </div>
    </PDFPage>


    < PDFPage pageNumber = { 7 } totalPages = { totalPagesInd } >
        <PDFSection sectionTitle="Techical Data del Parque Solar" >

            </PDFSection>
            < div style = {{
    transform: 'scale(0.68) translate(160px, 80px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
        }}>
    <SolarQuotation />
    </div>
    </PDFPage>

    < PDFPage pageNumber = { 8 } totalPages = { totalPagesInd } >
        <PDFSection sectionTitle="Resumen" >

            </PDFSection>
            < div style = {{
    transform: 'scale(0.60) translate(340px, 20px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
    }}>

    <EscoDash />
    </div>
    </PDFPage>

 

{/* Página Final */ }
<BasePage pageNumber={ 9 } totalPages = { totalPagesInd } >
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