import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

export const isDatabaseConfigured = Boolean(databaseUrl);

function createUnavailableProxy<T extends object>(resourceName: string): T {
  return new Proxy(
    {},
    {
      get() {
        throw new Error(
          `${resourceName} is unavailable because DATABASE_URL is not configured.`,
        );
      },
    },
  ) as T;
}

const configuredPool = databaseUrl
  ? new Pool({ connectionString: databaseUrl })
  : null;

const configuredDb = configuredPool ? drizzle(configuredPool, { schema }) : null;

export const pool =
  configuredPool ?? createUnavailableProxy<pg.Pool>("Database pool");
export const db =
  configuredDb ??
  createUnavailableProxy<NonNullable<typeof configuredDb>>("Database");

export * from "./schema";
