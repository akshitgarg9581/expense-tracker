import { Router } from "express";
import {
  createTransaction,
  getAllTransactions,
} from "../controllers/transaction.controller.js";

const router = Router();

router.get("/", getAllTransactions);
router.post("/", createTransaction);

export default router;
