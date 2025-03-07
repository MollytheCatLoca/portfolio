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
import SolarParkSpecs from './SolarParkSpecs';
import EnergyResource from './EnergyResource';
import EnergyProduction from './EnergyProduction';
import SolarBudget from './SolarBudget';
import ProjectSummary from './ProjectSummary';

const PresupFierros = () => {
  const totalPages = 9;
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
          <PDFSection sectionTitle="Specs Parque Solar" />
          <div
            style={{
              transform: 'scaleX(0.72) scaleY(0.72) translate(170px, 20px)',
              transformOrigin: 'top left',
              overflow: 'visible'
            }}
          >
          <SolarParkSpecs />
           
          </div>
        </PDFPage>
        {/* Dimensionamiento del Parque Solar */}
        <PDFPage pageNumber={5} totalPages={totalPages}>
          <PDFSection sectionTitle="Recurso Solar" />
          <div
            style={{
              transform: 'scaleX(0.85) scaleY(0.92) translate(100px, 20px)',
              transformOrigin: 'top left',
              overflow: 'visible'
            }}
          >
          <EnergyResource />
           
          </div>
        </PDFPage>

        <PDFPage pageNumber={6} totalPages={totalPages}>
          <PDFSection sectionTitle="Generacion Parque Solar" />
          <div
            style={{
              transform: 'scaleX(0.7) scaleY(0.68) translate(220px, 10px)',
              transformOrigin: 'top left',
              overflow: 'hidden',
            }}
          >
          <EnergyProduction />
           
          </div>
        </PDFPage>

        {/* Analítica Dimensionamiento */}
        <PDFPage pageNumber={7} totalPages={totalPages}>
          <PDFSection sectionTitle="Análisis Financiero" />
          <div
            style={{
              transform: 'scaleX(0.8) scaleY(0.8) translate(140px, 20px)',
              transformOrigin: 'top left',
              overflow: 'hidden',
            }}
          >
           <SolarBudget />
          </div>
        </PDFPage>

        {/* Análisis Financiero */}
        <PDFPage pageNumber={8} totalPages={totalPages}>
          <PDFSection sectionTitle="Análisis Financiero" />
          <div
            style={{
              transform: 'scaleX(0.80) scaleY(0.80) translate(140px, 30px)',
              transformOrigin: 'top left',
              overflow: 'hidden',
            }}
          >
           <ProjectSummary />
          </div>
        </PDFPage>

   

        {/* Página Final */}
        <BasePage pageNumber={9} totalPages={totalPages}>
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

export default PresupFierros;
