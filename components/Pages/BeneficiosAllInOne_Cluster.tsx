import React from 'react';
import { Card, CardContent } from '@/components/ui/Card3';
import { Zap, DollarSign, Shield, Network, Wrench } from 'lucide-react';

const iconMap = {
    Zap: Zap,
    DollarSign: DollarSign,
    Shield: Shield,
    Network: Network,
    Wrench: Wrench
};

const BeneficiosAllInOne_Cluster: React.FC<{ data: any, transform?: string }> = ({ data, transform = 'scale(1)' }) => {


    const { title, beneficios } = data.beneficiosAllInOne;

    return (
        <div className= "space-y-3 text-white bg-[#121212] p-3" style = {{ transform }
}>
    <h2 className="text-2xl font-bold mb-3 mt-5" >
        <span className="text-blue-500" > { title } </span>
            </h2>
            < div className = "grid grid-cols-1 gap-3" style = {{ transform: 'scale(0.95)' }}>
            {
                beneficios.map((beneficio, index) => {
                    const IconComponent = iconMap[beneficio.icon];
                    return (
                        <Card key= { index } className = "bg-gray-800 border-gray-700" >
                            <CardContent className="p-3" >
                                <div className="flex items-center space-x-3 mb-2" >
                                    <IconComponent className={ `h-5 w-5 text-${beneficio.icon === 'Zap' ? 'yellow' : beneficio.icon === 'DollarSign' ? 'green' : beneficio.icon === 'Shield' ? 'blue' : beneficio.icon === 'Network' ? 'purple' : 'orange'}-500` } />
                                        < h3 className = "text-lg font-semibold" > { beneficio.title } </h3>
                                            </div>
                                            < div className = "space-y-1" >
                                            {
                                                beneficio.description.map((desc, i) => (
                                                    <p key= { i } className = "text-sm text-gray-300" >
                                                        { i === 0 ? <strong>{ desc } </strong> : desc}
                                                </p>
                  ))
            }
                </div>
                </CardContent>
                </Card>
          );
        })}
</div>
    </div>
  );
};

export default BeneficiosAllInOne_Cluster;