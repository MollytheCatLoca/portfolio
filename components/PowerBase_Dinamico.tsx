import React from 'react';
import dynamic from 'next/dynamic';
import PowerPage from './PowerPage';
import Footer_Energy from '@/components/Footer-EnergyPDF';
import clusterData from '@/data/ClusterPPT_Data.json';

// Importaciones dinámicas para evitar problemas de SSR
const PowerHero_Cluster = dynamic(() => import('./PowerHero_Cluster'), { ssr: false });
const ResumenEjecutivo_Cluster = dynamic(() => import('./Pages/ResumenEjecutivo_Cluster'), { ssr: false });
const BeneficiosAllInOne_Cluster = dynamic(() => import('./Pages/BeneficiosAllInOne_Cluster'), { ssr: false });
const VentajasActores_Cluster = dynamic(() => import('./Pages/VentajasActores_Cluster'), { ssr: false });
const RutaImplementacion_Cluster = dynamic(() => import('./Pages/RutaImplementacion_Cluster'), { ssr: false });
const ClusterGeneradorResumen_Dynamic = dynamic(() => import('./Pages/ClusterGeneradorResumen_Dynamic'), { ssr: false });

const TOTAL_PAGES = 8;

// Constante para la localidad seleccionada
const SELECTED_LOCATION = 'Cluster'; // Cambia esto a 'SanPedro' cuando sea necesario

interface ClusterData {
    nombre: string;
    heroSection: any;
    resumenEjecutivo: any;
    beneficiosAllInOne: any;
    ventajasActores: any;
    rutaImplementacion: any;
    clusterGeneradorResumen: any;
}

const PowerContent_Dynamic: React.FC = () => {
    console.log("Selected Location:", SELECTED_LOCATION);
    console.log("Available locations in data:", Object.keys(clusterData));

    const data = clusterData[SELECTED_LOCATION as keyof typeof clusterData] as ClusterData;

    if (!data) {
        console.error(`Data not available for location: ${SELECTED_LOCATION}`);
        return <div>Datos no disponibles para la localidad seleccionada: { SELECTED_LOCATION } </div>;
    }

    console.log("Data structure for selected location:", JSON.stringify(data, null, 2));

    const renderComponent = (Component: React.ComponentType<any>, props: any, name: string) => {
        if (!Component) {
            console.error(`Component ${name} is undefined`);
            return <div>Error: Component { name } not found </div>;
        }
        try {
            return <Component { ...props } />;
        } catch (error) {
            console.error(`Error rendering ${name}:`, error);
            return <div>Error rendering { name } </div>;
        }
    };

    return (
        <div className= "pdf-container font-sans text-xs leading-tight text-white bg-[#121212]" >
        <PowerPage pageNumber={ 1 } totalPages = { TOTAL_PAGES } >
            <div style={
        {
            top: '0mm',
                left: '10mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(0.9)',
        }
    }>
        { renderComponent(PowerHero_Cluster, { data }, 'PowerHero_Cluster') }
        </div>
        </PowerPage>

        < PowerPage pageNumber = { 2} totalPages = { TOTAL_PAGES } >
            <div style={
        {
            top: '0mm',
                left: '0mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(1)',
        }
    }>
        { renderComponent(ResumenEjecutivo_Cluster, { data, transform: "scale(1) translate(0%, 0%)" }, 'ResumenEjecutivo_Cluster') }
        </div>
        </PowerPage>

        < PowerPage pageNumber = { 3} totalPages = { TOTAL_PAGES } >
            <div style={
        {
            top: '0mm',
                left: '10mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(0.9)',
        }
    }>
        { renderComponent(BeneficiosAllInOne_Cluster, { data, transform: "scale(1) translate(0%, 5%)" }, 'BeneficiosAllInOne_Cluster') }
        </div>
        </PowerPage>

        < PowerPage pageNumber = { 4} totalPages = { TOTAL_PAGES } >
            <div style={
        {
            top: '0mm',
                left: '10mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(0.9)',
        }
    }>
        { renderComponent(VentajasActores_Cluster, { data, transform: "scale(1) translate(0%, 5%)" }, 'VentajasActores_Cluster') }
        </div>
        </PowerPage>

        < PowerPage pageNumber = { 5} totalPages = { TOTAL_PAGES } >
            <div style={
        {
            top: '0mm',
                left: '10mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(0.9)',
        }
    }>
        { renderComponent(RutaImplementacion_Cluster, { data, part: 1, transform: "scale(1) translate(0%, 0%)" }, 'RutaImplementacion_Cluster_1') }
        </div>
        </PowerPage>

        < PowerPage pageNumber = { 6} totalPages = { TOTAL_PAGES } >
            <div style={
        {
            top: '0mm',
                left: '10mm',
                    width: '250mm',
                        height: '290mm',
                            transform: 'scale(0.9)',
        }
    }>
        { renderComponent(RutaImplementacion_Cluster, { data, part: 2, transform: "scale(1) translate(0%, 0%)" }, 'RutaImplementacion_Cluster_2') }
        </div>
        </PowerPage>

        < PowerPage pageNumber = { 7} totalPages = { TOTAL_PAGES } >
            <div style={
        {
            top: '100mm',
                left: '10mm',
                    width: '250mm',
                        height: '200mm',
                            transform: 'scale(0.9)',
        }
    }>
        { renderComponent(ClusterGeneradorResumen_Dynamic, { data }, 'ClusterGeneradorResumen_Dynamic') }
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
        <div style={
        {
            marginTop: '90mm',
                transform: 'scale(0.99)',
                    transformOrigin: 'bottom center',
          }
    }>
        { renderComponent(Footer_Energy, { location: data.nombre }, 'Footer_Energy')
}
</div>
    </div>
    </PowerPage>
    </div>
  );
};

export default PowerContent_Dynamic;