// lib/prisma-service.ts
import { PrismaClient } from '@prisma/client';

/**
 * Enhanced Prisma Service with timeout handling, connection management, and error recovery
 */
class PrismaService {
  private static instance: PrismaService;
  private prisma: PrismaClient;
  private isConnected: boolean = false;
  private connectionAttempts: number = 0;
  private readonly MAX_ATTEMPTS = 3;
  private readonly RECONNECT_DELAY = 3000; // 3 seconds
  private readonly DEFAULT_TIMEOUT = 10000; // 10 seconds

  private constructor() {
    this.prisma = new PrismaClient({
      log: ['error', 'warn'],
    });
    
    // Set up connection listeners
    this.setupListeners();
  }

  private setupListeners() {
    // These middleware hooks help detect connection issues
    this.prisma.$use(async (params, next) => {
      try {
        return await next(params);
      } catch (error) {
        console.error(`Prisma error in ${params.model}.${params.action}:`, error);
        
        // Check if it's a connection error
        if (
          error.message.includes('connection') || 
          error.message.includes('timeout') || 
          error.message.includes('ECONNREFUSED')
        ) {
          this.isConnected = false;
          this.attemptReconnect();
        }
        
        throw error;
      }
    });
  }

  private async attemptReconnect() {
    if (this.connectionAttempts >= this.MAX_ATTEMPTS) {
      console.error('Maximum Prisma reconnection attempts reached.');
      return;
    }

    this.connectionAttempts++;
    console.log(`Attempting to reconnect to database (attempt ${this.connectionAttempts})`);

    setTimeout(async () => {
      try {
        // Test the connection
        await this.prisma.$connect();
        this.isConnected = true;
        this.connectionAttempts = 0;
        console.log('Reconnected to database successfully');
      } catch (error) {
        console.error('Failed to reconnect to database:', error);
        this.attemptReconnect();
      }
    }, this.RECONNECT_DELAY);
  }

  public static getInstance(): PrismaService {
    if (!PrismaService.instance) {
      PrismaService.instance = new PrismaService();
    }
    return PrismaService.instance;
  }

  /**
   * Execute a Prisma operation with timeout safeguard
   */
  public async executeWithTimeout<T>(
    operation: (prisma: PrismaClient) => Promise<T>,
    timeout: number = this.DEFAULT_TIMEOUT
  ): Promise<T> {
    // Set up the timeout promise
    const timeoutPromise = new Promise<never>((_, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject(new Error(`Database operation timed out after ${timeout}ms`));
      }, timeout);
    });

    try {
      // Try to reconnect if not connected
      if (!this.isConnected) {
        try {
          await this.prisma.$connect();
          this.isConnected = true;
        } catch (error) {
          console.error('Error connecting to database:', error);
        }
      }

      // Execute the operation with timeout
      return await Promise.race([
        operation(this.prisma),
        timeoutPromise
      ]);
    } catch (error) {
      console.error('Prisma operation failed:', error);
      
      // Additional connection handling happens in middleware
      
      throw error;
    }
  }

  /**
   * Gracefully disconnect from database
   */
  public async disconnect(): Promise<void> {
    try {
      await this.prisma.$disconnect();
      this.isConnected = false;
    } catch (error) {
      console.error('Error disconnecting from database:', error);
    }
  }
}

// Export a singleton instance
export const prismaService = PrismaService.getInstance();