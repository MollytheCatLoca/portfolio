import React, { useState } from 'react';
import { useConstants } from '../contexts/ConstantsContext';
import { usecalcularMetricasManuales } from '../data/constants_pdf';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card3";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator } from "lucide-react";

const formatCurrency = (value: number, decimals: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(value);
};

const MetricasManualesAuditor: React.FC = () => {
    const { constants } = useConstants();
    const [auxPlantCapacity, setAuxPlantCapacity] = useState(constants.detailedMetrics.capacityMW * 1000);
    const [metricas, setMetricas] = useState(null);
    const [decimals, setDecimals] = useState(2);
    const resultados = usecalcularMetricasManuales(constants.detailedMetrics?.capacityMW * 1000);

    const handleCalculate = () => {
        setMetricas(resultados);
    };

    const MetricItem = ({ label, value }) => (
        <div className= "flex justify-between items-center py-1 border-b border-gray-700 text-xs" >
        <span className="text-gray-300" > { label } </span>
            < span className = "font-medium" > { value } </span>
                </div>
    );

return (
    <Card className= "w-full" >
    <CardHeader className="py-2" >
        <CardTitle className="text-sm font-medium flex items-center gap-2" >
            <Calculator className="w-4 h-4" />
                Auditoría de Métricas Manuales
                    </CardTitle>
                    </CardHeader>
                    < CardContent className = "space-y-3 p-2" >
                        {/* Valores Originales */ }
                        < div className = "bg-gray-800 rounded p-2" >
                            <h3 className="text-xs font-medium mb-1 text-blue-400" >
                                Valores Originales
                                    </h3>
                                    < MetricItem
label = "Capacidad de Planta Original (kW)"
value = { constants.detailedMetrics.capacityMW * 1000 }
    />
    <MetricItem 
                        label="Energía Generada (MWh)"
value = { constants.detailedMetrics.valoresAnuales.generacionTotal.toFixed(0) }
    />
    <MetricItem 
                        label="Precio Unitario (USD/MWh)"
value = { constants.invoice.priceEnergyMWh }
    />
    <MetricItem 
                        label="O&M en Leasing (USD)"
value = { constants.technical.OyMLeasing }
    />
    <MetricItem 
                        label="O&M Fuera de Leasing (USD)"
value = { constants.technical.OyMSLeasing }
    />
    <MetricItem 
                        label="Duración Leasing (años)"
value = { constants.technical.duracionLeasing }
    />
    <MetricItem 
                        label="Costo por kW (USD)"
value = { constants.technical.costPerKW }
    />
    </div>

{/* Calculadora */ }
<div className="bg-gray-800 rounded p-2" >
    <div className="flex gap-2" >


        <Button
onClick = { handleCalculate }
className = "h-6 w-40 text-xs px-2 py-0"
    >
    <Calculator className="w-3 h-3 mr-1" />
        Calcular
        </Button>
        </div>
        </div>

{/* Resultados */ }
{
    metricas && (
        <div className="bg-gray-800 rounded p-2" >
            <h3 className="text-xs font-medium mb-1 text-blue-400" >
                Resultados
                </h3>
                < MetricItem
    label = "Capacidad de Planta (kW)"
    value = { metricas.plantCapacityKWcm }
        />
        <MetricItem 
                            label="Energía Generada (MWh)"
    value = { metricas.energiaGenerada.toFixed(0) }
        />
        <MetricItem 
                            label="Unitario (USD/MWh)"
    value = { metricas.precioUnitarioEnergia.toFixed(decimals) }
        />
        <MetricItem 
                            label="Cuota Leasing"
    value = { formatCurrency(metricas.cuotaLeasing, 0) }
        />
        <MetricItem 
                            label="O&M en Leasing"
    value = { formatCurrency(metricas.oYMenLeasing, 0) }
        />
        <MetricItem 
                            label="O&M Fuera Leasing"
    value = { formatCurrency(metricas.oYMfueraLeasing, 0) }
        />
        <MetricItem 
                            label="Ahorro en Leasing"
    value = { formatCurrency(metricas.ahorroEnLeasing, 0) }
        />
        <MetricItem 
                            label="Ahorro Fuera Leasing"
    value = { formatCurrency(metricas.ahorroFueraLeasing, 0) }
        />
        <MetricItem 
                            label="Ahorro TOTAL Leasing"
    value = { formatCurrency(metricas.ahorroEnLeasingTotalPeriodo, 0) }
        />
        <MetricItem 
                            label="Ahorro TOTAL F.Leasing"
    value = { formatCurrency(metricas.ahorroFueraLeasingTotalPeriodo, 0) }
        />
        <MetricItem 
                            label="Ahorro TOTAL"
    value = { formatCurrency(metricas.ahorroTotalProyecto, 0) }
        />
        <MetricItem 
                            label="Factor Planta"
    value = {(metricas.factorPlanta * 1000).toFixed(4)
}
                        />
    < MetricItem
label = "Parque (USD)"
value = { formatCurrency(metricas.costoParque, 0) }
    />
    <MetricItem 
                            label="Duración Leasing (años)"
value = { metricas.duracionLeasing }
    />
    <MetricItem 
                            label="Vida Útil (años)"
value = { metricas.vidaUtil }
    />
    </div>
                )}
</CardContent>
    </Card>
    );
};

export default MetricasManualesAuditor;