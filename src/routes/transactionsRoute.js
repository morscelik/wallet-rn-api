import express from "express";
import { sql } from "../config/db.js"
import {getTransactionsByUserId, createTransactions,deleteTransaction, getSummary  } from "../controllers/transactionsController.js"

const router = express.Router()


router.get("/:userId", getTransactionsByUserId)

router.post("/", createTransactions)

router.delete("/:id", deleteTransaction)

router.get("/summary/:userId", getSummary)

export default router;