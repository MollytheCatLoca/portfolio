// hooks/useSummaryData.js
import { useConstants } from '../contexts/ConstantsContext';

export const useSummaryData = (
    consumptionData,
    invoiceData,
    monthlyConsumptions,
    detailedMetrics
) => {
    const { constants } = useConstants();

    // Calculamos los datos necesarios para el PowerSummary
    const calculateSummaryData = () => {
        if (!constants || !consumptionData || !invoiceData || !detailedMetrics) {
            return {
                plantMetrics: {
                    selfConsumptionPercentage: 0,
                    plantCapacityKW: 0,
                    annualGenerationMWh: 0
                },
                monthlyMetrics: {
                    totalInvoice: 0,
                    fixedCharges: 0
                },
                netBenefits: {
                    duringLeasing: 0,
                    afterLeasing: 0
                }
            };
        }

        return {
            plantMetrics: {
                selfConsumptionPercentage: detailedMetrics?.selfConsumptionPercentage || 0,
                plantCapacityKW: detailedMetrics?.plantCapacityKW || 0,
                annualGenerationMWh: detailedMetrics?.annualGenerationMWh || 0
            },
            monthlyMetrics: {
                totalInvoice: invoiceData?.totalInvoiceAmountPesos || 0,
                fixedCharges: invoiceData?.fixedChargesPesos || 0
            },
            netBenefits: {
                duringLeasing: detailedMetrics?.duringLeasingBenefit || 0,
                afterLeasing: detailedMetrics?.afterLeasingBenefit || 0
            }
        };
    };

    // Función de formateo de moneda
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    return {
        summaryData: calculateSummaryData(),
        formatCurrency
    };
};