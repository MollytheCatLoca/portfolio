'use client';
import React, { useState, useEffect } from 'react';
import { ConstantsProvider, useConstants } from '../contexts/ConstantsContext';
import PowerHero_Informe from '../components/PowerHero_Informe';
import PDFPage from '../components/PDFPage';
import PDFSection from '../components/PDFSection';
import { heroSectionData } from '../data/constants_pdf';
import BasePage from '../components/BasePage';
import Footer_Energy from '@/components/Footer-EnergyPDF';
import VentajasAllinOne_Informe from '../components/VentajasAllInOne_Informe';
import ConsumptionForm from '../components/ConsumptionForm';
import InvoiceDataForm from '../components/InvoiceDataForm';
import DimensionarForm from '../components/DimensionarFormPDF';
import DimensionarContainer from '../components/DimensionarContainerPDF';

const InformePDF: React.FC = () => {
    const totalPages = 6;
    const [consumptionData, setConsumptionData] = useState(null);
    const [invoiceData, setInvoiceData] = useState(null);
    const [monthlyConsumptions, setMonthlyConsumptions] = useState(null);
    const [calculationResult, setCalculationResult] = useState(null);
    const [powerData, setPowerData] = useState(null);
    const [detailedMetrics, setDetailedMetrics] = useState(null);

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


    // || dimensioningLoading
    if (constantsLoading) {
        return (
            <div className= "min-h-screen flex items-center justify-center" >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" > </div>
                </div>
        );
}


return (
    <ConstantsProvider>
    <div>
    {/* Página de Inicio */ }
    < BasePage pageNumber = { 1} totalPages = { totalPages } >
        <PowerHero_Informe data={ { heroSection: heroSectionData } } />
            </BasePage>

{/* Ventajas de All-in-One */ }
<BasePage pageNumber={ 2 } totalPages = { totalPages } >
    <VentajasAllinOne_Informe />
    </BasePage>

{/* Tercera Página con Distribución 2/3 y 1/3 */ }
<PDFPage pageNumber={ 3 } totalPages = { totalPages } >
    <PDFSection sectionTitle="Consumo Energético y Análisis" >
        <p className="mb-6" >
            Detalles del consumo actual y análisis del ahorro estimado con la implementación del parque solar.
            </p>
                < div className = "grid grid-cols-2 gap-6" >
                    <div className="transform scale-95 origin-top-left" >
                        <ConsumptionForm />
                        </div>
                        < div className = "transform scale-95 origin-top-right" >
                            <InvoiceDataForm />
                            </div>
                            </div>
                            </PDFSection>
                            </PDFPage>

{/* Dimensionamiento del Parque Solar */ }
<PDFPage pageNumber={ 4 } totalPages = { totalPages } >
    <PDFSection sectionTitle="Dimensionamiento del Parque Solar" >
        <p>Aquí se muestran los parámetros de dimensionamiento y configuración del parque.</p>
            </PDFSection>
            < DimensionarContainer />
            </PDFPage>

{/* Página Final */ }
<BasePage pageNumber={ 5 } totalPages = { totalPages } >
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
    </ConstantsProvider>
  );
};

export default InformePDF;