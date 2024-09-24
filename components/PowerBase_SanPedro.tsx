import React from 'react';
import PowerPage from './PowerPage';
import { cn } from "@/lib/utils";
import FinancingAdvantages from './Pages/FinancingAdvanges';
import CatamarcaPotential from './Pages/CatamarcaPotencial';
import PowerHero from './Hero-AllInOnePower';
import Footer_Energy from '@/components/Footer-EnergyPDF';
import ExecutiveIntro from '@/components/dashboard/GlobalIntro';
import VentajasActores from './Pages/SanPedro_ VentajasActores';
import RutaImplementacion2 from './Pages/SanPedro_ RutaImplementacion2';
import RutaImplementacion1 from './Pages/SanPedro_ RutaImplementacion1';
import ClusterGeneradorResumen from './Pages/ClusterGeneradorResumen';
import ResumenEjecutivo from './Pages/SanPedro_ ResumenEjecutivo';
import FinancialAnalysisTable from './Pages/AuxDPA';
import BeneficiosAllInOne from './Pages/SanPedro_ BeneficiosAllInOne';
const TOTAL_PAGES = 9;

export default function PowerContent_SanPedro({ initialScenarios, initialQueryParams }) {


    return (
        <div className= "pdf-container font-sans text-xs leading-tight text-white bg-[#121212]" >
        <PowerPage pageNumber={ 1 } totalPages = { TOTAL_PAGES } >
            <div pdfstyles={
        {
            top: '0mm',
                left: '10mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(0.9)',
                }
    }>
        <PowerHero/>
        </div>
        </PowerPage>



        < PowerPage pageNumber = { 2} totalPages = { TOTAL_PAGES } >
            <div pdfstyles={
        {
            top: '10mm',
                left: '10mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(0.9)',
                }
    }>



        </div>
        </PowerPage>







        < PowerPage pageNumber = { 3} totalPages = { TOTAL_PAGES } >
            <div pdfstyles={
        {
            top: '10mm',
                left: '10mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(0.9)',
                }
    }>

        <ResumenEjecutivo transform = "scale(1) translate(0%, 0%)" />

            </div>
            </PowerPage>

            < PowerPage pageNumber = { 4} totalPages = { TOTAL_PAGES } >
                <div pdfstyles={
        {
            top: '0mm',
                left: '10mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(0.9)',
                }
    }>
        <BeneficiosAllInOne transform = "scale(1) translate(0%, 5%)" />
            </div>
            </PowerPage>




            < PowerPage pageNumber = { 5} totalPages = { TOTAL_PAGES } >
                <div pdfstyles={
        {
            top: '0mm',
                left: '10mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(0.9)',
                }
    }>
        <VentajasActores transform = "scale(1) translate(0%, 5%)" />
            </div>
            </PowerPage>


            < PowerPage pageNumber = { 6} totalPages = { TOTAL_PAGES } >
                <div pdfstyles={
        {
            top: '0mm',
                left: '10mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(0.9)',
                }
    }>
        <RutaImplementacion1 transform="scale(1) translate(0%, 0%)" />
            </div>
            </PowerPage>


            < PowerPage pageNumber = { 7} totalPages = { TOTAL_PAGES } >
                <div pdfstyles={
        {
            top: '0mm',
                left: '10mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(0.9)',
                }
    }>
        <RutaImplementacion2 transform="scale(1) translate(0%, 0%)" />
            </div>
            </PowerPage>

            < PowerPage pageNumber = { 8} totalPages = { TOTAL_PAGES } >
                <div pdfstyles={
        {
            top: '100mm',
                left: '10mm',
                    width: '250mm',
                        height: '200mm',
                            transform: 'scale(0.9)',
            }
    }>
        <ClusterGeneradorResumen />
        </div>
        </PowerPage>










        < PowerPage pageNumber = { 9} totalPages = { TOTAL_PAGES } >
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

        <div style = {
        {
            marginTop: '90mm',
                transform: 'scale(0.99)',
                    transformOrigin: 'bottom center',
                    }
    }>
        <Footer_Energy />
        </div>
        </div>
        </PowerPage>
        </div>
    );
}