import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { Users, Building, Sun, Zap } from 'lucide-react';

const iconMap = {
    Users: Users,
    Building: Building,
    Sun: Sun,
    Zap: Zap
};

const ClusterGeneradorResumen_Dynamic: React.FC<{ data: any, transform?: string }> = ({ data, transform = 'scale(1)' }) => {


    const { title, subtitle, caracteristicas } = data.clusterGeneradorResumen;

    return (
        <div className= "space-y-4 text-white bg-[#121212] p-4 mt-20" >
        <h2 className="text-2xl font-bold mb-4" >
            <span className="text-blue-500" > { title.split(' en ')[0] } </span> en {title.split(' en ')[1]}
                </h2>
                < p className = "text-sm text-gray-300 mb-4" style = {{ transform: 'scale(0.95)' }
}>
    { subtitle }
    </p>
    < div className = "grid grid-cols-2 gap-4" >
    {
        caracteristicas.map((caract, index) => (
            <FeatureCard key= { index } { ...caract } />
        ))
    }
        </div>
        </div>
  );
};

const FeatureCard = ({ icon, title, details }) => {
    const IconComponent = iconMap[icon];
    return (
        <Card className= "bg-gray-800 border-gray-700" >
        <CardHeader className="flex items-center space-x-2 p-2" >
            <IconComponent className={ `h-5 w-5 text-${icon === 'Users' ? 'blue' : icon === 'Building' ? 'green' : icon === 'Sun' ? 'yellow' : 'purple'}-500` } />
                < CardTitle className = "text-sm font-semibold text-white" > { title } </CardTitle>
                    </CardHeader>
                    < CardContent className = "p-4" >
                        <ul className="space-y-1" >
                        {
                            details.map((detail, index) => (
                                <li key= { index } className = "flex items-start" >
                                <span className="text-green-500 mr-2" >•</span>
                            < span className = "text-xs text-gray-400" > { detail } </span>
                            </li>
                            ))
                        }
                            </ul>
                            </CardContent>
                            </Card>
  );
};

export default ClusterGeneradorResumen_Dynamic;