// components/DashboardPDFContent.tsx
import React from 'react';
import PDFPage from '@/components/PDFPage';
import { cn } from "@/lib/utils";
import GlobalExecutiveSummary from '@/components/dashboard/GlobalExecutiveSummary';
import LocationMap from '@/components/dashboard/LocationMap';
import GlobalEnergyGeneration from '@/components/dashboard/GlobalEnergyGeneration';
import GlobalFinancialAnalysis from '@/components/dashboard/GlobalFinancialAnalysis';
import GlobalEnvironmentalImpact from '@/components/dashboard/GlobalEnvironmentalImpact';
import TechnicalDetails from '@/components/dashboard/TechnicalDetails';
import InterpretationCenter from '@/components/dashboard/InterpretationCenter';
import PDFHero from '@/components/Hero-AllInOnePDF';
import Footer_Energy from '@/components/Footer-EnergyPDF';
import ExecutiveIntro from '@/components/dashboard/GlobalIntro';
import ClientSideWrapper from '@/components/ClientSideWrapper';
import dynamic from 'next/dynamic';

const SavingsVsCostsChart = dynamic(
    () => import('@/components/dashboard/SavingsVsCostsChart'),
    { ssr: false }
);



const TOTAL_PAGES = 10; // Ajusta este número según la cantidad total de páginas en tu PDF


export default function DashboardPDFContent({ initialScenarios, initialQueryParams }) {
    if (!initialScenarios || initialScenarios.length === 0) {
        return <div>No se encontraron escenarios.</div>;
    }

    const scenarios = initialScenarios;
    const queryParams = initialQueryParams;

    return (
        <div className= "pdf-container font-sans text-xs leading-tight text-white bg-[#121212]" >

        <PDFPage pageNumber={ 1 } totalPages = { TOTAL_PAGES } >

            <div pdfstyles = {
        {
            top: '0mm',
                left: '10mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(0.9)',
                }
    }>
        <PDFHero/>
        </div>
        </PDFPage>

        < PDFPage pageNumber = { 2 } totalPages = { TOTAL_PAGES } >

            <div pdfstyles = {
        {
            top: '0mm',
                left: '10mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(0.9)',
                }
    }>
        <ExecutiveIntro />
        </div>
        </PDFPage>



        < PDFPage pageNumber = { 3 } totalPages = { TOTAL_PAGES } >

            <div pdfstyles = {
        {
            top: '30mm',
                left: '10mm',
                    width: '250mm',
                        height: '180mm',
                            transform: 'scale(0.4)',
                }
    }>
        <GlobalExecutiveSummary scenarios={ scenarios } queryParams = { queryParams } />
            </div>
            </PDFPage>

            < PDFPage pageNumber = { 4} totalPages = { TOTAL_PAGES } >
                <div pdfstyles={
        {
            top: '10mm',
                left: '10mm',
                    width: '277mm',
                        height: '90mm',
                            transform: 'scale(0.9)',
                }
    }>
        <LocationMap ubicacion={ scenarios[0].ubicacion } terreno = { scenarios[0].terreno } />
            </div>
            </PDFPage>

            < PDFPage pageNumber = { 5} totalPages = { TOTAL_PAGES } >
                <div pdfstyles = {
        {
            top: '10mm',
                left: '10mm',
                    width: '277mm',
                        height: '90mm',
                            transform: 'scale(0.9)',
                }
    }>
        <GlobalEnergyGeneration scenarios={ scenarios } />
            </div>
            </PDFPage>

            < PDFPage pageNumber = { 6} totalPages = { TOTAL_PAGES } >
                <div pdfstyles={
        {
            top: '10mm',
                left: '10mm',
                    width: '277mm',
                        height: '200mm', // Aumentamos la altura para que quepa más contenido
                            transform: 'scale(0.7)', // Escala vertical 0.7 para comprimir verticalmente
                            //transformOrigin: 'top left', // Asegura que la transformación comience desde la esquina superior izquierda
          }
    }>
        <GlobalFinancialAnalysis scenarios={ scenarios } isPDF = { true} />
            </div>
            </PDFPage>


            < PDFPage pageNumber = { 7} totalPages = { TOTAL_PAGES } >
                <div pdfstyles={
        {
            top: '0mm',
                left: '10mm',
                    width: '277mm',
                        height: '250mm', // Aumentamos la altura para que quepa más contenido
                            transform: 'scale(0.7)', // Escala vertical 0.7 para comprimir verticalmente
                        //transformOrigin: 'top left', // Asegura que la transformación comience desde la esquina superior izquierda
      }
    }>
        <ClientSideWrapper>
        <SavingsVsCostsChart scenarios={ scenarios }  />
            </ClientSideWrapper>
            </div>
            </PDFPage>


            < PDFPage pageNumber = { 8} totalPages = { TOTAL_PAGES } >
                <div pdfstyles = {
        {
            top: '10mm',
                left: '10mm',
                    width: '277mm',
                        height: '180mm',
                            transform: 'scale(0.7)',
                }
    }>
        <GlobalEnvironmentalImpact scenarios={ scenarios } />
            </div>
            </PDFPage>

            < PDFPage pageNumber = { 9} totalPages = { TOTAL_PAGES } >
                <div pdfstyles={
        {
            top: '40mm',
                left: '10mm',
                    width: '277mm',
                        height: '90mm',
                            transform: 'scale(0.7)',
                }
    }>
        <TechnicalDetails detallesTecnicos={ scenarios[0].detallesTecnicos } capacidad = { scenarios[0].capacidad } />
            </div>
            </PDFPage>


            < PDFPage pageNumber = { 10} totalPages = { TOTAL_PAGES } >
                <div style={
        {
            position: 'relative',
                height: '100%',
                    width: '100%',
                        display: 'flex',
                            flexDirection: 'column',
                                justifyContent: 'space-between',
                                    padding: '10mm',
    }
    }>
        <div style={
        {
            transform: 'scale(0.9)',
                transformOrigin: 'top center',
        }
    }>
        <InterpretationCenter impactoSocial={ scenarios[0].impactoSocial } />
            </div>

            < div style = {{
        marginTop: '10mm',
            transform: 'scale(0.99)',
                transformOrigin: 'bottom center',
        }
}>
    <Footer_Energy />
    </div>
    </div>
    </PDFPage>
    </div>
    );
}