import { RequestHandler } from "express";
import { db } from "../db/index.js";
import { transactionsTable } from "../db/schema.js";
import { eq, desc } from "drizzle-orm";

export const createTransaction: RequestHandler = async (req, res) => {
  try {
    const { amount, type, description, accountId, categoryId, userId } =
      req.body;
    if (!amount || !type || !accountId || !userId) {
      return res.status(400).json({
        status: "fail",
        message: "amount, type, accountId and userId are required fields!",
      });
    }
    const [newTransaction] = await db
      .insert(transactionsTable)
      .values({
        amount: String(amount), // Drizzle numeric expects string/number
        type,
        description,
        accountId: Number(accountId),
        categoryId: categoryId ? Number(categoryId) : null,
        userId: Number(userId),
      })
      .returning();

    return res.status(201).json({
      status: "success",
      data: newTransaction,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to create transaction",
    });
  }
};

export const getAllTransactions: RequestHandler = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({
        status: "fail",
        message: "userId query parameter is required!",
      });
    }
    const transactions = await db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.userId, Number(userId)))
      .orderBy(desc(transactionsTable.createdAt));
    return res.status(200).json({
      status: "success",
      data: transactions,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch transactions",
    });
  }
};
