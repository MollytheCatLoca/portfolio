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

const InformePDF = () => {
  const totalPages = 10;
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
        <BasePage pageNumber={1} totalPages={totalPages}>
          <PowerHero_Informe data={{ heroSection: heroSectionData }} />
        </BasePage>

        {/* Ventajas de All-in-One */}
        <BasePage pageNumber={2} totalPages={totalPages}>
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
        <PDFPage pageNumber={3} totalPages={totalPages}>
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

        {/* Consumo Energético y Análisis */}
        <PDFPage pageNumber={4} totalPages={totalPages}>
          <PDFSection sectionTitle="Consumo Energético y Análisis">
            <div className="grid grid-cols-2 p-4 pt-12">
              <div className="transform scale-90 origin-top-left">
                <ConsumptionForm />
              </div>
              <div className="transform scale-90 origin-top-right">
                <InvoiceDataForm />
              </div>
            </div>
          </PDFSection>
        </PDFPage>

        {/* Dimensionamiento del Parque Solar */}
        <PDFPage pageNumber={5} totalPages={totalPages}>
          <PDFSection sectionTitle="Dimensionamiento del Parque Solar" />
          <div
            style={{
              transform: 'scaleX(0.85) scaleY(0.85) translate(40px, 50px)',
              transformOrigin: 'top left',
              overflow: 'visible'
            }}
          >
            <DimensionarForm1 />
          </div>
        </PDFPage>

        <PDFPage pageNumber={6} totalPages={totalPages}>
          <PDFSection sectionTitle="Dimensionamiento del Parque Solar" />
          <div
            style={{
              transform: 'scale(0.8) translate(120px, 10px)',
              transformOrigin: 'top left',
              overflow: 'hidden',
            }}
          >
            <DimensionarContainer2 />
          </div>
        </PDFPage>

        {/* Analítica Dimensionamiento */}
        <PDFPage pageNumber={7} totalPages={totalPages}>
          <PDFSection sectionTitle="Análisis Financiero" />
          <div
            style={{
              transform: 'scaleX(1) scaleY(1) translate(5px, 20px)',
              transformOrigin: 'top left',
              overflow: 'hidden',
            }}
          >
            <AhorrosYBeneficios1 />
          </div>
        </PDFPage>

        {/* Análisis Financiero */}
        <PDFPage pageNumber={8} totalPages={totalPages}>
          <PDFSection sectionTitle="Análisis Financiero" />
          <div
            style={{
              transform: 'scaleX(0.93) scaleY(0.93) translate(35px, 30px)',
              transformOrigin: 'top left',
              overflow: 'hidden',
            }}
          >
            <AhorrosYBeneficios2 />
          </div>
        </PDFPage>

        {/* Conclusiones */}
        <PDFPage pageNumber={9} totalPages={totalPages}>
          <PDFSection sectionTitle="Análisis Financiero" />
          <div
            style={{
              transform: 'scale(0.80) translate(130px, 20px)',
              transformOrigin: 'top left',
              overflow: 'hidden',
            }}
          >
            <PowerSummary
              plantMetrics={detailedMetrics_Power}
              monthlyMetrics={detailedMetrics_Power}
              netBenefits={{ duringLeasing: 0, afterLeasing: 0 }}
              formatCurrency={(value) =>
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                }).format(value)
              }
            />
          </div>
        </PDFPage>

        {/* Página Final */}
        <BasePage pageNumber={10} totalPages={totalPages}>
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

export default InformePDF;
