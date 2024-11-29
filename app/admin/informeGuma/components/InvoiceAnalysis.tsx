// InvoiceAnalysis.tsx
import React from 'react';
import { useConstants } from '../contexts/ConstantsContext';

// Tipos
export type InvoiceMetrics = {
    monthlyMetrics: {
        totalInvoice: number;
        fixedCharges: number;
        reactivePowerCharges: number;
        taxes: number;
        netEnergyCost: number;
    };
    annualMetrics: {
        totalInvoice: number;
        fixedCharges: number;
        reactivePowerCharges: number;
        taxes: number;
        netEnergyCost: number;
    };
};

export type EnergyCosts = {
    energyCostPerKWh: number;
    netEnergyCostPerKWh: number;
};

export type PlantMetrics = {
    plantCapacityKW: number;
    annualGenerationMWh: number;
    selfConsumptionMWh: number;
    gridInjectionMWh: number;
    curtailmentMWh: number;
};

export type AnnualSavings = {
    totalSavingsWithTaxes: number;
    reactivePowerSavings: number;
    totalAnnualSavings: number;
};

export type NetBenefits = {
    duringLeasing: number;
    afterLeasing: number;
};

// Utilidades
const MWhToKWh = (MWh: number): number => MWh * 1000;

const InvoiceAnalysis = {
    calculateInvoiceMetrics: (constants: any): InvoiceMetrics => {
        const exchangeRate = constants.invoice.exchangeRate;
        const monthlyMetrics = {
            totalInvoice: constants.invoice.totalInvoiceAmountPesos / exchangeRate,
            fixedCharges: constants.invoice.fixedChargesPesos / exchangeRate,
            reactivePowerCharges: constants.invoice.reactivePowerChargesPesos / exchangeRate,
            taxes: 0,
            netEnergyCost: 0
        };

        monthlyMetrics.taxes = monthlyMetrics.totalInvoice * (constants.invoice.taxesPercentage / 100);
        monthlyMetrics.netEnergyCost = monthlyMetrics.totalInvoice -
            monthlyMetrics.fixedCharges -
            monthlyMetrics.reactivePowerCharges -
            monthlyMetrics.taxes;

        const annualMetrics = Object.entries(monthlyMetrics).reduce((acc, [key, value]) => ({
            ...acc,
            [key]: value * 12
        }), {} as typeof monthlyMetrics);

        return { monthlyMetrics, annualMetrics };
    },

    calculateEnergyCosts: (monthlyNetEnergyCost: number, constants: any): EnergyCosts => {
        const monthlyConsumption = constants.consumption.annualConsumption / 12;
        const energyCostPerKWh = monthlyNetEnergyCost / monthlyConsumption;
        const netEnergyCostPerKWh = energyCostPerKWh * (1 + constants.invoice.taxesPercentage / 100);
        return { energyCostPerKWh, netEnergyCostPerKWh };
    },

    calculatePlantMetrics: (constants: any): PlantMetrics => ({
        plantCapacityKW: constants.detailedMetrics.capacityMW * 1000,
        annualGenerationMWh: constants.detailedMetrics.valoresAnuales.generacionTotal,
        selfConsumptionMWh: constants.detailedMetrics.valoresAnuales.autoconsumo,
        gridInjectionMWh: constants.detailedMetrics.valoresAnuales.inyeccion,
        curtailmentMWh: constants.detailedMetrics.valoresAnuales.curtailment
    }),

    calculateAnnualSavings: (
        plantMetrics: PlantMetrics,
        energyCostPerKWh: number,
        reactivePowerCharges: number,
        constants: any
    ): AnnualSavings => {
        const selfConsumptionKWh = MWhToKWh(plantMetrics.selfConsumptionMWh);
        const gridInjectionKWh = MWhToKWh(plantMetrics.gridInjectionMWh);

        const selfConsumptionSavings = selfConsumptionKWh * energyCostPerKWh;
        const gridInjectionSavings = gridInjectionKWh * energyCostPerKWh;

        const selfConsumptionTaxSavings = selfConsumptionSavings * (constants.invoice.taxesPercentage / 100);
        const gridInjectionTaxSavings = gridInjectionSavings * (constants.invoice.taxesPercentage / 100);

        const totalEnergySavings = selfConsumptionSavings + gridInjectionSavings;
        const totalTaxSavings = selfConsumptionTaxSavings + gridInjectionTaxSavings;
        const totalSavingsWithTaxes = totalEnergySavings + totalTaxSavings;

        return {
            totalSavingsWithTaxes,
            reactivePowerSavings: reactivePowerCharges,
            totalAnnualSavings: totalSavingsWithTaxes + reactivePowerCharges
        };
    },

    calculateNetBenefits: (
        totalAnnualSavings: number,
        plantCapacityKW: number,
        fixedCharges: number
    ): NetBenefits => {
        const annualLeasingCost = 104000 * (plantCapacityKW / 600);
        return {
            duringLeasing: totalAnnualSavings - annualLeasingCost,
            afterLeasing: totalAnnualSavings - fixedCharges
        };
    },

    calculate25YearBenefits: (netBenefits: NetBenefits): number => {
        const leasingPeriodBenefits = netBenefits.duringLeasing * 6;
        const postLeasingBenefits = netBenefits.afterLeasing * 19;
        return leasingPeriodBenefits + postLeasingBenefits;
    }
};

export default InvoiceAnalysis;
