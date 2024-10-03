import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Handshake, Users, BarChart, Layout, DollarSign, ActivitySquare } from 'lucide-react';

const iconMap = {
    Handshake: Handshake,
    Users: Users,
    BarChart: BarChart,
    Layout: Layout,
    DollarSign: DollarSign,
    ActivitySquare: ActivitySquare,
    ChartLine: BarChart // Asumiendo que ChartLine no existe en lucide-react y usamos BarChart como fallback
};

interface RutaImplementacionProps {
    data: any;
    part?: number;
    transform?: string;
}

const RutaImplementacion_Cluster: React.FC<RutaImplementacionProps> = ({ data, part = 1, transform = 'scale(1)' }) => {
    const { title } = data.rutaImplementacion;
    const pasos = data.rutaImplementacion[part === 1 ? 'parte1' : 'parte2'];

    return (
        <div className= "space-y-4 text-white bg-[#121212] p-4" style = {{ transform }
}>
    <h2 className="text-2xl font-bold mb-4 mt-5" >
        <span className="text-blue-500" > { title } </span> (Parte {part})
            </h2>
            < div className = "space-y-4" style = {{ transform: 'scale(0.95)' }}>
            {
                pasos.map((paso: any, index: number) => {
                    const IconComponent = iconMap[paso.icon as keyof typeof iconMap] || Users;
                    return (
                        <Card key= { index } className = "bg-gray-800 border-gray-700" >
                            <CardHeader className="flex flex-row items-center space-x-2 p-4" >
                                <IconComponent className="h-6 w-6 text-blue-500" />
                                    <CardTitle className="text-lg font-semibold" >
                                        { part === 1 ? index + 1 : index + 4
                }. { paso.title }
</CardTitle>
    </CardHeader>
    < CardContent >
    <ul className="list-disc list-inside space-y-2" >
    {
        paso.detalles.map((detalle: string, idx: number) => (
            <li key= { idx } className = "text-sm text-gray-300" > { detalle } </li>
        ))
    }
        </ul>
        </CardContent>
        </Card>
          );
        })}
</div>
    </div>
  );
};

export default RutaImplementacion_Cluster;