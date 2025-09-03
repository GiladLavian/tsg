import { PrismaClient } from '@prisma/client';

// Create a global variable to store the Prisma client instance
declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

// Create Prisma client instance
export const prisma = globalThis.__prisma || new PrismaClient();

// In development, store the instance globally to prevent multiple instances
if (process.env.NODE_ENV === 'development') {
  globalThis.__prisma = prisma;
}
