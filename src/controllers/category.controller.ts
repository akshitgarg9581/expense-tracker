import { RequestHandler } from "express";
import { db } from "../db/index.js";
import { categoriesTable } from "../db/schema.js";
import { isNull, eq, or } from "drizzle-orm";

export const getAllCategories: RequestHandler = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      const categories = await db
        .select()
        .from(categoriesTable)
        .where(isNull(categoriesTable.userId));
      return res.status(200).json({ status: "success", data: categories });
    } else {
      const categories = await db
        .select()
        .from(categoriesTable)
        .where(
          or(
            isNull(categoriesTable.userId),
            eq(categoriesTable.userId, Number(userId)),
          ),
        );
      return res.status(200).json({ status: "success", data: categories });
    }
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch categories",
    });
  }
};

export const createCategories: RequestHandler = async (req, res) => {
  try {
    const { name, type, userId } = req.body;
    if (!name || !type) {
      return res.status(400).json({
        status: "fail",
        message: "Name and type (EXPENSE or INCOME) is required",
      });
    }
    const [newCategory] = await db
      .insert(categoriesTable)
      .values({ name, type, userId }).returning();

    return res.status(201).json({
      status: "success",
      data: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to create category",
    });
  }
};
