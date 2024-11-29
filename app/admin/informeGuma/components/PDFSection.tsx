import React from 'react';

type PDFSectionProps = {
    children: React.ReactNode;
    sectionTitle: string;
};

const PDFSection: React.FC<PDFSectionProps> = ({ children, sectionTitle }) => (
    <div style= {{
        width: '277mm', // Ajuste para caber dentro de PDFPage
        padding: '6mm',
        margin: '1mm 0',
        backgroundColor: '#0a0b14', // Color base de fondo
        position: 'relative',
        overflow: 'hidden',
        borderRadius: '5px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.15)',
    }}>
        {/* Gradientes de fondo */ }
        < div style = {{
    position: 'absolute',
        top: '-15%',
            left: '-15%',
                width: '45%',
                    height: '45%',
                        background: 'radial-gradient(circle, rgba(64,58,180,0.2) 0%, rgba(0,0,0,0) 70%)',
                            zIndex: 1,
        }}/>
    < div style = {{
    position: 'absolute',
        bottom: '-15%',
            right: '-15%',
                width: '45%',
                    height: '45%',
                        background: 'radial-gradient(circle, rgba(138,58,180,0.2) 0%, rgba(0,0,0,0) 70%)',
                            zIndex: 1,
        }}/>

{/* Header de la Sección */ }
<div style={
    {
        position: 'absolute',
            top: 0,
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
        }
}>
    <h2 style={ { fontSize: '16px', color: '#8a3ab4', margin: 0 } }> { sectionTitle } </h2>
        </div>

{/* Contenido Principal */ }
<div style={
    {
        position: 'relative',
            zIndex: 2,
                marginTop: '10mm', // Margen para separar el header de la sección
                    color: '#e1e1e1',
                        fontSize: '10px',
                            lineHeight: '1.5',
        }
}>
    { children }
    </div>
    </div>
);

export default PDFSection;
