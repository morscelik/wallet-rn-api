import { Redis } from "@upstash/redis";
import pkg from "@upstash/ratelimit";
const { Ratelimit } = pkg;

import "dotenv/config";

const redis = Redis.fromEnv();

// sliding window limiter
export const rateLimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(50, "30 s"), // 30 saniyede 4 istek
});
