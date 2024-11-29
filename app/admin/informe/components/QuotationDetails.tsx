"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { TabsProps, TabsListProps, TabsTriggerProps } from '@radix-ui/react-tabs';

interface QuotationData {
    id: number;
    created_at: string;
    status: string;
    technical_data: any[];
    consumption_data: any[];
    power_data: any[];
    invoice_data: any[];
    detailed_metrics: any[];
    plant: {
        client: {
            company_name: string;
        };
        address?: string;
    };
}

const QuotationDetails: React.FC<{ quotation: QuotationData }> = ({ quotation }) => {
    console.log('QuotationDetails received:', {
        id: quotation.id,
        hasPlant: !!quotation.plant,
        technical_length: quotation.technical_data?.length,
        consumption_length: quotation.consumption_data?.length,
    });

    const formatNumber = (value: number | undefined) => {
        if (value === undefined) return '0.00';
        return new Intl.NumberFormat('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(value);
    };

    return (
        <Tabs defaultValue="summary" className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-[#1b1b3a] rounded-3xl p-1 mb-4">
                {[
                    ["summary", "Resumen"],
                    ["technical", "Técnicos"],
                    ["consumption", "Consumo"],
                    ["power", "Potencia"],
                    ["invoice", "Facturación"],
                    ["metrics", "Métricas"]
                ].map(([value, label]) => (
                    <TabsTrigger 
                        key={value}
                        value={value}
                        className="text-white data-[state=active]:bg-blue-600 rounded-3xl"
                    >
                        {label}
                    </TabsTrigger>
                ))}
            </TabsList>

            <div className="bg-[#1b1b3a] rounded-3xl p-6 border border-[#3b3b4f]">
                <TabsContent value="summary">
                    <div className="grid grid-cols-2 gap-6">
                        {[
                            ["Cliente", quotation?.plant?.client?.company_name],
                            ["Dirección", quotation?.plant?.address],
                            ["Estado", 
                                <Badge key="status" className={
                                    `px-4 py-1 rounded-full ${
                                        quotation.status === 'pendiente' ? 'bg-yellow-600/20 text-yellow-400 border-yellow-400/50' :
                                        quotation.status === 'aprobada' ? 'bg-green-600/20 text-green-400 border-green-400/50' :
                                        'bg-red-600/20 text-red-400 border-red-400/50'
                                    }`
                                }>
                                    {quotation?.status?.charAt(0).toUpperCase() + quotation?.status?.slice(1)}
                                </Badge>
                            ],
                            ["Fecha", quotation?.created_at ? new Date(quotation.created_at).toLocaleDateString() : 'No disponible']
                        ].map(([label, value]) => (
                            <div key={label as string} className="bg-[#2b2b4a] p-4 rounded-2xl">
                                <h4 className="text-blue-400 text-sm mb-2">{label}</h4>
                                <p className="text-white">{value || 'No disponible'}</p>
                            </div>
                        ))}
                    </div>
                </TabsContent>

                {['technical', 'consumption', 'power', 'invoice'].map(section => (
                    <TabsContent key={section} value={section}>
                        <div className="grid grid-cols-2 gap-6">
                            {quotation?.[`${section}_data`]?.[0] ?
                                Object.entries(quotation[`${section}_data`][0]).map(([key, value]) => (
                                    <div key={key} className="bg-[#2b2b4a] p-4 rounded-2xl">
                                        <h4 className="text-blue-400 text-sm mb-2">
                                            {key.split('_').map(word =>
                                                word.charAt(0).toUpperCase() + word.slice(1)
                                            ).join(' ')}
                                        </h4>
                                        <p className="text-white">{formatNumber(value as number)}</p>
                                    </div>
                                ))
                                :
                                <div className="text-white">No hay datos disponibles</div>
                            }
                        </div>
                    </TabsContent>
                ))}

                <TabsContent value="metrics">
                    {quotation?.detailed_metrics?.[0] ? (
                        <div className="space-y-8">
                            {[
                                {
                                    title: "Capacidad y Valores Generales",
                                    data: [["Capacidad MW", quotation.detailed_metrics[0]?.capacity_mw]]
                                },
                                {
                                    title: "Valores Anuales",
                                    data: [
                                        ["Generación Total", quotation.detailed_metrics[0]?.total_generation],
                                        ["Autoconsumo", quotation.detailed_metrics[0]?.self_consumption],
                                        ["Inyección", quotation.detailed_metrics[0]?.injection],
                                        ["Curtailment", quotation.detailed_metrics[0]?.curtailment]
                                    ]
                                },
                                {
                                    title: "Porcentajes",
                                    data: [
                                        ["Ahorro Total", quotation.detailed_metrics[0]?.ahorro_total, true],
                                        ["Autoconsumo", quotation.detailed_metrics[0]?.autoconsumo, true],
                                        ["Inyección", quotation.detailed_metrics[0]?.inyeccion, true],
                                        ["Curtailment", quotation.detailed_metrics[0]?.curtailment_percentage, true]
                                    ]
                                }
                            ].map(section => (
                                <div key={section.title}>
                                    <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
                                    <div className="grid grid-cols-2 gap-6">
                                        {section.data.map(([label, value, isPercentage]) => (
                                            <div key={label as string} className="bg-[#2b2b4a] p-4 rounded-2xl">
                                                <h4 className="text-blue-400 text-sm mb-2">{label}</h4>
                                                <p className="text-white">
                                                    {formatNumber(value as number)}{isPercentage ? ' %' : ''}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-white">No hay métricas detalladas disponibles</div>
                    )}
                </TabsContent>
            </div>
        </Tabs>
    );
};

export default QuotationDetails;