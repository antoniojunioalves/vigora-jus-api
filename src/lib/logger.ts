import pino from "pino";

const isProduction = process.env.NODE_ENV === "production";
const isVercel = process.env.VERCEL === "1";
const usePrettyTransport =
  !isProduction && !isVercel && Boolean(process.stdout.isTTY);

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  redact: [
    "req.headers.authorization",
    "req.headers.cookie",
    "res.headers['set-cookie']",
  ],
  ...(usePrettyTransport
    ? {
        transport: {
          target: "pino-pretty",
          options: { colorize: true },
        },
      }
    : {}),
});
