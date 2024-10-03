"use client"

// app/old-page/page.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const OldPageRedirect = () => {
    const router = useRouter();
    const newPath = '/vial'; // La nueva ruta a la que quieres redirigir

    useEffect(() => {
        router.replace(newPath);
    }, [router, newPath]);

    return null; // No renderiza ningún contenido
};

export default OldPageRedirect;
