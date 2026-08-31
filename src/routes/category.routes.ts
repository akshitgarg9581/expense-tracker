import { Router } from "express";
import { getAllCategories, createCategories } from "../controllers/category.controller.js";

const router = Router();

router.get('/',getAllCategories);
router.post('/',createCategories);

export default router;