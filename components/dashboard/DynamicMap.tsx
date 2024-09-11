import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
    iconUrl: '/leaflet//images/marker-icon.png',
    shadowUrl: '/leaflet/images/marker-shadow.png',
});

type DynamicMapProps = {
    lat: number;
    lon: number;
    ciudad: string;
};

const DynamicMap: React.FC<DynamicMapProps> = ({ lat, lon, ciudad }) => {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Función para destruir el mapa
        const destroyMap = () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };

        // Destruir el mapa existente
        destroyMap();

        // Crear un nuevo mapa
        if (mapContainerRef.current && !mapRef.current) {
            mapRef.current = L.map(mapContainerRef.current).setView([lat, lon], 13);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(mapRef.current);

            L.marker([lat, lon]).addTo(mapRef.current)
                .bindPopup(`Parque Solar en ${ciudad}`)
                .openPopup();
        }

        // Limpiar al desmontar
        return () => {
            destroyMap();
        };
    }, [lat, lon, ciudad]);

    return <div ref={ mapContainerRef } style = {{ height: '400px', width: '100%' }
} />;
};

export default DynamicMap;