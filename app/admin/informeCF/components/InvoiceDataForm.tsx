'use client';

import React, { useState, useCallback } from 'react';
import { Receipt, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useConstants, InvoiceConstants } from '../contexts/ConstantsContext';

const InvoiceDataForm: React.FC = () => {
    const { constants, updateInvoiceConstant, isLoading: contextLoading, error: contextError } = useConstants();
    const [isSaving, setIsSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [localValues, setLocalValues] = useState<InvoiceConstants>({
        exchangeRate: constants.invoice?.exchangeRate || 0,
        totalInvoiceAmountPesos: constants.invoice?.totalInvoiceAmountPesos || 0,
        taxesPercentage: constants.invoice?.taxesPercentage || 0,
        fixedChargesPesos: constants.invoice?.fixedChargesPesos || 0,
        reactivePowerChargesPesos: constants.invoice?.reactivePowerChargesPesos || 0
    });
    const [showSuccess, setShowSuccess] = useState(false);

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!localValues.exchangeRate) {
            newErrors.exchangeRate = 'El tipo de cambio es requerido';
        } else if (localValues.exchangeRate <= 0) {
            newErrors.exchangeRate = 'El tipo de cambio debe ser mayor a 0';
        }

        if (!localValues.totalInvoiceAmountPesos) {
            newErrors.totalInvoiceAmountPesos = 'El monto total es requerido';
        } else if (localValues.totalInvoiceAmountPesos < 0) {
            newErrors.totalInvoiceAmountPesos = 'El monto no puede ser negativo';
        }

        if (!localValues.taxesPercentage) {
            newErrors.taxesPercentage = 'El porcentaje de impuestos es requerido';
        } else if (localValues.taxesPercentage < 0 || localValues.taxesPercentage > 100) {
            newErrors.taxesPercentage = 'El porcentaje debe estar entre 0 y 100';
        }

        if (!localValues.fixedChargesPesos) {
            newErrors.fixedChargesPesos = 'Los cargos fijos son requeridos';
        } else if (localValues.fixedChargesPesos < 0) {
            newErrors.fixedChargesPesos = 'Los cargos no pueden ser negativos';
        }

        if (!localValues.reactivePowerChargesPesos) {
            newErrors.reactivePowerChargesPesos = 'Los cargos por potencia reactiva son requeridos';
        } else if (localValues.reactivePowerChargesPesos < 0) {
            newErrors.reactivePowerChargesPesos = 'Los cargos no pueden ser negativos';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSaving(true);
            try {
                // Crear el objeto en el formato correcto
                const updatedData = {
                    invoice: {  // <- Aseguramos la estructura correcta
                        exchangeRate: Number(localValues.exchangeRate),
                        totalInvoiceAmountPesos: Number(localValues.totalInvoiceAmountPesos),
                        taxesPercentage: Number(localValues.taxesPercentage),
                        fixedChargesPesos: Number(localValues.fixedChargesPesos),
                        reactivePowerChargesPesos: Number(localValues.reactivePowerChargesPesos)
                    }
                };

                // Enviamos la actualización completa
                await updateInvoiceConstant('invoice', updatedData);

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
            [name]: Number(value)
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

const customStyle = {
    backdropFilter: "blur(16px) saturate(180%)",
    backgroundColor: "rgba(17, 25, 40, 0.75)",
    border: "1px solid rgba(255, 255, 255, 0.125)",
};
return (
    <div className= "w-full max-w-2xl mx-auto p-4 md:p-8 rounded-3xl" style = { customStyle } >
        <div className="flex items-center gap-2 mb-6" >
            <Receipt className="h-6 w-6 text-blue-400" />
                <h2 className="text-2xl font-bold text-white" > Datos de la Factura </h2>
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
        {/* Tipo de Cambio */ }
        < div className = "relative" >
            <label htmlFor="exchangeRate" className = "block text-sm text-white mb-1" >
                Tipo de Cambio($)
                    </label>
                    < input
type = "text"
id = "exchangeRate"
name = "exchangeRate"
value = { Number(localValues.exchangeRate).toLocaleString('en-US').split('.')[0] }
onKeyPress = {(e) => {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
}}
onChange = {(e) => {
    const value = e.target.value.replace(/\D/g, '');
    handleChange({
        target: {
            name: 'exchangeRate',
            value: value
        }
    } as React.ChangeEvent<HTMLInputElement>);
}}
className = {`h-8 w-full text-right font-mono bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 text-white outline-none
                            ${errors.exchangeRate ? 'border-red-500' : ''}`}
placeholder = "0"
    />
{
    errors.exchangeRate && (
        <p className="text-sm text-red-400 mt-1"> { errors.exchangeRate } </p>
                    )
}
    </div>

{/* Monto Total */ }
<div className="relative" >
    <label htmlFor="totalInvoiceAmountPesos" className = "block text-sm text-white mb-1" >
        Monto Total($)
            </label>
            < input
type = "text"
id = "totalInvoiceAmountPesos"
name = "totalInvoiceAmountPesos"
value = { Number(localValues.totalInvoiceAmountPesos).toLocaleString('en-US').split('.')[0] }
onKeyPress = {(e) => {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
}}
onChange = {(e) => {
    const value = e.target.value.replace(/\D/g, '');
    handleChange({
        target: {
            name: 'totalInvoiceAmountPesos',
            value: value
        }
    } as React.ChangeEvent<HTMLInputElement>);
}}
className = {`h-8 w-full text-right font-mono bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 text-white outline-none
                            ${errors.totalInvoiceAmountPesos ? 'border-red-500' : ''}`}
placeholder = "0"
    />
{
    errors.totalInvoiceAmountPesos && (
        <p className="text-sm text-red-400 mt-1"> { errors.totalInvoiceAmountPesos } </p>
                    )
}
    </div>

{/* Impuestos */ }
<div className="relative" >
    <label htmlFor="taxesPercentage" className = "block text-sm text-white mb-1" >
        Impuestos(%)
        </label>
        < input
type = "text"
id = "taxesPercentage"
name = "taxesPercentage"
value = { Number(localValues.taxesPercentage).toLocaleString('en-US').split('.')[0] }
onKeyPress = {(e) => {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
}}
onChange = {(e) => {
    const value = e.target.value.replace(/\D/g, '');
    handleChange({
        target: {
            name: 'taxesPercentage',
            value: value
        }
    } as React.ChangeEvent<HTMLInputElement>);
}}
className = {`h-8 w-full text-right font-mono bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 text-white outline-none
                            ${errors.taxesPercentage ? 'border-red-500' : ''}`}
placeholder = "0"
    />
{
    errors.taxesPercentage && (
        <p className="text-sm text-red-400 mt-1"> { errors.taxesPercentage } </p>
                    )
}
    </div>

{/* Cargos Fijos */ }
<div className="relative" >
    <label htmlFor="fixedChargesPesos" className = "block text-sm text-white mb-1" >
        Cargos Fijos($)
            </label>
            < input
type = "text"
id = "fixedChargesPesos"
name = "fixedChargesPesos"
value = { Number(localValues.fixedChargesPesos).toLocaleString('en-US').split('.')[0] }
onKeyPress = {(e) => {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
}}
onChange = {(e) => {
    const value = e.target.value.replace(/\D/g, '');
    handleChange({
        target: {
            name: 'fixedChargesPesos',
            value: value
        }
    } as React.ChangeEvent<HTMLInputElement>);
}}
className = {`h-8 w-full text-right font-mono bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 text-white outline-none
                            ${errors.fixedChargesPesos ? 'border-red-500' : ''}`}
placeholder = "0"
    />
{
    errors.fixedChargesPesos && (
        <p className="text-sm text-red-400 mt-1"> { errors.fixedChargesPesos } </p>
                    )
}
    </div>

{/* Cargos por Potencia Reactiva */ }
<div className="relative col-span-2" >
    <label htmlFor="reactivePowerChargesPesos" className = "block text-sm text-white mb-1" >
        Cargos por Potencia Reactiva($)
            </label>
            < input
type = "text"
id = "reactivePowerChargesPesos"
name = "reactivePowerChargesPesos"
value = { Number(localValues.reactivePowerChargesPesos).toLocaleString('en-US').split('.')[0] }
onKeyPress = {(e) => {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
}}
onChange = {(e) => {
    const value = e.target.value.replace(/\D/g, '');
    handleChange({
        target: {
            name: 'reactivePowerChargesPesos',
            value: value
        }
    } as React.ChangeEvent<HTMLInputElement>);
}}
className = {`h-8 w-full text-right font-mono bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 text-white outline-none
                            ${errors.reactivePowerChargesPesos ? 'border-red-500' : ''}`}
placeholder = "0"
    />
{
    errors.reactivePowerChargesPesos && (
        <p className="text-sm text-red-400 mt-1"> { errors.reactivePowerChargesPesos } </p>
                    )
}
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
    <Loader2 className="h-4 w-4 animate-spin" />
        Guardando...
</>
                ) : (
    <>
    <Receipt className= "h-4 w-4" />
    Guardar Factura
        </>
                )}
</Button>
    </form>
    </div>
);

};

export default InvoiceDataForm;