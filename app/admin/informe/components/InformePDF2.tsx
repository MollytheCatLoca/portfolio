"use client"

import React, { useState, useEffect } from 'react';
import BasePage from '../components/BasePage';
import PDFPage from '../components/PDFPage';
import PDFSection from '../components/PDFSection';
import PowerHero_Informe from '../components/PowerHero_Informe';
import VentajasAllinOne_Informe from '../components/VentajasAllInOne_Informe';
import CompanyPresentation from '../components/CompanyPresentation';
import ConsumptionForm from '../components/ConsumptionForm';
import InvoiceDataForm from '../components/InvoiceDataForm';
import DimensionarContainer1 from '../components/DimensionarContainer1';
import DimensionarContainer2 from '../components/DimensionarContainer2';
import DimensionarForm1 from './DimensionarForm1';
import AhorrosYBeneficios1 from '../components/AhorrosComponent1';
import AhorrosYBeneficios2 from '../components/AhorrosComponent2';
import PowerSummary from '../components/PowerSummary';
import Footer_Energy from '@/components/Footer-EnergyPDF';
import { heroSectionData } from '../data/constants_pdf';
import { useConstants } from '../contexts/ConstantsContext';
import ReactDOMServer from 'react-dom/server';
import CompanyPresentationPrint from './CompanyPresentationPrint';
import TucumanSolarTechnical from './AdvancedSolarPark';
import SolarQuotation from './SolarQuotation';
import SolarParkSummary from './SolarParkSummary';
import EscoDash from './EscobarDash';

const InformePDF2 = () => {
  const totalPagesInd = 9;
  const [consumptionData, setConsumptionData] = useState(null);
  const [invoiceData, setInvoiceData] = useState(null);
  const [monthlyConsumptions, setMonthlyConsumptions] = useState(null);
  const [calculationResult, setCalculationResult] = useState(null);
  const [powerData, setPowerData] = useState(null);

  // Usamos el contexto de constants
  const {
    constants,
    isLoading: constantsLoading,
    error: constantsError,
  } = useConstants();

  const [detailedMetrics_Power, setDetailedMetrics_Power] = useState({
    selfConsumptionPercentage: constants?.detailedMetrics?.porcentajes?.ahorroTotal || 0,
    plantCapacityKW: constants?.detailedMetrics?.capacityMW,
    duringLeasingBenefit: 0,
    afterLeasingBenefit: 0,
  });

  useEffect(() => {
    if (constants && constants.detailedMetrics) {
      setDetailedMetrics_Power({
        selfConsumptionPercentage: constants.detailedMetrics.porcentajes?.ahorroTotal || 0,
        plantCapacityKW: constants.detailedMetrics.capacityMW,
        duringLeasingBenefit: detailedMetrics_Power.duringLeasingBenefit,
        afterLeasingBenefit: detailedMetrics_Power.afterLeasingBenefit,
      });
    }
  }, [constants]);

  if (constantsLoading) {
    return <div>Cargando...</div>;
  }

  if (constantsError) {
    return <div>Error al cargar los datos.</div>;
  }

 

  return (
    <div>
      <div id="informe-pdf-container">
        {/* Página de Inicio */}
        <BasePage pageNumber={1} totalPages={totalPagesInd}>
          <PowerHero_Informe data={{ heroSection: heroSectionData }} />
        </BasePage>

        {/* Ventajas de All-in-One */}
        <BasePage pageNumber={2} totalPages={totalPagesInd}>
          <div
            style={{
              transform: 'scale(1.05) translate(-15px, -10px)',
              transformOrigin: 'top left',
              overflow: 'hidden',
            }}
          >
            <VentajasAllinOne_Informe />
          </div>
        </BasePage>

        {/* Empresa */}
        <PDFPage pageNumber={3} totalPages={totalPagesInd}>
          <PDFSection sectionTitle="Locacion" />
          <div
            style={{
              transform: 'scale(0.75) translate(160px, 50px)',
              transformOrigin: 'top left',
              overflow: 'visible', // Cambiamos a visible para debugging
      minHeight: '500px',  // Aseguramos espacio suficiente
      width: '100%'
            }}
          >
            <CompanyPresentationPrint />
          </div>
        </PDFPage>

      

        {/* Dimensionamiento del Parque Solar */}
        <PDFPage pageNumber={4} totalPages={totalPagesInd}>
          <PDFSection sectionTitle="Dimensionamiento del Parque Solar" />
          <div
            style={{
              transform: 'scaleX(0.80) scaleY(0.80) translate(90px, 70px)',
              transformOrigin: 'top left',
              overflow: 'visible'
            }}
          >
            <DimensionarForm1 />
          </div>
        </PDFPage>

       

        {/* Analítica Dimensionamiento */}
        < PDFPage pageNumber = { 5 } totalPages = { totalPagesInd } >
        <PDFSection sectionTitle="Dimensionamiento del Parque Solar" >

            </PDFSection>
            < div style = {{
    transform: 'scale(0.8) translate(140px, 10px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
            }}>
    <DimensionarContainer2 />
    </div>
    </PDFPage>

 {/* AdvanceSolarPark */}
        <PDFPage pageNumber = { 6 } totalPages = { totalPagesInd } >
    <PDFSection sectionTitle="Techical Data del Parque Solar" >

        </PDFSection>
        < div style = {{
    transform: 'scale(0.8) translate(140px, 20px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
        }}>
    <TucumanSolarTechnical />
    </div>
    </PDFPage>

 {/* SolarQuotation */}
    < PDFPage pageNumber = { 7 } totalPages = { totalPagesInd } >
    <PDFSection sectionTitle="Techical Data del Parque Solar" >

        </PDFSection>
        < div style = {{
transform: 'scale(0.65) translate(180px, 70px)', // Ajusta el valor de escala y desplazamiento aquí
    transformOrigin: 'top left', // Define el punto de referencia para la transformación
        overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
    }}>
<SolarQuotation />
</div>
</PDFPage>

        {/* SolarParkSummary */}
     
        < PDFPage pageNumber = { 8 } totalPages = { totalPagesInd } >
        <PDFSection sectionTitle="Techical Data del Parque Solar" >

            </PDFSection>
            < div style = {{
    transform: 'scale(0.65) translate(260px, 100px)', // Ajusta el valor de escala y desplazamiento aquí
        transformOrigin: 'top left', // Define el punto de referencia para la transformación
            overflow: 'hidden', // Opcional: oculta cualquier contenido que desborde el área visible
    }}>

    <SolarParkSummary />
    </div>
    </PDFPage>

       
        {/* Página Final */}
        <BasePage pageNumber={9} totalPages={totalPagesInd}>
          <div
            style={{
              marginTop: '90mm',
              transform: 'scale(0.99)',
              transformOrigin: 'bottom center',
            }}
          >
            <Footer_Energy />
          </div>
        </BasePage>
      </div>
    </div>
  );
};

export default InformePDF2;
















  
   




