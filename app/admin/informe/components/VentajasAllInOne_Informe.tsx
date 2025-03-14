import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { DollarSign, Building, Shield, FileText, CheckCircle, Briefcase, Zap } from 'lucide-react';
import { ventajasAllinOneData } from '../data/constants_pdf';

const VentajasAllinOne_Informe = () => {
    const { title, ventajas, beneficios } = ventajasAllinOneData;
    // Omitimos la descripción para reducir el espacio

    return (
        <div className="bg-gradient-to-b from-[#0A0F1C] to-[#111827] p-3 text-white max-w-5xl mx-auto rounded-lg shadow-xl border border-[#1F2937]/30">
            {/* Encabezado simplificado */}
            <div className="mb-2">
                <h2 className="text-lg font-light tracking-wide mb-1">
                    <span className="text-emerald-400 font-semibold">{title.split(' ')[0]}</span>{' '}
                    <span className="text-blue-200">{title.split(' ').slice(1).join(' ')}</span>
                </h2>
            </div>

            {/* Beneficios comprimidos en una fila */}
            <Card className="bg-gradient-to-r from-[#111827] to-[#141e33] border-[#1F2937] shadow-md mb-3">
                <CardHeader className="py-1.5 px-3 border-b border-[#1F2937] flex items-center">
                    <Shield className="h-3.5 w-3.5 text-emerald-400 mr-2" />
                    <CardTitle className="text-xs">
                        <span className="text-emerald-400 font-medium">Beneficios Clave</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-2">
                    <ul className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {/* Filtramos o condensamos beneficios si es necesario */}
                        {beneficios
                            .filter(b => !b.includes("ONs") && !b.includes("SGR")) // Filtrar los que contienen ONs o SGR
                            .map((benefit, index) => (
                                <li 
                                    key={index} 
                                    className="flex items-start bg-[#0A0F1C]/70 rounded-md p-1.5 border border-[#1F2937]/50"
                                >
                                    <CheckCircle className="h-3 w-3 text-emerald-500 mr-1.5 mt-0.5 flex-shrink-0" />
                                    <span className="text-[10px] text-gray-300 leading-tight">
                                        {benefit}
                                    </span>
                                </li>
                            ))}
                    </ul>
                </CardContent>
            </Card>

            {/* Ventajas en Grid comprimidas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ventajas.map((ventaja, index) => {
                    // Filtrar o simplificar detalles que mencionan ONs o SGR
                    const filteredDetails = ventaja.details.filter(
                        d => !d.includes("ONs") && !d.includes("SGR")
                    );
                    
                    // Si hay detalles después del filtrado, renderizar la tarjeta
                    if (filteredDetails.length > 0) {
                        return (
                            <VentajaCard 
                                key={index} 
                                icon={getIcon(ventaja.icon)}
                                title={ventaja.title}
                                details={filteredDetails}
                                index={index}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

const VentajaCard = ({ icon, title, details, index }) => {
    // Array de gradientes para variar los colores
    const gradients = [
        "from-emerald-500/20 to-blue-500/10",
        "from-blue-500/20 to-purple-500/10",
        "from-teal-500/20 to-emerald-500/10",
        "from-purple-500/20 to-blue-500/10",
    ];
    
    // Seleccionar un gradiente basado en el índice
    const gradient = gradients[index % gradients.length];
    
    return (
        <Card className="bg-gradient-to-br from-[#111827] to-[#0e131f] border-[#1F2937]/70 shadow-md overflow-hidden">
            <CardHeader className="flex flex-row items-center py-1.5 px-3 border-b border-[#1F2937]">
                <div className={`p-1 bg-gradient-to-br ${gradient} rounded-md mr-2`}>
                    {React.cloneElement(icon, {
                        className: "h-3.5 w-3.5 text-emerald-400"
                    })}
                </div>
                <CardTitle className="text-xs">
                    <span className="text-emerald-400 font-medium">{title.split(' ')[0]}</span>{' '}
                    <span className="text-blue-200 font-light">{title.split(' ').slice(1).join(' ')}</span>
                </CardTitle>
            </CardHeader>
            
            <CardContent className="p-2">
                <ul className="space-y-1">
                    {details.map((detail, idx) => (
                        <li 
                            key={idx} 
                            className="flex items-start bg-[#0A0F1C]/50 rounded-md p-1.5 border border-[#1F2937]/50"
                        >
                            <CheckCircle className="h-2.5 w-2.5 text-emerald-500 flex-shrink-0 mr-1 mt-0" />
                            <span className="text-[10px] text-gray-300 leading-tight">
                                {detail}
                            </span>
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};

const getIcon = (iconName) => {
    const iconMap = {
        DollarSign: <DollarSign />,
        Building: <Building />,
        Shield: <Shield />,
        FileText: <FileText />,
        Zap: <Zap />,
        Briefcase: <Briefcase />
    };

    return iconMap[iconName] || <DollarSign />;
};

export default VentajasAllinOne_Informe;