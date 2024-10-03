import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Building, GraduationCap, Users, Handshake, Factory, CheckCircle } from 'lucide-react';

const iconMap = {
    Building: Building,
    GraduationCap: GraduationCap,
    Factory: Factory,
    Users: Users,
    Handshake: Handshake
};

const VentajasActores_Cluster: React.FC<{ data: any, transform?: string }> = ({ data, transform = 'scale(1)' }) => {

    const { title, actores } = data.ventajasActores;

    return (
        <div className= "space-y-4 text-white bg-[#121212] p-4" style = {{ transform }
}>
    <h2 className="text-2xl font-bold mb-4 mt-5" >
        <span className="text-blue-500" > { title.split(' ')[0] } </span> {title.split(' ').slice(1).join(' ')}
            </h2>
            < div className = "grid grid-cols-1 gap-4" style = {{ transform: 'scale(0.95)' }}>
            {
                actores.map((actor, index) => {
                    const IconComponent = iconMap[actor.icon];
                    return (
                        <Card key= { index } className = "bg-gray-800 border-gray-700" >
                            <CardHeader className="flex flex-row items-center space-x-2 p-4" >
                                <IconComponent className={ `h-6 w-6 text-${actor.icon === 'Building' ? 'blue' : actor.icon === 'GraduationCap' ? 'green' : 'yellow'}-500` } />
                                    < CardTitle className = "text-lg font-semibold" >
                                        { actor.title }
                                        </CardTitle>
                                        </CardHeader>
                                        < CardContent >
                                        <ul className="space-y-2" >
                                        {
                                            actor.ventajas.map((ventaja, idx) => (
                                                <li key= { idx } className = "flex items-start" >
                                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                                            <span className="text-sm text-gray-300" > { ventaja } </span>
                                            </li>
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

export default VentajasActores_Cluster;