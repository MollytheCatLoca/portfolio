import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

// Get base URL dynamically from environment variables
const getApiBaseUrl = () => {
  const serverUrl = process.env.API_SERVER_URL || 'http://82.29.58.172';
  const serverPort = process.env.API_SERVER_PORT || '8001';
  return `${serverUrl}:${serverPort}`;
};

const DEBUG_MODE = 1; // 1 para usar datos de Heroku, 2 para usar datos locales
const TIMEOUT = 60000; // 60 segundos de timeout
const CACHE_EXPIRATION = 3; // 1 hora en milisegundos

interface CacheItem {
    data: any;
    timestamp: number;
}

const cache = new Map<string, CacheItem>();

async function getLocalData() {
    const filePath = path.join(process.cwd(), 'data', 'parquesSolaresEscenariosAAA.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
}

async function fetchFromHeroku(url: string, data: any, options: any) {
    const response = await axios({
        method: 'post',
        url: url,
        ...options,
        data: JSON.stringify(data)
    });
    return response.data;
}

function getCacheKey(data: any): string {
    return `${data.provincia}-${data.localidad}-${data.capacidad}-${data.latitud}-${data.longitud}-${data.scenarioId}`;
}

function isCacheValid(cacheItem: CacheItem): boolean {
    return Date.now() - cacheItem.timestamp < CACHE_EXPIRATION;
}

export async function POST(req: NextRequest) {
    console.log("API route: POST request received");
    const startTime = Date.now();
    try {
        const requestData = await req.json();

        const data = {
            provincia: requestData.provincia || "Test",
            localidad: requestData.localidad || "Test",
            capacidad: requestData.capacidad || 1,
            area: requestData.area || 100000,
            latitud: requestData.latitud || -27.5269702,
            longitud: requestData.longitud || -58.76592117375753,
            scenarioId: requestData.scenarioId || ""
        };

        console.log("API route: Using data");

        const cacheKey = getCacheKey(data);
        const cachedItem = cache.get(cacheKey);

        if (cachedItem && isCacheValid(cachedItem)) {
            console.log('API route: Returning cached data');
            return NextResponse.json(cachedItem.data);
        }

        let responseData;

        if (DEBUG_MODE === 1) {
            // Use dynamic API base URL
            const solarParksUrl = `${getApiBaseUrl()}/solar-parks`;

            const auth = {
                username: process.env.API_USERNAME || '',
                password: process.env.API_PASSWORD || ''
            };

            console.log('API route: Requesting data from API server');

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

            try {
                responseData = await fetchFromHeroku(solarParksUrl, data, {
                    auth: auth,
                    timeout: TIMEOUT,
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log('API route: Received response from API server');
                console.log(responseData);
                // Guardar en caché
                cache.set(cacheKey, { data: responseData, timestamp: Date.now() });
            } catch (axiosError: any) {
                console.error('API route: Axios error:', axiosError.message);
                if (axiosError.response) {
                    console.error('API route: Axios error response:', axiosError.response.data);
                    console.error('API route: Axios error status:', axiosError.response.status);
                    console.error('API route: Axios error headers:', axiosError.response.headers);
                } else if (axiosError.request) {
                    console.error('API route: No response received:', axiosError.request);
                } else {
                    console.error('API route: Error setting up request:', axiosError.message);
                }
                throw axiosError;
            } finally {
                clearTimeout(timeoutId);
            }
        } else if (DEBUG_MODE === 2) {
            console.log('API route: Reading local data');
            responseData = await getLocalData();
            console.log('API route: Local data read successfully');
        } else {
            throw new Error('Invalid DEBUG_MODE');
        }

        console.log('API route: Data structure OK');
        const endTime = Date.now();
        const processingTime = (endTime - startTime) / 1000;
        console.log(`API route: Total processing time: ${processingTime} seconds`);

        return NextResponse.json(responseData);
    } catch (error: any) {
        console.error('API route: Error fetching solar parks data:', error);

        return NextResponse.json(
            { error: 'An unexpected error occurred', details: error.message },
            { status: 500 }
        );
    }
}