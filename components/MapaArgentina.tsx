import React, { useState, useRef } from 'react';
import { Circle } from 'lucide-react';
import provinciasData from '../data/provinciasData';

interface Provincia {
    type: "Feature";
    properties: {
        nombre: string;
    };
    geometry: {
        type: "Polygon";
        coordinates: number[][][];
    };
}

interface ProvinciasData {
    type: "FeatureCollection";
    features: Provincia[];
}

const partners = [
    {
        name: "BIS Integraciones",
        coordinates: [-59.216, -34.6037],
        city: "Buenos Aires",
        phone: "+54 11 5121-3012",
        address: "Av. Cerrito 1054 6°",
        web: "www.bisintegraciones.com",
        email: "info@bisintegraciones.com"
    },
    {
        name: "Córdoba Tech",
        coordinates: [-64.1836, -31.6135],
        city: "Córdoba",
        phone: "+54 351 987-6543",
        address: "Bv. San Juan 567, Córdoba",
        web: "www.cordobatech.com",
        email: "contacto@cordobatech.com"
    },
    {
        name: "Mendoza Innovations",
        coordinates: [-68.6672, -34.1908],
        city: "Mendoza",
        phone: "+54 261 555-1212",
        address: "Av. San Martín 890, Mendoza",
        web: "www.mendozainnovations.com",
        email: "hello@mdzainnovations.com"
    },
    {
        name: "Tucumán Digital",
        coordinates: [-65.6226, -26.6083],
        city: "Tucumán",
        phone: "+54 381 444-3333",
        address: "Calle 25 de Mayo 400, San Miguel de Tucumán",
        web: "www.tucumandigital.com",
        email: "info@tucumandigital.com"
    },
    {
        name: "Salta Solutions",
        coordinates: [-65.8117, -24.7859],
        city: "Salta",
        phone: "+54 387 222-1111",
        address: "Av. Belgrano 1500, Salta",
        web: "www.saltasolutions.com",
        email: "contact@saltasolutions.com"
    },
    {
        name: "Grupo BUEN AIRE",
        coordinates: [-69.9991, -38.1516],
        city: "Neuquén",
        phone: "+54 911 3780-1289",
        address: "Int. Carro 1320",
        web: "www.neuquentechhub.com",
        email: "info@grupobuenaire.com"
    },
    {
        name: "SINERGIA GROUP S.R.L",
        coordinates: [-66.3378, -33.3012],  // Coordenadas de la ciudad de San Luis, Argentina
        city: "San Luis",
        phone: "+54 11 3407-6585",  // Teléfono de BIS Integraciones
        address: "Ángel Gallardo N° 421, Piso 5°",
        email: "info@sinergiagroup.com.ar"
    },

    {
        name: "Catamarca Innovate",
        coordinates: [-67.7795, -26.6083],
        city: "Catamarca",
        phone: "+54 383 666-8888",
        address: "Calle Rivadavia 750, San Fernando del Valle de Catamarca",
        web: "www.catamarcannovate.com",
        email: "hello@catamarcainnovate.com"
    }
];

const MapaArgentina: React.FC = () => {
    const [tooltipContent, setTooltipContent] = useState("");
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [activeProvince, setActiveProvince] = useState("Buenos Aires"); // Inicializar con "Buenos Aires"
    const [selectedPartner, setSelectedPartner] = useState(partners[0]); // Inicializar con "Partner 1" (BIS Integraciones)

    const mapRef = useRef<SVGSVGElement>(null);

    const customStyle = {
        backdropFilter: "blur(16px) saturate(180%)",
        backgroundColor: "rgba(17, 25, 40, 0.75)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.125)",
    };

    const projectToSVG = (lon: number, lat: number): [number, number] => {
        const x = (lon + 80) * 30;
        const y = (-lat - 22) * 36;
        return [x, y];
    };

    const adjustMarkerPosition = (x: number, y: number, width: number, height: number): [number, number] => {
        const adjustedX = Math.max(10, Math.min(x, width - 10));
        const adjustedY = Math.max(10, Math.min(y, height - 10));
        return [adjustedX, adjustedY];
    };

    const createPathD = (coordinates: number[][][]): string => {
        if (!coordinates || coordinates.length === 0 || coordinates[0].length === 0) {
            return '';
        }
        return coordinates[0].map((coord, i) => {
            const [x, y] = projectToSVG(coord[0], coord[1]);
            return `${i === 0 ? 'M' : 'L'}${x},${y}`;
        }).join(' ') + 'Z';
    };

    const handleMouseEnter = (nombre: string, event: React.MouseEvent<SVGPathElement>) => {
        if (mapRef.current) {
            const rect = mapRef.current.getBoundingClientRect();
            setTooltipContent(nombre || "BIS Integraciones");
            setTooltipPosition({
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            });
        }
        //setActiveProvince(nombre || "BIS Integraciones");
    };

    const handleMouseLeave = () => {
        setTooltipContent("");
        //setActiveProvince("");
    };

    const handleProvinceClick = (nombre: string) => {
        const partner = partners.find(p => p.city === nombre);
        if (partner) {
            setSelectedPartner(partner);
        } else {
            setSelectedPartner(partners[0]); // Selecciona "Partner 1" (BIS Integraciones) si no se encuentra otro partner
        }
        setActiveProvince(nombre);
    };

    return (
        <div className= "w-full max-w-4xl mx-auto mb-20 p-4 md:p-12 relative" >
        <div className="bg-[#111928] rounded-3xl overflow-hidden shadow-lg" style = { customStyle } >
            <div className="p-4 md:p-6 text-white" >
                <h2 className="text-xl md:text-2xl font-bold mb-4 text-center" > Nuestros Partners en Argentina </h2>
                    < div className = "flex flex-col md:flex-row" >
                        <div className="relative w-full md:w-70% h-[400px] md:h-[600px]" >
                            <svg
                                ref={ mapRef }
    viewBox = "0 0 1000 1200"
    className = "absolute top-0 left-0 w-full h-full"
    preserveAspectRatio = "xMidYMid meet"
        >
        {/* Renderización de las provincias */ }
    {
        provinciasData.features.flatMap((featureCollection) =>
            featureCollection.features.map((provincia) => {
                if (provincia && provincia.geometry && provincia.geometry.coordinates) {
                    return (
                        <path
                                                    key= { provincia.properties.nombre }
                    d = { createPathD(provincia.geometry.coordinates)}
    className = {`
                                                        ${activeProvince === provincia.properties.nombre ? 'fill-[#4a4ae2]' : 'fill-[#1b1b3a]'}
                                                        stroke-white stroke-[0.5] transition-colors duration-200 hover:fill-[#3b3be0]
                                                    `}
onMouseEnter = {(e) => handleMouseEnter(provincia.properties.nombre, e)}
onMouseLeave = { handleMouseLeave }
onClick = {() => handleProvinceClick(provincia.properties.nombre)}
                                                />
                                            );
                                        }
return null;
                                    })
                                )}
{/* Renderización de los partners */ }
{
    partners.map((partner) => {
        const [x, y] = projectToSVG(partner.coordinates[0], partner.coordinates[1]);
        const [adjustedX, adjustedY] = adjustMarkerPosition(x, y, 1000, 1200);
        return (
            <g key= { partner.name } >
            <Circle
                                                x={ adjustedX }
        y = { adjustedY }
        r = { 5}
        className = "fill-[#4a4ae2] stroke-white stroke-2"
            />
            </g>
                                    );
})}
</svg>

{/* Tooltip */ }
{
    tooltipContent && (
        <div
                                    className="absolute bg-[#1b1b3a] text-white p-2 rounded-xl text-sm pointer-events-none z-10"
    style = {{
        top: tooltipPosition.y,
            left: tooltipPosition.x,
                transform: 'translate(-50%, -100%)',
                                    }
}
                                >
    { tooltipContent }
    </div>
                            )}
</div>
    </div>
    </div>
    </div>

{/* Contenedor para la Card flotante */ }
{
    selectedPartner && (
        <div
        className="absolute"
    style = {{
        bottom: 'calc(8% + 1px)',  // Ajusta la posición en Y de manera relativa
            right: 'calc(8% + 1px)',   // Ajusta la posición en X de manera rela
                width: '35%',    // Ancho de la tarjeta, puedes ajustar este valor
                    padding: '1px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                            borderRadius: '10px',
                                backgroundColor: '#1b1b3a',
                                    transformOrigin: 'bottom right', // Cambia el origen de transformación si es necesario
                                        zIndex: 20,  // Asegura que la tarjeta esté sobre otros elementos
        }
}
    >
    <div className="w-full h-full bg-[#1b1b3a] p-2 rounded-xl shadow-lg text-center flex flex-col justify-center" >
        <h3 className="text-sm font-bold mb-2" > { selectedPartner.name } </h3>
            < p className = "text-[0.5rem] md: text-xs lg:text-sm" > { selectedPartner.city } </p>
                < p className = "text-[0.5rem] md:text-xs lg:text-sm" > Tel: { selectedPartner.phone } </p>
                    < p className = "text-[0.5rem] md:text-xs lg:text-sm" > { selectedPartner.address } </p>
                        < p className = "text-[0.4rem] text-center md:text-xs lg:text-sm" > { selectedPartner.email } </p>

                            </div>
                            </div>
)}

</div>
    );
};

export default MapaArgentina;
