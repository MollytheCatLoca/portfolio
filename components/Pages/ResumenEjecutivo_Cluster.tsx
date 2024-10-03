import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3';
import { AlertTriangle, Lightbulb, Sun, DollarSign, Battery, Zap, Building } from 'lucide-react';

const iconMap = {
    Sun: Sun,
    Battery: Battery,
    Zap: Zap,
    Building: Building,
    DollarSign: DollarSign,
};

const ResumenEjecutivo_Cluster: React.FC<{ data: any, transform?: string }> = ({ data, transform = 'scale(1)' }) => {
    const { title, problematica, solucionPropuesta } = data.resumenEjecutivo;

    return (
        <div className= "space-y-2 text-white bg-[#121212] p-4" style = {{ transform: 'scale(0.95)' }
}>
    <h2 className="text-2xl font-bold mb-2 mt-2" >
        <span className="text-blue-500" > { title.split(':')[0] }: </span> {title.split(':')[1]}
            </h2>

            < Card className = "bg-gray-800 border-gray-700 mb-2" style = {{ transform: 'scale(0.90)' }}>
                <CardHeader>
                <CardTitle className="flex items-center text-lg font-semibold text-red-500" >
                    <AlertTriangle className="h-6 w-6 mr-2" />
                        Problemática
                        </CardTitle>
                        </CardHeader>
                        < CardContent >
                        <p className="text-sm" > { problematica } </p>
                            </CardContent>
                            </Card>

                            < Card className = "bg-gray-800 border-gray-700" style = {{ transform: 'scale(0.90)' }}>
                                <CardHeader>
                                <CardTitle className="flex items-center text-lg font-semibold text-green-500" >
                                    <Lightbulb className="h-6 w-6 mr-2" />
                                        Solución Propuesta
                                            </CardTitle>
                                            </CardHeader>
                                            < CardContent >
                                            <div className="grid grid-cols-1 gap-2" >
                                            {
                                                solucionPropuesta.map((item, index) => {
                                                    const IconComponent = iconMap[item.icon];
                                                    return (
                                                        <Card key= { index } className = "bg-gray-700 border-gray-600" >
                                                            <CardHeader className="flex flex-row items-center space-x-2 p-3" >
                                                                <IconComponent className="h-6 w-6 text-yellow-500" />
                                                                    <CardTitle className="text-md font-semibold" > { item.title } </CardTitle>
                                                                        </CardHeader>
                                                                        < CardContent className = "pt-0 pb-3 px-3" >
                                                                            <p className="text-sm text-gray-300" > { item.description } </p>
                                                                                </CardContent>
                                                                                </Card>
              );
                                            })}
</div>
    </CardContent>
    </Card>
    </div>
  );
};

export default ResumenEjecutivo_Cluster;
