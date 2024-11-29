import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Building, Shield, FileText, CheckCircle } from 'lucide-react';
import { ventajasAllinOneData } from '../data/constants_pdf';

const VentajasAllinOne_Informe = () => {
    const { title, descripcion, ventajas, beneficios } = ventajasAllinOneData;

    return (
        <div className= "bg-[#0A0F1C] p-4 text-white max-w-5xl mx-auto" >
        <div className="mb-3" >
            <h2 className="text-2xl font-light tracking-wide" >
                <span className="text-emerald-400 font-medium" > { title.split(' ')[0] } </span>{' '}
                    < span className = "text-blue-200" > { title.split(' ').slice(1).join(' ') } </span>
                        </h2>
                        < p className = "text-xs text-gray-400 leading-relaxed max-w-3xl" >
                            { descripcion }
                            </p>
                            </div>

    {/* Beneficios Primero */ }
    <Card className="bg-[#111827] border-[#1F2937] shadow-xl mb-3" >
        <CardHeader className="flex flex-row items-center space-x-2 p-3 border-b border-[#1F2937]" >
            <Shield className="h-5 w-5 text-emerald-500" />
                <CardTitle className="text-base" >
                    <span className="text-emerald-400 font-medium" > Beneficios </span>{' '}
                        < span className = "text-blue-200 font-light" > Clave de la Estructura Modular </span>
                            </CardTitle>
                            </CardHeader>
                            < CardContent className = "p-3" >
                                <ul className="grid grid-cols-2 md:grid-cols-3 gap-2" >
                                {
                                    beneficios.map((benefit, index) => (
                                        <li key= { index } className = "flex items-start group bg-[#0A0F1C]/50 rounded-md p-2" >
                                        <CheckCircle className="h-3.5 w-3.5 text-emerald-500 mr-2 mt-0.5 flex-shrink-0 group-hover:text-emerald-400 transition-colors" />
                                    <span className="text-[11px] text-gray-300 group-hover:text-gray-200 transition-colors leading-tight" >
                                    { benefit }
                                    </span>
                                    </li>
                                    ))
                                }
                                    </ul>
                                    </CardContent>
                                    </Card>

    {/* Ventajas en Grid */ }
    <div className="grid grid-cols-2 gap-3" style = {{ transform: 'scale(0.9)' }
}>
{
    ventajas.map((ventaja, index) => (
        <VentajaCard 
            key= { index } 
            icon = { getIcon(ventaja.icon)
}
title = { ventaja.title }
description = { ventaja.description }
details = { ventaja.details }
    />
        ))}
</div>
    </div>
  );
};

const VentajaCard = ({ icon, title, description, details }) => (
    <Card className= "bg-[#111827] border-[#1F2937] shadow-xl" >
    <CardHeader className="flex flex-row items-center space-x-2 p-2 border-b border-[#1F2937]" >
    {
        React.cloneElement(icon, {
            className: "h-4 w-4 text-emerald-500"
        })
    }
        < CardTitle className = "text-sm" >
            <span className="text-emerald-400 font-medium" > { title.split(' ')[0] } </span>{' '}
                < span className = "text-blue-200 font-light" > { title.split(' ').slice(1).join(' ') } </span>
                    </CardTitle>
                    </CardHeader>
                    < CardContent className = "p-2" >
                        <p className="text-[11px] text-gray-400 mb-2 leading-relaxed" > { description } </p>
                            < ul className = "space-y-1.5" >
                            {
                                details.map((detail, index) => (
                                    <li key= { index } className = "flex items-start group bg-[#0A0F1C]/50 rounded-md p-1.5" >
                                    <CheckCircle className="h-3 w-3 text-emerald-500 mr-2 mt-0.5 flex-shrink-0 group-hover:text-emerald-400 transition-colors" />
                                <span className="text-[11px] text-gray-300 group-hover:text-gray-200 transition-colors leading-tight" >
                                { detail }
                                </span>
                                </li>
                                ))
                            }
                                </ul>
                                </CardContent>
                                </Card>
);

const getIcon = (iconName) => {
    const iconMap = {
        DollarSign: <DollarSign />,
    Building: <Building />,
    Shield: <Shield />,
    FileText: <FileText />,
    };

    return iconMap[iconName] || <DollarSign />;
};

export default VentajasAllinOne_Informe;