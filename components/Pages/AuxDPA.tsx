import React from 'react';

const formatNumber = (num) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num);

const FinancialAnalysisTable = () => {
    const data = {
        income: [
            { name: "Canon COCAPRHI - D.P.A.", amount: 132455017 },
            { name: "Otros Derechos", amount: 9704261695 },
            { name: "Participación por Generación Energía Hidroeléctrica", amount: 3400554764 },
            { name: "Venta por Generación de Energía Eléctrica", amount: 3986935768 },
            { name: "De Instituciones Descentralizadas Nacionales", amount: 52191364 },
            { name: "De la ADM Central - Plan Castello Ley 5201", amount: 486039686 },
            { name: "Recursos de Ejercicios Anteriores", amount: 562610771 },
        ],
        expenses: [
            { name: "Gastos Corrientes", amount: 13075392183 },
            { name: "Gastos de Consumo", amount: 8380068842 },
            { name: "Rentas de la Propiedad", amount: 85679463 },
            { name: "Transferencias Corrientes", amount: 4609643036 },
            { name: "Aplicaciones Financieras", amount: 121424613 },
        ],
        capital: { name: "Gasto de Capital (excluido)", amount: 20423047941 },
        newCredit: { name: "Nuevo Crédito", amount: 18000000 },
    };

    const totalIncome = data.income.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = data.expenses.reduce((sum, item) => sum + item.amount, 0);
    const freeCashFlow = totalIncome - totalExpenses;

    return (
        <div className= "p-4 max-w-4xl mx-auto text-xs" >
        <h2 className="text-lg font-bold mb-4" > Análisis Financiero DPA Río Negro(USD) </h2>
            < table className = "w-full border-collapse" >
                <caption className="text-sm mb-2" > Tasa de cambio: 1 USD = 950 ARS </caption>
                    < thead >
                    <tr className="bg-gray-200" >
                        <th className="w-2/3 text-left p-2" > Concepto </th>
                            < th className = "w-1/3 text-right p-2" > Monto(USD) </th>
                                </tr>
                                </thead>
                                < tbody >
                                <tr className="font-semibold" >
                                    <td className="p-2" > Ingresos Anuales Proyectados </td>
                                        < td className = "text-right p-2" > { formatNumber(totalIncome) } </td>
                                            </tr>
    {
        data.income.map((item, index) => (
            <tr key= { index } className = "text-gray-600" >
            <td className="pl-6 p-2" > { item.name } </td>
        < td className = "text-right p-2" > { formatNumber(item.amount)
    } </td>
        </tr>
          ))}
<tr className="font-semibold" >
    <td className="p-2" > Gastos Anuales(sin Gasto de Capital) </td>
        < td className = "text-right p-2" > { formatNumber(totalExpenses) } </td>
            </tr>
{
    data.expenses.map((item, index) => (
        <tr key= { index } className = "text-gray-600" >
        <td className="pl-6 p-2" > { item.name } </td>
    < td className = "text-right p-2" > { formatNumber(item.amount)
} </td>
    </tr>
          ))}
<tr className="font-semibold bg-gray-100" >
    <td className="p-2" > Flujo de Caja Libre </td>
        < td className = "text-right p-2" > { formatNumber(freeCashFlow) } </td>
            </tr>
            < tr className = "font-semibold" >
                <td className="p-2" > Gasto de Capital e Inversión </td>
                    < td className = "text-right p-2" > </td>
                        </tr>
                        < tr className = "text-gray-600" >
                            <td className="pl-6 p-2" > { data.capital.name } </td>
                                < td className = "text-right p-2" > { formatNumber(data.capital.amount) } </td>
                                    </tr>
                                    < tr className = "text-gray-600" >
                                        <td className="pl-6 p-2" > { data.newCredit.name } </td>
                                            < td className = "text-right p-2" > { formatNumber(data.newCredit.amount) } </td>
                                                </tr>
                                                </tbody>
                                                </table>
                                                </div>
  );
};

export default FinancialAnalysisTable;