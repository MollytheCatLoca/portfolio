// app/api/clients/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prismaService } from '@/lib/prisma-service';

// Cache mechanism
interface CacheItem {
  data: any;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const OPERATION_TIMEOUT = 8000; // 8 seconds timeout
const cache = new Map<string, CacheItem>();

// Default clients to return if database fails
const DEFAULT_CLIENTS = [
  { id: 0, company_name: "SIN CLIENTE - Error de conexión" }
];

// Function to clean expired cache entries periodically
function cleanExpiredCache() {
  const now = Date.now();
  let cleaned = 0;
  
  for (const [key, item] of cache.entries()) {
    if (now - item.timestamp > CACHE_DURATION) {
      cache.delete(key);
      cleaned++;
    }
  }
  
  if (cleaned > 0) {
    console.log(`Cleaned ${cleaned} expired cache entries`);
  }
}

// Clean cache every 10 minutes
setInterval(cleanExpiredCache, 10 * 60 * 1000);

export async function GET(req: NextRequest) {
    const startTime = Date.now();
    const cacheKey = 'all-clients';
    
    // Check request headers for cache control
    const noCache = req.headers.get('x-no-cache') === 'true';
    
    if (!noCache) {
      // Check if we have a valid cache entry
      const cachedItem = cache.get(cacheKey);
      if (cachedItem && (Date.now() - cachedItem.timestamp) < CACHE_DURATION) {
          console.log(`Using cached clients data, age: ${(Date.now() - cachedItem.timestamp) / 1000}s`);
          return NextResponse.json(cachedItem.data, {
            headers: {
              'X-Data-Source': 'cache',
              'X-Cache-Age': `${(Date.now() - cachedItem.timestamp) / 1000}s`
            }
          });
      }
    } else {
      console.log('Cache bypass requested');
    }

    try {
        console.log('Fetching clients from database...');
        
        // Use our enhanced prisma service
        const clients = await prismaService.executeWithTimeout(
          async (prisma) => {
            return await prisma.clients.findMany({
              orderBy: {
                company_name: 'asc'
              }
            });
          }, 
          OPERATION_TIMEOUT
        );
        
        // Only update cache on successful fetch
        if (clients?.length > 0) {
          // Update cache with fresh data
          cache.set(cacheKey, { 
              data: clients, 
              timestamp: Date.now() 
          });
        }
        
        const duration = Date.now() - startTime;
        console.log(`Fetched ${clients.length} clients in ${duration}ms`);
        
        return NextResponse.json(clients, {
          headers: {
            'X-Response-Time': `${duration}ms`
          }
        });
    } catch (error) {
        console.error('Error fetching clients:', error);
        
        // Try to use stale cache if available
        const cachedItem = cache.get(cacheKey);
        if (cachedItem) {
            console.log('Returning stale cache data due to error');
            return NextResponse.json(cachedItem.data, {
                headers: {
                    'X-Data-Source': 'stale-cache',
                    'X-Cache-Age': `${(Date.now() - cachedItem.timestamp) / 1000}s`
                }
            });
        }
        
        // If no cache available, return default clients to prevent UI crashes
        console.log('No cache available, returning default clients');
        return NextResponse.json(DEFAULT_CLIENTS, { 
            headers: {
                'X-Data-Source': 'default',
                'X-Error': error.message
            }
        });
    }
}

// Add endpoint for creating clients
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        
        if (!data.company_name) {
            return NextResponse.json({ 
                message: 'Company name is required', 
                success: false 
            }, { status: 400 });
        }
        
        // Check for duplicates first
        const existingClient = await prismaService.executeWithTimeout(
          async (prisma) => {
            return await prisma.clients.findFirst({
              where: {
                company_name: data.company_name
              }
            });
          }
        );
        
        if (existingClient) {
          return NextResponse.json({
            message: 'Client with this name already exists',
            client: existingClient,
            success: false
          }, { status: 409 });
        }
        
        // Create the new client
        const newClient = await prismaService.executeWithTimeout(
          async (prisma) => {
            return await prisma.clients.create({
              data: {
                company_name: data.company_name
              }
            });
          }
        );
        
        // Invalidate cache on successful creation
        cache.delete('all-clients');
        
        return NextResponse.json({
            message: 'Client created successfully',
            client: newClient,
            success: true
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating client:', error);
        return NextResponse.json({ 
            message: 'Error creating client', 
            error: error.message,
            success: false 
        }, { status: 500 });
    }
}