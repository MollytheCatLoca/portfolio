'use client';

import React, { useState } from 'react';
import { Receipt, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConstants } from '../contexts/ConstantsContext';

const InvoiceDataFormLargeCompany: React.FC = () => {
    const { constants, updateInvoiceConstantGuma, isLoading: contextLoading, error: contextError } = useConstants();
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [localValues, setLocalValues] = useState({
        exchangeRate: constants.invoiceGuma?.exchangeRate || 0,
        totalInvoiceAmountDollars: constants.invoiceGuma?.totalInvoiceAmountDollars || 0,
        taxesNonRecoverable: constants.invoiceGuma?.taxesNonRecoverable || 0,
        nonAbsorbableTaxes: constants.invoiceGuma?.nonAbsorbableTaxes || 0,
        fixedChargesAnnualDollars: constants.invoiceGuma?.fixedChargesAnnualDollars || 0,
        reactivePowerChargesDollars: constants.invoiceGuma?.reactivePowerChargesDollars || 0,
        energyPricePerMW: constants.invoiceGuma?.energyPricePerMW || 0
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!localValues.exchangeRate) {
            newErrors.exchangeRate = 'El tipo de cambio es requerido';
        } else if (localValues.exchangeRate <= 0) {
            newErrors.exchangeRate = 'El tipo de cambio debe ser mayor a 0';
        }

        if (!localValues.totalInvoiceAmountDollars) {
            newErrors.totalInvoiceAmountDollars = 'El monto total es requerido';
        } else if (localValues.totalInvoiceAmountDollars < 0) {
            newErrors.totalInvoiceAmountDollars = 'El monto no puede ser negativo';
        }

        if (!localValues.taxesNonRecoverable) {
            newErrors.taxesNonRecoverable = 'Los impuestos no recuperables son requeridos';
        } else if (localValues.taxesNonRecoverable < 0 || localValues.taxesNonRecoverable > 100) {
            newErrors.taxesNonRecoverable = 'El porcentaje debe estar entre 0 y 100';
        }

        if (!localValues.nonAbsorbableTaxes) {
            newErrors.nonAbsorbableTaxes = 'Los impuestos no absorbibles son requeridos';
        } else if (localValues.nonAbsorbableTaxes < 0 || localValues.nonAbsorbableTaxes > 100) {
            newErrors.nonAbsorbableTaxes = 'El porcentaje debe estar entre 0 y 100';
        }

        if (!localValues.fixedChargesAnnualDollars) {
            newErrors.fixedChargesAnnualDollars = 'Los cargos fijos anuales son requeridos';
        } else if (localValues.fixedChargesAnnualDollars < 0) {
            newErrors.fixedChargesAnnualDollars = 'Los cargos no pueden ser negativos';
        }

        if (!localValues.energyPricePerMW) {
            newErrors.energyPricePerMW = 'El precio de la energía es requerido';
        } else if (Number(localValues.energyPricePerMW.toString().replace(/,/g, '')) <= 0) {
            newErrors.energyPricePerMW = 'El precio debe ser mayor a 0';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSaving(true);
            try {
                const updatedDataG = {
                    invoiceGuma: {
                        exchangeRate: Number(localValues.exchangeRate),
                        totalInvoiceAmountDollars: Number(localValues.totalInvoiceAmountDollars),
                        taxesNonRecoverable: Number(localValues.taxesNonRecoverable),
                        nonAbsorbableTaxes: Number(localValues.nonAbsorbableTaxes),
                        fixedChargesAnnualDollars: Number(localValues.fixedChargesAnnualDollars),
                        reactivePowerChargesDollars: Number(localValues.reactivePowerChargesDollars),
                        energyPricePerMW: Number(localValues.energyPricePerMW.toString().replace(/,/g, ''))
                    }
                };

                await updateInvoiceConstantGuma("invoiceGuma", updatedDataG.invoiceGuma);
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 3000);
            } catch (err) {
                console.error('Error saving invoice data:', err);
                setErrors(prev => ({
                    ...prev,
                    submit: 'Error al guardar los datos'
                }));
            } finally {
                setIsSaving(false);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setLocalValues(prev => ({
            ...prev,
            [name]: name === 'energyPricePerMW' ? value : Number(value.replace(/,/g, ''))
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    if (contextLoading) {
        return (
            <div className= "flex items-center justify-center h-40" >
            <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                </div>
        );
    }

return (
    <div className= "w-full max-w-2xl mx-auto p-4 md:p-8 rounded-3xl" style = {{ backdropFilter: "blur(16px) saturate(180%)", backgroundColor: "rgba(17, 25, 40, 0.75)", border: "1px solid rgba(255, 255, 255, 0.125)" }}>
        <div className="flex items-center gap-2 mb-6" >
            <Receipt className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white" > Costos Electricidad GUMA </h2>
                    </div>

{
    (contextError || errors.submit) && (
        <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 rounded-3xl text-sm mb-6" >
            { contextError || errors.submit
}
</div>
            )}

{
    showSuccess && (
        <div className="bg-green-900/50 border border-green-500/50 text-green-200 px-4 py-3 rounded-3xl text-sm mb-6" >
            Datos de factura guardados correctamente
                </div>
            )
}

<form onSubmit={ handleSubmit } className = "space-y-6" >
    <div className="grid grid-cols-2 gap-4" >
        <div className="relative" >
            <label htmlFor="exchangeRate" className = "block text-sm text-white mb-1" > Tipo de Cambio($) </label>
                < input
type = "text"
id = "exchangeRate"
name = "exchangeRate"
value = { Number(localValues.exchangeRate).toLocaleString('en-US') }
onChange = { handleChange }
className = {`h-8 w-full text-right font-mono bg-[#1b1b3a] border ${errors.exchangeRate ? 'border-red-500' : 'border-[#3b3b4f]'} rounded-3xl px-3 text-white outline-none`}
placeholder = "0"
    />
    { errors.exchangeRate && <p className="text-sm text-red-400 mt-1"> { errors.exchangeRate } </p> }
    </div>

    < div className = "relative" >
        <label htmlFor="energyPricePerMW" className = "block text-sm text-white mb-1" > Precio de Energía(U$D / MW) </label>
            < input
type = "text"
id = "energyPricePerMW"
name = "energyPricePerMW"
value = { localValues.energyPricePerMW }
onChange = { handleChange }
className = {`h-8 w-full text-right font-mono bg-[#1b1b3a] border ${errors.energyPricePerMW ? 'border-red-500' : 'border-[#3b3b4f]'} rounded-3xl px-3 text-white outline-none`}
placeholder = "0,000.00"
    />
    { errors.energyPricePerMW && <p className="text-sm text-red-400 mt-1"> { errors.energyPricePerMW } </p> }
    </div>

    < div className = "relative" >
        <label htmlFor="fixedChargesAnnualDollars" className = "block text-sm text-white mb-1" > Cargos Fijos Anuales(USD) </label>
            < input
type = "text"
id = "fixedChargesAnnualDollars"
name = "fixedChargesAnnualDollars"
value = { Number(localValues.fixedChargesAnnualDollars).toLocaleString('en-US') }
onChange = { handleChange }
className = {`h-8 w-full text-right font-mono bg-[#1b1b3a] border ${errors.fixedChargesAnnualDollars ? 'border-red-500' : 'border-[#3b3b4f]'} rounded-3xl px-3 text-white outline-none`}
placeholder = "0"
    />
    { errors.fixedChargesAnnualDollars && <p className="text-sm text-red-400 mt-1"> { errors.fixedChargesAnnualDollars } </p> }
    </div>

    < div className = "relative" >
        <label htmlFor="nonAbsorbableTaxes" className = "block text-sm text-white mb-1" > Impuestos No Absorbibles(%) </label>
            < input
type = "text"
id = "nonAbsorbableTaxes"
name = "nonAbsorbableTaxes"
value = { Number(localValues.nonAbsorbableTaxes).toLocaleString('en-US') }
onChange = { handleChange }
className = {`h-8 w-full text-right font-mono bg-[#1b1b3a] border ${errors.nonAbsorbableTaxes ? 'border-red-500' : 'border-[#3b3b4f]'} rounded-3xl px-3 text-white outline-none`}
placeholder = "0"
    />
    { errors.nonAbsorbableTaxes && <p className="text-sm text-red-400 mt-1"> { errors.nonAbsorbableTaxes } </p> }
    </div>
    </div>

    < Button
type = "submit"
disabled = { isSaving }
className = "w-full bg-[#4a4ae2] hover:bg-[#3b3be0] text-white font-bold py-2 px-6 rounded-3xl flex items-center justify-center gap-2 mt-8"
    >
{
    isSaving?(
                        <>
    <Loader2 className="h-4 w-4 animate-spin" /> Guardando...
</>
                    ) : (
    <>
    <Receipt className= "h-4 w-4" /> Guardar Costos
        </>
                    )}
</Button>
    </form>
    </div>
    );
};

export default InvoiceDataFormLargeCompany;
