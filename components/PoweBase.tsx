import React from 'react';
import PowerPage from './PowerPage';
import { cn } from "@/lib/utils";
import FinancingAdvantages from './Pages/FinancingAdvanges';
import CatamarcaPotential from './Pages/CatamarcaPotencial';
import PowerHero from './Hero-AllInOnePower';
import Footer_Energy from '@/components/Footer-EnergyPDF';
import ExecutiveIntro from '@/components/dashboard/GlobalIntro';
import Opcion1 from './Pages/ENERSA_opcion1';
import Opcion2 from './Pages/ENERSA_opcion2';
import Opcion3 from './Pages/ENERSA_opcion3';
import Opcion4 from './Pages/ENERSA_opcion4';
import BeneficiosBISAllInOne from './Pages/ENERSA_BeneficiosBISAllInOne';
//import ResumenEjecutivo from './Pages/ENERSA_ResumenEjecutivo';
import FinancialAnalysisTable from './Pages/AuxDPA';
const TOTAL_PAGES = 8;

export default function PowerContent({ initialScenarios, initialQueryParams }) {


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
            top: '0mm',
                left: '10mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(0.9)',
                }
    }>

        <BeneficiosBISAllInOne />
        </div>
        </PowerPage>

        < PowerPage pageNumber = { 3} totalPages = { TOTAL_PAGES } >
            <div pdfstyles={
        {
            top: '0mm',
                left: '10mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(0.9)',
                }
    }>
        
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
        <Opcion1 />
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
        <Opcion2 />
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
        <Opcion3 />
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
        <Opcion4 />
        </div>
        </PowerPage>










        < PowerPage pageNumber = { 8} totalPages = { TOTAL_PAGES } >
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