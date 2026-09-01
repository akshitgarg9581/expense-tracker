import { RequestHandler } from "express";
import { db } from "../db/index.js";
import { accountsTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const getUserAccounts: RequestHandler = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({
        status: "fail",
        message: "userId parameter is required!",
      });
    }
    const account = await db
      .select()
      .from(accountsTable)
      .where(eq(accountsTable.userId, Number(userId)));
    return res.status(200).json({
      status: "success",
      data: account,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to fetch account details",
    });
  }
};

export const createAccount: RequestHandler = async (req, res) => {
  try {
    const { name, userId } = req.body;
    if (!name || !userId) {
      return res.status(400).json({
        status: "fail",
        message: "name and userId are required fields!",
      });
    }
    const [newAccount] = await db
      .insert(accountsTable)
      .values({ name, userId })
      .returning();
    return res.status(201).json({
      status: "success",
      data: newAccount,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to create account",
    });
  }
};
