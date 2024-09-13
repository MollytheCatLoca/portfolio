import React from 'react';
import { GlobeIcon, MailIcon, PhoneIcon } from 'lucide-react';

const HEADER_HEIGHT = '30mm';
const FOOTER_HEIGHT = '20mm';
const LOGO_SIZE = '20mm';
const TITLE_FONT_SIZE = '16px';
const SUBTITLE_FONT_SIZE = '14px';
const FOOTER_FONT_SIZE = '10px';

type PDFHeaderFooterProps = {
    pageNumber: number;
    totalPages: number;
};

const PDFHeaderFooter: React.FC<PDFHeaderFooterProps> = ({ pageNumber, totalPages }) => {
    return (
        <>
        {/* Header */ }
        < div style = {{
        position: 'absolute',
            top: 0,
                left: 0,
                    right: 0,
                        height: HEADER_HEIGHT,
                            width: '100%',
                                backgroundColor: 'rgba(17, 25, 40, 0.75)',
                                    borderBottom: '1px solid rgba(255, 255, 255, 0.125)',
                                        display: 'flex',
                                            alignItems: 'center',
                                                justifyContent: 'space-between',
                                                    padding: '0 10mm',
                                                        boxSizing: 'border-box',
                                                            zIndex: 1000,
            }
}>
    <div style={ { flex: 1, display: 'flex', alignItems: 'center' } }>
        <img src="/BISLogo.svg" alt = "Logo" style = {{ height: LOGO_SIZE }} />
            < h1 style = {{ fontSize: TITLE_FONT_SIZE, color: 'white', margin: '0 0 0 10mm' }}> Informe del Parque Solar </h1>
                </div>
                < div style = {{ textAlign: 'right' }}>
                    <h2 style={ { fontSize: SUBTITLE_FONT_SIZE, color: 'white', margin: 0 } }> Simulación de Escenarios </h2>
                        < h3 style = {{ fontSize: SUBTITLE_FONT_SIZE, color: 'white', margin: 0 }}> Parque Solar </h3>
                            </div>
                            </div>

{/* Footer */ }
<div style={
    {
        position: 'absolute',
            bottom: 0,
                left: 0,
                    right: 0,
                        height: FOOTER_HEIGHT,
                            width: '100%',
                                backgroundColor: 'rgba(17, 25, 40, 0.75)',
                                    borderTop: '1px solid rgba(255, 255, 255, 0.125)',
                                        display: 'flex',
                                            alignItems: 'center',
                                                justifyContent: 'space-between',
                                                    padding: '0 10mm',
                                                        boxSizing: 'border-box',
                                                            fontSize: FOOTER_FONT_SIZE,
                                                                color: 'white',
                                                                    zIndex: 1000,
            }
}>
    <div>BIS Integraciones </div>
        < div style = {{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span><GlobeIcon size={ 12 } style = {{ marginRight: '5px' }} /> www.bisintegraciones.com</span >
                <span><MailIcon size={ 12 } style = {{ marginRight: '5px' }} /> contacto@bisintegraciones.com</span >
                    <span><PhoneIcon size={ 12 } style = {{ marginRight: '5px' }} /> +54 9 11 5121 3012</span >
                        </div>
                        < div > Página { pageNumber } de { totalPages } </div>
                            </div>
                            </>
    );
};

export default PDFHeaderFooter;