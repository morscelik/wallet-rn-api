import { rateLimit } from "../config/upStash.js";

const ratelimiter = async (req, res, next) => {
  try {
    const { success } = await rateLimit.limit(req.ip); // her IP için limit

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }
    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default ratelimiter;
