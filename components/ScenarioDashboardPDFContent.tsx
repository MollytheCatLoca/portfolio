import React from 'react';
import PDFPage from '@/components/PDFPage';
import { cn } from "@/lib/utils";
import ExecutiveSummary from '@/components/dashboard/ExecutiveSummary';
import LocationMap from '@/components/dashboard/LocationMap';
import EnergyGeneration from '@/components/dashboard/EnergyGeneration';
import FinancialAnalysis from '@/components/dashboard/FinancialAnalysis';
import EnvironmentalImpact from '@/components/dashboard/EnvironmentalImpact';
import TechnicalDetails from '@/components/dashboard/TechnicalDetails';
import InterpretationCenter from '@/components/dashboard/InterpretationCenter';
import Hero_Dash_In from '@/components//Hero-Dash-In';
import Footer_Energy from '@/components/Footer-EnergyPDF';
import ExecutiveIntro from '@/components/dashboard/GlobalIntro';

const TOTAL_PAGES = 8; // Ajustado para incluir la página de Hero

interface ScenarioDashboardPDFContentProps {
    data: {
        nombre: any;
        capacidad: any;
        inversion: any;
        produccionAnual: any;
        ahorroCO2: any;
        ubicacion: any;
        terreno: any;
        generacionAnual: any;
        generacionMensual: any;
        analisisFinanciero: any;
        detallesTecnicos: any;
        impactoSocial: any;
    };
    id: string;
    queryParams: any;
}

export default function ScenarioDashboardPDFContent({ data, id, queryParams }: ScenarioDashboardPDFContentProps) {
    return (
        <div className= "pdf-container font-sans text-xs leading-tight text-white bg-[#121212]" >
        <PDFPage pageNumber={ 1 } totalPages = { TOTAL_PAGES } >
            <div pdfstyles={
        {
            top: '0mm',
                left: '10mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(0.9)',
                }
    }>
        <Hero_Dash_In parqueInfo={
        {
            provincia: data.ubicacion.provincia,
                localidad: data.ubicacion.ciudad,
                    capacidad: data.capacidad.actual
        }
    } />
        </div>
        </PDFPage>

        < PDFPage pageNumber = { 2} totalPages = { TOTAL_PAGES } >
            <div pdfstyles={
        {
            top: '0mm',
                left: '10mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(0.9)',
                }
    }>
        <ExecutiveIntro data={ data } />
            </div>
            </PDFPage>

            < PDFPage pageNumber = { 3} totalPages = { TOTAL_PAGES } >
                <div pdfstyles={
        {
            top: '0mm',
                left: '10mm',
                    width: '250mm',
                        height: '200mm',
                            transform: 'scale(0.4)',
                }
    }>
        <ExecutiveSummary 
                        capacidad={ data.capacidad }
    inversion = { data.inversion }
    produccionAnual = { data.produccionAnual }
    ahorroCO2 = { data.ahorroCO2 }
        />
        </div>


        < div pdfstyles = {
            {
        top: '10mm',
            left: '10mm',
                width: '277mm',
                    height: '90mm',
                        transform: 'scale(0.9)',
                    }
}>
    <LocationMap ubicacion={ data.ubicacion } terreno = { data.terreno } />
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
    <EnergyGeneration 
generacionMensual={ data.generacionMensual }
generacionAnual = { data.generacionAnual }
factorCapacidad = { data.factorCapacidad }
produccionAnual = { data.produccionAnual }
    />
    </div>
    </PDFPage>

    < PDFPage pageNumber = { 5} totalPages = { TOTAL_PAGES } >
        <div pdfstyles={
    {
        top: '10mm',
            left: '10mm',
                width: '277mm',
                    height: '200mm',
                        transform: 'scale(0.7)',
                }
}>
    <FinancialAnalysis
                        inversion={ data.inversion }
analisisFinanciero = { data.analisisFinanciero }
isPDF = { true}
    />
    </div>
    </PDFPage>

    < PDFPage pageNumber = { 6} totalPages = { TOTAL_PAGES } >
        <div pdfstyles={
    {
        top: '10mm',
            left: '10mm',
                width: '277mm',
                    height: '180mm',
                        transform: 'scale(0.7)',
                }
}>
    <EnvironmentalImpact ahorroCO2={ data.ahorroCO2 } />
        </div>
        </PDFPage>

        < PDFPage pageNumber = { 7} totalPages = { TOTAL_PAGES } >
            <div pdfstyles={
    {
        top: '40mm',
            left: '10mm',
                width: '277mm',
                    height: '90mm',
                        transform: 'scale(0.7)',
                }
}>
    <TechnicalDetails detallesTecnicos={ data.detallesTecnicos } capacidad = { data.capacidad } />
        </div>
        </PDFPage>

        < PDFPage pageNumber = { 8} totalPages = { TOTAL_PAGES } >
            <div pdfstyles={
    {
        top: '10mm',
            left: '10mm',
                width: '277mm',
                    height: '180mm',
                        transform: 'scale(0.7)',
                }
}>
    <InterpretationCenter impactoSocial={ data.impactoSocial } />
        </div>
        < div style = {
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