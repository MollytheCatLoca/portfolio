import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Sun, Battery, DollarSign, Zap, Lightbulb } from "lucide-react";
import { calcularMetricasManuales } from "../data/constants_pdf";
import { useConstants } from "../contexts/ConstantsContext";

interface SummaryCardProps {
    label: string;
    value: string;
    icon: React.ReactNode;
    gradientClass: string;
  }
  
  interface TableRow {
    category: string;
    actual: string;
    leasing: string;
    postLeasing: string;
  }

  function formatCurrency(value: number, locale: string = "es-AR", currency: string = "ARS"): string {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      minimumFractionDigits: 0, // Sin decimales
      maximumFractionDigits: 0, // Sin decimales
    }).format(value);
  }

  function formatPercentage(value: number, locale: string = "es-AR"): string {
    return new Intl.NumberFormat(locale, {
      style: "percent",
      minimumFractionDigits: 2, // Dos decimales
      maximumFractionDigits: 2, // Dos decimales
    }).format(value / 100); // Dividimos por 100 para convertir a formato de porcentaje
  }
  
  
  
  const SolarImpactDashboard: React.FC = () => {
    const { constants } = useConstants();
    const metricas = calcularMetricasManuales(constants.detailedMetrics.capacityMW * 1000);
    const FacturaMensua = constants.invoice.totalInvoiceAmountPesos / constants.invoice.exchangeRate * 12 
    const Impuestos = constants.invoice.taxesPercentage /100 * FacturaMensua
    const CargosFijos = constants.invoice.fixedChargesPesos / constants.invoice.exchangeRate * 12 
    const Energia = FacturaMensua - Impuestos - CargosFijos
    const Cobertura = constants.detailedMetrics?.porcentajes.ahorroTotal
    const AhorroBrutoLeasing = Energia * Cobertura / 100
    const AhorroAnualNetoL = AhorroBrutoLeasing - metricas.cuotaLeasing
    const AhorroTotalProy = (AhorroAnualNetoL * 6)+(AhorroBrutoLeasing * 19)
    const Inversion = constants.technical.costPerKW * constants.power.installedPowerKW
    const ROIEner = AhorroTotalProy / Inversion * 100
    const AhorroTotalPorcentaje = AhorroTotalProy / (Energia * 25) * 100
    // Intentamos usar valores dinámicos donde sea posible
    const summaryData: SummaryCardProps[] = [
      {
        label: "Inversion (Parque)",
        value: formatCurrency(Inversion),
        icon: <Zap className="h-6 w-6 text-yellow-400" />,
        gradientClass: "from-yellow-950 to-gray-900"
      },
      {
        label: "Ahorro Total Proyecto (25 yr)",
        value: formatCurrency(AhorroTotalProy),
        icon: <DollarSign className="h-6 w-6 text-green-400" />,
        gradientClass: "from-green-950 to-gray-900"
      },
      {
        label: "Porcentaje de Ahorro",
        value: formatPercentage(AhorroTotalPorcentaje),
        icon: <TrendingUp className="h-6 w-6 text-purple-400" />,
        gradientClass: "from-purple-950 to-gray-900"
      },
      {
        label: "ROI Energético",
        value: formatPercentage(ROIEner),
        icon: <Battery className="h-6 w-6 text-blue-400" />,
        gradientClass: "from-blue-950 to-gray-900"
      },
    ];

    

    const tableData: TableRow[] = [
      {
        category: "Factura Anual",
        actual: formatCurrency(FacturaMensua),
        leasing: formatCurrency(FacturaMensua),
        postLeasing: formatCurrency(FacturaMensua)
      },
      {
        category: "Impuestos",
        actual: formatCurrency(Impuestos), // Valor fijo por ahora
        leasing: formatCurrency(Impuestos),
        postLeasing: formatCurrency(114222.9)
      },
      {
        category: "Cargos Fijos",
        actual: formatCurrency(CargosFijos),
        leasing: formatCurrency(CargosFijos),
        postLeasing: formatCurrency(constants.invoice.fixedChargesPesos || 11502.8)
      },
      {
        category: "Energía",
        actual: formatCurrency(Energia), // Valor fijo por ahora
        leasing: formatCurrency(Energia),
        postLeasing: formatCurrency(Energia)
      },
      {
        category: "% Cobertura Planta",
        actual: "-",
        leasing: formatPercentage(Cobertura),
        postLeasing: formatPercentage(Cobertura)
      },
      {
        category: "Ahorro Bruto",
        actual: "-",
        leasing: formatCurrency(AhorroBrutoLeasing),
        postLeasing: formatCurrency(AhorroBrutoLeasing)
      },
      {
        category: "Leasing",
        actual: "-",
        leasing: formatCurrency(metricas.cuotaLeasing || 24000),
        postLeasing: "0"
      },
      {
        category: "Ahorro Anual (-Leasing)",
        actual: "-",
        leasing: formatCurrency(AhorroAnualNetoL || 9918),
        postLeasing: formatCurrency(AhorroBrutoLeasing)
      },
      {
        category: "Ahorro Total (Periodo)",
        actual: "-",
        leasing: formatCurrency(AhorroAnualNetoL * 6),
        postLeasing: formatCurrency(AhorroBrutoLeasing * 19)
      },
      
    ];
  return (
    <div className="h-[210mm] w-[270mm] p-6 bg-gray-900">
      <div className="flex flex-col h-full space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Impacto Económico Solar</h1>
            <p className="text-gray-400">Análisis detallado de ahorro energético y financiero</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-900/30 rounded-full border border-green-800">
            <Sun className="h-5 w-5 text-yellow-400" />
            <span className="text-green-400 text-sm font-medium">Sistema Fotovoltaico</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex gap-4 flex-1">
          {/* Tabla Principal */}
          <Card className="flex-1 bg-gray-900 border-gray-800">
            <CardContent className="p-0 h-full">
              <div className="overflow-auto h-full">
                <table className="w-full text-sm text-gray-300">
                  <thead className="text-xs uppercase bg-gray-800 sticky top-0">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left">Categoría</th>
                      <th scope="col" className="px-6 py-3 text-right">Actual</th>
                      <th scope="col" className="px-6 py-3 text-right">Periodo Leasing</th>
                      <th scope="col" className="px-6 py-3 text-right">Post Leasing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {tableData.map((row, index) => (
                      <tr 
                        key={index} 
                        className={index % 2 === 0 ? 'bg-gray-900/50' : 'bg-gray-900/30'}
                      >
                        <td className="px-6 py-3 font-medium">{row.category}</td>
                        <td className={`px-6 py-3 text-right ${row.actual === '-' ? 'text-gray-600' : 'text-white'}`}>
                          {row.actual}
                        </td>
                        <td className="px-6 py-3 text-right">
                          <span className={row.category.includes('Ahorro') ? 'text-green-400' : 'text-white'}>
                            {row.leasing}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-right">
                          <span className={row.category.includes('Ahorro') ? 'text-green-400' : 'text-white'}>
                            {row.postLeasing}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Tarjetas de Resumen */}
          <div className="w-72 space-y-4">
            {summaryData.map((card, index) => (
              <Card 
                key={index} 
                className={`bg-gradient-to-r ${card.gradientClass} border-gray-800`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    {card.icon}
                    <span className="text-2xl font-bold text-white">{card.value}</span>
                  </div>
                  <p className="text-sm text-gray-400">{card.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolarImpactDashboard;