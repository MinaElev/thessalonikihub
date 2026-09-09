import { PrismaClient } from "@prisma/client";

// Prisma client singleton — avoids creating a new connection on every hot
// reload in development.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

/** True when a database connection is configured. */
export const isDbConfigured = Boolean(process.env.DATABASE_URL);
