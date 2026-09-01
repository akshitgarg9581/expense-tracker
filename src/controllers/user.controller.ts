import { RequestHandler } from "express";
import { db } from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { eq } from "drizzle-orm";

export const createUser: RequestHandler = async (req, res) => {
  // Implementation for creating a new user
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({
        status: "fail",
        message: "name and email are required fields!",
      });
    }
    const [newuser] = await db
      .insert(usersTable)
      .values({ name, email })
      .returning();
    return res.status(201).json({
      status: "success",
      data: newuser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Failed to create user",
    });
  }
};

export const getUserById: RequestHandler = async (req, res) => {
  try {
    const userId = req.params.id;
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, Number(userId)));

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Failed to fetch user details",
    });
  }
};
