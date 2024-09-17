import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';

type Scenario = {
    id_escenario: number;
    nombre: string;
    analisisFinanciero: {
        ingresos: number;
        cuotaInversion: number;
    }[];
};

type SavingsVsCostsChartProps = {
    scenarios: Scenario[];
};

const SavingsVsCostsChart: React.FC<SavingsVsCostsChartProps> = ({ scenarios }) => {
    const data = scenarios.map((scenario, index) => {
        let ahorros = scenario.analisisFinanciero[0].ingresos;
        let cuota = scenario.analisisFinanciero.reduce((sum, year) => sum + year.cuotaInversion, 0) / 6; // Promedio de 6 años

        // Aplicar factores de ajuste
        if (index === 1) { // Escenario 2
            ahorros *= 1.05;
        } else if (index === 2) { // Escenario 3
            ahorros *= 1.1;
        }

        return {
            name: `Escenario ${scenario.id_escenario}`,
            ahorros: ahorros,
            cuota: cuota
        };
    });

    return (
        <Card className= "bg-black-200 border-gray-800 mt-6" >
        <CardHeader>
        <CardTitle className="text-xl font-bold text-white" > Ahorros vs Cuotas Anuales por Escenario </CardTitle>
            </CardHeader>
            < CardContent >
            <div className="h-[400px] w-full" >
                <ResponsiveContainer width="100%" height = "100%" >
                    <BarChart
                            data={ data }
    margin = {{
        top: 20,
            right: 30,
                left: 20,
                    bottom: 5,
                            }
}
                        >
    <CartesianGrid strokeDasharray="3 3" stroke = "#444" />
        <XAxis dataKey="name" stroke = "#888" />
            <YAxis stroke="#888" />
                <Tooltip 
                                contentStyle={ { backgroundColor: '#333', border: 'none' } }
labelStyle = {{ color: '#fff' }}
                            />
    < Legend />
    <Bar dataKey="ahorros" name = "Ahorros Anuales" fill = "#4CAF50" />
        <Bar dataKey="cuota" name = "Cuota Anual Promedio" fill = "#FF5722" />
            </BarChart>
            </ResponsiveContainer>
            </div>
            < div className = "text-sm text-gray-400 mt-2 space-y-2 p-10 " >
                <p>
                Este gráfico muestra la comparación entre los ahorros anuales estimados y las cuotas anuales promedio de inversión para cada escenario.
                        Los ahorros están representados en verde y las cuotas en naranja.
                    </p>
    < p >
    <strong>Importante: </strong> Las cuotas anuales mostradas son un promedio calculado sobre un período de 6 años. 
                        Después de este período, se continúa generando energía sin pagar cuotas adicionales, lo que resulta en ahorros netos mayores a largo plazo.
                    </p>
    <p>
                        Note que la cuota reflejada en este grafico es el promedio de cuota en los 6 anos donde el credito esta vigente.
                    </p>
    <p>
                        A diferencia del resumen ejecutivo, donde se muestra la cuota del primer año, aquí se presenta un promedio para ofrecer una visión más equilibrada de los costos a lo largo del tiempo.
                    </p>
    </div>
    </CardContent>
    </Card>
    );
};

export default SavingsVsCostsChart;