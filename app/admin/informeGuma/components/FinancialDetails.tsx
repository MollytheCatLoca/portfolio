import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { InvoiceMetrics, NetBenefits, PlantMetrics } from './InvoiceAnalysis';
import {
    calculateFirstInvoiceAnnual,
    calculateAnnualLeasingCost,
    calculateTotalLeasingPeriod,
    calculatePostLeasingPeriod,
    formatFixedCharges
} from './calculations';

interface FinancialDetailsProps {
    invoiceMetrics: InvoiceMetrics;
    netBenefits: NetBenefits;
    plantMetrics: PlantMetrics;
}

const FinancialDetails: React.FC<FinancialDetailsProps> = ({
    invoiceMetrics,
    netBenefits,
    plantMetrics
}) => {
    return (
        <div className= "grid grid-cols-1 lg:grid-cols-2 gap-6" >
        <Card className="bg-black-200 border-gray-800" >
            <CardHeader>
            <CardTitle className="text-gray-300" > Período de Leasing(6 años) </CardTitle>
                </CardHeader>
                < CardContent >
                <div className="space-y-4" >
                    <div className="flex justify-between items-center py-2 border-b border-gray-800" >
                        <span className="text-gray-400" > Primera Factura Anual </span>
                            < span className = "text-white font-medium" >
                                { calculateFirstInvoiceAnnual(invoiceMetrics) }
                                </span>
                                </div>
                                < div className = "flex justify-between items-center py-2 border-b border-gray-800" >
                                    <span className="text-gray-400" > Costo Anual Leasing </span>
                                        < span className = "text-white font-medium" >
                                            { calculateAnnualLeasingCost(plantMetrics) }
                                            </span>
                                            </div>
                                            < div className = "flex justify-between items-center py-2 bg-gray-900 px-3 rounded-lg" >
                                                <span className="text-gray-300" > Total Período Leasing </span>
                                                    < span className = "text-green-400 font-bold" >
                                                        { calculateTotalLeasingPeriod(netBenefits) }
                                                        </span>
                                                        </div>
                                                        </div>
                                                        </CardContent>
                                                        </Card>

                                                        < Card className = "bg-black-200 border-gray-800" >
                                                            <CardHeader>
                                                            <CardTitle className="text-gray-300" > Período Post - Leasing(19 años) </CardTitle>
                                                                </CardHeader>
                                                                < CardContent >
                                                                <div className="space-y-4" >
                                                                    <div className="flex justify-between items-center py-2 border-b border-gray-800" >
                                                                        <span className="text-gray-400" > Beneficio Neto Anual </span>
                                                                            < span className = "text-white font-medium" >
                                                                                { netBenefits.afterLeasing.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) }
                                                                                </span>
                                                                                </div>
                                                                                < div className = "flex justify-between items-center py-2" >
                                                                                    <span className="text-gray-400" > Cargos Fijos Anuales </span>
                                                                                        < span className = "text-white font-medium" >
                                                                                            { formatFixedCharges(invoiceMetrics) }
                                                                                            </span>
                                                                                            </div>
                                                                                            < div className = "flex justify-between items-center py-2 bg-gray-900 px-3 rounded-lg" >
                                                                                                <span className="text-gray-300" > Total Período Post - Leasing </span>
                                                                                                    < span className = "text-green-400 font-bold" >
                                                                                                        { calculatePostLeasingPeriod(netBenefits) }
                                                                                                        </span>
                                                                                                        </div>
                                                                                                        </div>
                                                                                                        </CardContent>
                                                                                                        </Card>
                                                                                                        </div>
    );
};

export default FinancialDetails;
