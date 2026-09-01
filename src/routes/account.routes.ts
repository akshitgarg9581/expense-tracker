import { Router } from "express";
import {
  getUserAccounts,
  createAccount,
} from "../controllers/account.controller.js";

const router = Router();

router.get("/", getUserAccounts);
router.post("/", createAccount);

export default router;
