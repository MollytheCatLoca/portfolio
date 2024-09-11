"use client"

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/images/marker-icon-2x.png',
    iconUrl: '/leaflet/images/marker-icon.png',
    shadowUrl: '/leaflet/images/marker-shadow.png',
});

type SimpleDynamicMapProps = {
    lat: number;
    lon: number;
    ciudad: string;
};

const SimpleDynamicMap: React.FC<SimpleDynamicMapProps> = ({ lat, lon, ciudad }) => {
    const mapContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapContainerRef.current) return;

        const map = L.map(mapContainerRef.current).setView([lat, lon], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.marker([lat, lon]).addTo(map)
            .bindPopup(`Parque Solar en ${ciudad}`)
            .openPopup();

        return () => {
            map.remove();
        };
    }, [lat, lon, ciudad]);

    return <div ref={ mapContainerRef } style = {{ height: '400px', width: '100%' }
} />;
};

export default SimpleDynamicMap;