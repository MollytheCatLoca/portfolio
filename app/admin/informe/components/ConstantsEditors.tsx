'use client';

import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Settings, Loader2 } from "lucide-react";
import { useConstants, TechnicalConstants } from '../contexts/ConstantsContext';

const TECHNICAL_FIELDS: Record<keyof TechnicalConstants, string> = {
    contractedPowerKW: "Potencia Contratada (KW)",
    costPerKW: "Costo por KW",
    referenceAnnualGenerationMWH: "Generación Anual de Referencia (MWH)",
    maxCurtailmentPercentage: "Porcentaje Máximo de Reducción",
    OyMLeasing: "OyMLeasing",
    OyMSLeasing: "OyMSLeasing",
    duracionLeasing: "duracionLeasing",
    vidaUtil: "Vida Util",
    tasaInteres: "Tasa Interes"

};

const ConstantsEditor: React.FC = () => {
    const { constants, updateTechnicalConstant, isLoading, error: contextError } = useConstants();
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [editedFields, setEditedFields] = useState<Set<keyof TechnicalConstants>>(new Set());
    const [localError, setLocalError] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState<boolean>(false);
    const [localValues, setLocalValues] = useState<TechnicalConstants>(constants.technical);

    const handleChange = useCallback((key: keyof TechnicalConstants, value: string) => {
        setLocalValues(prev => ({
            ...prev,
            [key]: value
        }));
        setEditedFields(prev => new Set(prev).add(key));
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const promises = Array.from(editedFields).map(key => {
                const value = Number(localValues[key]);
                if (isNaN(value)) {
                    throw new Error(`Valor inválido para ${TECHNICAL_FIELDS[key]}`);
                }
                return updateTechnicalConstant(key, value);
            });

            await Promise.all(promises);

            setEditedFields(new Set());
            setLocalError(null);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err) {
            setLocalError(err instanceof Error ? err.message : 'Error al actualizar las constantes');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className= "flex items-center justify-center h-40" >
            <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
                </div>
        );
    }

return (
    <div className= "w-full max-w-2xl mx-auto p-4 md:p-8 rounded-3xl" >
    <div className="flex items-center gap-2 mb-6" >
        <Settings className="h-6 w-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white" > Parámetros Técnicos </h2>
                </div>

{
    (localError || contextError) && (
        <div className="bg-red-900/50 border border-red-500/50 text-red-200 px-4 py-3 rounded-3xl text-sm mb-6" >
            { localError || contextError
}
</div>
            )}

{
    showSuccess && (
        <div className="bg-green-900/50 border border-green-500/50 text-green-200 px-4 py-3 rounded-3xl text-sm mb-6" >
            Parámetros actualizados correctamente
                </div>
            )
}

<div className="grid grid-cols-2 gap-4" >
    {(Object.entries(TECHNICAL_FIELDS) as [keyof TechnicalConstants, string][]).map(([key, label]) => (
        <div
                        key= { key }
                        className = "bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl p-3 transition-all hover:border-blue-500/50 relative"
        >
        <label
                            htmlFor={ key }
                            className = "block text-sm text-white mb-1"
                            title = { key }
        >
        { label }
        </label>
        < input
                            id = { key }
                            type = "number"
                            value = { localValues[key] || '' }
                            onChange = {(e) => handleChange(key, e.target.value)}
        className = {`h-8 w-full text-right font-mono bg-[#1b1b3a] border border-[#3b3b4f] rounded-3xl px-3 text-white outline-none
                                ${editedFields.has(key) ? 'border-blue-500 bg-blue-900/20' : ''}`}
                        />
                        {
            editedFields.has(key) && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-400 rounded-full" />
                        )}
</div>
                ))}
</div>

    < div className = "mt-8 flex items-center justify-between" >
    {
        editedFields.size > 0 && (
            <span className="text-sm text-slate-300">
                { editedFields.size } parámetro(s) modificado(s)
                    </span>
                )}
<Button
                    onClick={ handleSave }
disabled = { isLoading || isSaving || editedFields.size === 0}
className = {`ml-auto bg-[#4a4ae2] hover:bg-[#3b3be0] text-white font-bold py-2 px-6 rounded-3xl flex items-center gap-2
                        ${editedFields.size === 0 ? 'opacity-50' : ''}`}
                >
{
    isSaving?(
                        <>
    <Loader2 className="h-4 w-4 animate-spin" />
        Guardando...
</>
                    ) : (
    <>
    <Settings className= "h-4 w-4" />
    Guardar Cambios
        </>
                    )}
</Button>
    </div>
    </div>
    );
};

export default ConstantsEditor;