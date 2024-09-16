import React from 'react';
import { cn } from "@/lib/utils";

type PDFPageProps = {
    children: React.ReactNode;
    pageNumber: number;
    totalPages: number;
};

const PDFPage: React.FC<PDFPageProps> = ({ children, pageNumber, totalPages }) => (
    <div style= {{
        width: '297mm',
        height: '210mm',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#0a0b14', // Color de fondo oscuro base
        pageBreakAfter: 'always',
    }}>
        {/* Gradientes de fondo */ }
        < div style = {{
    position: 'absolute',
        top: '-20%',
            left: '-10%',
                width: '50%',
                    height: '50%',
                        background: 'radial-gradient(circle, rgba(64,58,180,0.2) 0%, rgba(0,0,0,0) 70%)',
                            zIndex: 1,
        }}/>
    < div style = {{
    position: 'absolute',
        bottom: '-20%',
            right: '-10%',
                width: '50%',
                    height: '50%',
                        background: 'radial-gradient(circle, rgba(138,58,180,0.2) 0%, rgba(0,0,0,0) 70%)',
                            zIndex: 1,
        }}/>

{/* Header Layer */ }
<div style={
    {
        position: 'absolute',
            top: 0,
                left: 0,
                    right: 0,
                        height: '20mm',
                            backgroundColor: 'rgba(17, 25, 40, 0.75)',
                                zIndex: 10,
                                    display: 'flex',
                                        justifyContent: 'space-between',
                                            alignItems: 'center',
                                                padding: '0 10mm',
                                                    color: 'white',
        }
}>
    <div style={ { display: 'flex', alignItems: 'center' } }>
        <img src="/BISLogo.svg" alt = "BIS Logo" style = {{ height: '20mm', marginRight: '5mm', marginTop: '3mm' }} />
            < span style = {{ fontSize: '16px' }}> Parques Solares </span>
                </div>
                < div style = {{ textAlign: 'right' }}>
                    <div style={ { fontSize: '14px', color: '#8a3ab4' } }> Simulación de Escenarios </div>
                        < div style = {{ fontSize: '12px' }}> BIS - PVSist V1.1 </div>
                            </div>
                            </div>

{/* Content Layer */ }
<div style={
    {
        position: 'absolute',
            top: '5mm',
                left: 0,
                    right: 0,
                        bottom: '10mm',
                            zIndex: 5,
                                overflow: 'hidden',
                                    padding: '10mm',
                                        transform: 'scale(0.8)',
        }
}>
    { children }
    </div>

{/* Footer Layer */ }
<div style={
    {
        position: 'absolute',
            bottom: 0,
                left: 0,
                    right: 0,
                        height: '15mm',
                            backgroundColor: 'rgba(17, 25, 40, 0.75)',
                                zIndex: 10,
                                    display: 'flex',
                                        justifyContent: 'space-between',
                                            alignItems: 'center',
                                                padding: '0 10mm',
                                                    color: 'white',
                                                        fontSize: '10px',
        }
}>
    <span>BIS Integraciones </span>
        < div >
        <span>www.bisintegraciones.com </span>
        < span style = {{ margin: '0 10px' }}> contacto@bisintegraciones.com</span>
            < span > +54 9 11 5121 3012 </span>
                </div>
                < span > Página { pageNumber } de { totalPages } </span>
                    </div>
                    </div>
);

export default PDFPage;