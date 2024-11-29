import React, { useState, useEffect, useContext } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card3";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Bug, Clock, History, RefreshCcw } from "lucide-react";
import { ConstantsContext } from '../contexts/ConstantsContext';

const HistoryModal = ({ title, history }) => {
    return (
        <Dialog>
        <DialogTrigger asChild >
        <Button 
          variant= "outline"
    size = "sm"
    className = "bg-[#1C2333] hover:bg-[#252e3f] border-gray-700 text-gray-300"
        >
        <History className="h-4 w-4 mr-2" />
            Ver Historial
                </Button>
                </DialogTrigger>
                < DialogContent className = "bg-[#131825] text-gray-200 border-gray-700 max-w-3xl max-h-[80vh] overflow-y-auto" >
                    <DialogHeader>
                    <DialogTitle className="flex items-center gap-2" >
                        <RefreshCcw className="h-4 w-4" />
                            Historial de Cambios - { title }
                                </DialogTitle>
                                </DialogHeader>
                                < div className = "space-y-4 mt-4" >
                                {
                                    history.map((item, idx) => (
                                        <div key= { idx } className = "border-b border-gray-700 pb-4" >
                                        <div className="flex items-center text-sm text-gray-400 mb-2" >
                                    <Clock className="h-4 w-4 mr-2" />
                                    { item.timestamp }
                                    </div>
                                    < pre className = "bg-[#1C2333] p-3 rounded-md overflow-x-auto text-xs text-gray-300" >
                                    {
                                        typeof item.value === 'object'
                                            ? JSON.stringify(item.value, null, 2)
                                            : item.value
                                    }
                                    </pre>
                                    </div>
                                    ))
                                }
                                    </div>
                                    </DialogContent>
                                    </Dialog>
  );
};

const StateMonitor = ({
    consumptionData,
    dimensioningData,
    invoiceData,
    monthlyConsumptions,
    calculationResult,
    powerData
}) => {
    const { constants } = useContext(ConstantsContext);

    const [stateHistory, setStateHistory] = useState({
        consumptionData: [],
        dimensioningData: [],
        invoiceData: [],
        monthlyConsumptions: [],
        calculationResult: [],
        powerData: [],
        constants: []
    });

    const [lastUpdate, setLastUpdate] = useState({});

    const updateHistory = (key, newValue) => {
        if (JSON.stringify(stateHistory[key][0]?.value) !== JSON.stringify(newValue)) {
            setStateHistory(prev => ({
                ...prev,
                [key]: [{
                    value: newValue,
                    timestamp: new Date().toLocaleTimeString()
                }, ...prev[key]].slice(0, 10) // Guardamos los últimos 10 cambios
            }));

            setLastUpdate(prev => ({
                ...prev,
                [key]: new Date().toLocaleTimeString()
            }));
        }
    };

    useEffect(() => { updateHistory('consumptionData', consumptionData); }, [consumptionData]);
    useEffect(() => { updateHistory('dimensioningData', dimensioningData); }, [dimensioningData]);
    useEffect(() => { updateHistory('invoiceData', invoiceData); }, [invoiceData]);
    useEffect(() => { updateHistory('monthlyConsumptions', monthlyConsumptions); }, [monthlyConsumptions]);
    useEffect(() => { updateHistory('calculationResult', calculationResult); }, [calculationResult]);
    useEffect(() => { updateHistory('powerData', powerData); }, [powerData]);
    useEffect(() => { updateHistory('constants', constants); }, [constants]);

    const renderValue = (value) => {
        if (value === null) return "null";
        if (value === undefined) return "undefined";
        if (typeof value === 'object') return JSON.stringify(value, null, 2);
        return value.toString();
    };

    const renderSection = (title, key) => {
        const currentValue = key === 'constants' ? constants : eval(key);
        const history = stateHistory[key];
        const lastUpdateTime = lastUpdate[key];

        return (
            <div className= "mb-6 border-b border-gray-700 pb-4 last:border-b-0" >
            <div className="flex items-center justify-between mb-2" >
                <div className="flex items-center space-x-2" >
                    <h3 className="text-sm font-medium text-gray-300" > { title } </h3>
        {
            lastUpdateTime && (
                <span className="text-xs text-gray-400" >
                    (Última actualización: { lastUpdateTime })
            </span>
            )}
</div>
{
    history.length > 0 && (
        <HistoryModal title={ title } history = { history } />
          )
}
</div>

    < pre className = "bg-[#1C2333] p-3 rounded-md overflow-x-auto text-xs text-gray-300" >
        { renderValue(currentValue) }
        </pre>
        </div>
    );
  };

return (
    <Card className= "bg-[#131825] border-none shadow-lg" >
    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0" >
        <CardTitle className="text-sm font-medium flex items-center gap-2" >
            <Bug className="h-4 w-4 text-blue-400" />
                <span className="text-gray-200" > Monitor de Estado en Tiempo Real </span>
                    </CardTitle>
                    </CardHeader>
                    < CardContent className = "space-y-2 max-h-[800px] overflow-y-auto" >
                        { renderSection("Datos de Consumo", 'consumptionData') }
{ renderSection("Datos de Dimensionamiento", 'dimensioningData') }
{ renderSection("Datos de Factura", 'invoiceData') }
{ renderSection("Consumos Mensuales", 'monthlyConsumptions') }
{ renderSection("Resultado de Cálculos", 'calculationResult') }
{ renderSection("Datos de Potencia", 'powerData') }
{ renderSection("Constantes", 'constants') }
</CardContent>
    </Card>
  );
};

export default StateMonitor;