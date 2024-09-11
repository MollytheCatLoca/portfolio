// types/solarPark.ts
export interface Ubicacion {
    ciudad: string;
    provincia: string;
    latitud: number;
    longitud: number;
}

export interface Terreno {
    superficie: number;
    topografia: string;
    acceso: string;
}

export interface ParqueSolar {
    nombre: string;
    ubicacion: Ubicacion;
    potencia: number;
    terreno: Terreno;
    // Añade aquí otros campos necesarios
}