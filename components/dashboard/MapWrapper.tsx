"use client"

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./SimpleDynamicMap'), {
    ssr: false,
    loading: () => <p>Cargando mapa...</p>
});

type MapWrapperProps = {
    lat: number;
    lon: number;
    ciudad: string;
};

const MapWrapper: React.FC<MapWrapperProps> = ({ lat, lon, ciudad }) => {
    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(prevKey => prevKey + 1);
    }, [lat, lon, ciudad]);

    return (
        <DynamicMap 
            key= { key }
    lat = { lat }
    lon = { lon }
    ciudad = { ciudad }
        />
    );
};

export default MapWrapper;