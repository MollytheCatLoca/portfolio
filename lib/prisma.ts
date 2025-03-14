// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Check if we're in production to keep PrismaClient instances to a minimum
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Create a singleton Prisma client instance
export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
});

// Only assign to global object in development to prevent hot reloading issues
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Export for backward compatibility with existing code
export { prisma as default };