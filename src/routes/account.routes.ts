import { Router } from "express";
import {
  getAllAccounts,
  createAccount,
} from "../controllers/account.controller.js";

const router = Router();

router.get("/", getAllAccounts);
router.post("/", createAccount);

export default router;
