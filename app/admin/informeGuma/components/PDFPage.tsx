import React from 'react';

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
        backgroundColor: '#0a0b14',
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
                    <div style={ { fontSize: '14px', color: '#8a3ab4' } }> Informe Tecnico y Economico </div>
                        < div style = {{ fontSize: '12px' }}> BIS - PVSist V1.1 </div>
                            </div>
                            </div>

{/* Content Layer */ }
<div style={
    {
        position: 'absolute',
            top: '22mm',
                left: '0mm',
                    right: '10mm',
                        bottom: '15mm',
                            zIndex: 5,
                                display: 'flex',
        }
}>
    {/* Sección Principal (2/3) */ }
    < div style = {{
    flex: 2,
        paddingRight: '5mm',
            backgroundColor: '#131825',
                borderRadius: '8px',
                    padding: '10mm',
            }}>
    { children }
    </div>

{/* Sección de Texto (1/3) */ }
<div style={
    {
        flex: 1,
            paddingLeft: '5mm',
                backgroundColor: '#1a1e2e',
                    borderRadius: '8px',
                        padding: '10mm',
                            color: '#e1e1e1',
            }
}>
    {/* Aquí puedes añadir el texto que quieras como props o hardcoded */ }
    </div>
    </div>

{/* Footer Layer */ }
<div style={
    {
        position: 'absolute',
            bottom: 0,
                left: 0,
                    right: 0,
                        height: '15mm',
                            backgroundColor: '#111928',
                                zIndex: 100,
                                    display: 'flex',
                                        justifyContent: 'space-between',
                                            alignItems: 'center',
                                                padding: '0 10mm',
                                                    color: 'white',
                                                        fontSize: '10px',
                                                            overflow: 'hidden'
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
