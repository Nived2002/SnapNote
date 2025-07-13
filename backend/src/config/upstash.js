import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import dotenv from "dotenv";

dotenv.config();

const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),                        // Connects to your Redis instance using env vars
    limiter: Ratelimit.slidingWindow(10, "20 s")  // Allows 100 requests per 60 seconds (sliding window)
});

export default ratelimit;
