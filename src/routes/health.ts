import { Router, type IRouter } from "express";
import { z } from "zod";
import { isDatabaseConfigured } from "../db/index.js";

const HealthCheckResponse = z.object({
  status: z.string(),
  database: z.enum(["configured", "unavailable"]),
});

const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({
    status: isDatabaseConfigured ? "ok" : "degraded",
    database: isDatabaseConfigured ? "configured" : "unavailable",
  });
  res.json(data);
});

export default router;
