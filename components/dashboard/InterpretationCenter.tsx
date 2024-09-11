"use client"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card3'
import { CalendarIcon, BookOpenIcon, UsersIcon } from 'lucide-react'

// Datos hipotéticos para el Centro de Interpretación
const centroInterpretacionData = {
    descripcion: "El Centro de Interpretación Ambiental del Parque Solar ofrece una experiencia educativa interactiva sobre energía renovable y sostenibilidad.",
    actividades: [
        "Visitas guiadas al parque solar",
        "Talleres de energía renovable",
        "Exhibiciones interactivas sobre cambio climático",
        "Programas educativos para escuelas"
    ],
    eventos: [
        { fecha: "2024-09-15", nombre: "Día de la Energía Solar" },
        { fecha: "2024-10-22", nombre: "Feria de Ciencias Renovables" },
        { fecha: "2024-11-05", nombre: "Taller de Construcción de Paneles Solares" }
    ]
}

export default function InterpretationCenter() {
    return (
        <section id= "centro-interpretacion" className = "mt-8" >
            <Card className="bg-black-200 border-gray-800" >
                <CardHeader>
                <CardTitle className="text-xl font-bold text-white" > Centro de Interpretación Ambiental </CardTitle>
                    </CardHeader>
                    < CardContent >
                    <p className="text-gray-300 mb-4" > { centroInterpretacionData.descripcion } </p>
                        < div className = "grid grid-cols-1 md:grid-cols-2 gap-6" >
                            <div>
                            <h3 className="text-lg font-semibold text-white mb-2 flex items-center" >
                                <BookOpenIcon className="h-5 w-5 mr-2 text-blue-500" />
                                    Actividades Educativas
                                        </h3>
                                        < ul className = "list-disc list-inside text-gray-300" >
                                        {
                                            centroInterpretacionData.actividades.map((actividad, index) => (
                                                <li key= { index } > { actividad } </li>
                                            ))
                                        }
                                            </ul>
                                            </div>
                                            < div >
                                            <h3 className="text-lg font-semibold text-white mb-2 flex items-center" >
                                                <CalendarIcon className="h-5 w-5 mr-2 text-green-500" />
                                                    Próximos Eventos
                                                        </h3>
                                                        < ul className = "space-y-2" >
                                                        {
                                                            centroInterpretacionData.eventos.map((evento, index) => (
                                                                <li key= { index } className = "flex items-center" >
                                                                <UsersIcon className="h-4 w-4 mr-2 text-yellow-500" />
                                                            <span className="text-gray-400" > { new Date(evento.fecha).toLocaleDateString() } </span>
                                                            < span className = "text-white ml-2" > { evento.nombre } </span>
                                                            </li>
                                                            ))
                                                        }
                                                            </ul>
                                                            </div>
                                                            </div>
                                                            </CardContent>
                                                            </Card>
                                                            </section>
  )
}