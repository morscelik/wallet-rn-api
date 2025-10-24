import express from "express";

import dotenv from "dotenv";
import { initDB } from "./config/db.js";
import { Result } from "pg";
import ratelimiter from "./middleware/rateLimiter.js";
import transactionsRoute from "./routes/transactionsRoute.js"
import job from "./config/cron.js"

const PORT = process.env.PORT || 5001;



const app = express();

if(process.env.NODE_ENV==="production") job.start()

//middlewares
app.use(ratelimiter)
app.use(express.json())


app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok"})
})

app.use("/api/transactions", transactionsRoute);
 

initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is up and running on PORT:", PORT);
  });
});

// app.listen(PORT, () => {
//   console.log("Server is up and running on PORT: ", PORT);
// });
