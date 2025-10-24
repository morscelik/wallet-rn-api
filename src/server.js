import express from "express";

import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import { Result } from "pg";
import ratelimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js"

const PORT = process.env.PORT || 5001;

const app = express();

//middlewares
app.use(ratelimiter)
app.use(express.json())




app.use("/api/transactions", transactionsRoute);
 

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running on PORT:", PORT);
  });
});

// app.listen(PORT, () => {
//   console.log("Server is up and running on PORT: ", PORT);
// });
