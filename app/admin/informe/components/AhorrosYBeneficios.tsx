// AhorrosYBeneficios.tsx
import React from 'react';
import { useConstants } from '../contexts/ConstantsContext';
import EnergyCharts from './EnergyCharts';
import FinancialDetails from './FinancialDetails';
import {
    calculateInvoiceMetrics,
    calculateEnergyCosts,
    calculatePlantMetrics,
    calculateAnnualSavings,
    calculateNetBenefits,
    calculate25YearBenefits,
    generateCashFlowData,
    generateEnergyData
} from './calculations';

const AhorrosYBeneficios: React.FC = () => {
    const { constants } = useConstants();

    // Calcular métricas necesarias
    const invoiceMetrics = calculateInvoiceMetrics(constants);
    const energyCosts = calculateEnergyCosts(invoiceMetrics.monthlyMetrics.netEnergyCost, constants);
    const plantMetrics = calculatePlantMetrics(constants);
    const annualSavings = calculateAnnualSavings(
        plantMetrics,
        energyCosts.energyCostPerKWh,
        invoiceMetrics.annualMetrics.reactivePowerCharges,
        constants
    );
    const netBenefits = calculateNetBenefits(
        annualSavings.totalAnnualSavings,
        plantMetrics.plantCapacityKW,
        invoiceMetrics.annualMetrics.fixedCharges
    );
    const total25YearBenefits = calculate25YearBenefits(netBenefits);

    // Preparar datos para gráficos
    const cashFlowData = generateCashFlowData(netBenefits);
    const energyData = generateEnergyData(plantMetrics);

    return (
        <div className= "mt-8 space-y-6" >
        <EnergyCharts 
                plantCapacityKW={ plantMetrics.plantCapacityKW }
    cashFlowData = { cashFlowData }
    energyData = { energyData }
    total25YearBenefits = { total25YearBenefits }
    netBenefits = { netBenefits }
    invoiceMetrics = { invoiceMetrics }
        />
        <FinancialDetails 
                invoiceMetrics={ invoiceMetrics }
    netBenefits = { netBenefits }
    plantMetrics = { plantMetrics }
        />
        </div>
    );
};

export default AhorrosYBeneficios;
