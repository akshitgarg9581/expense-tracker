
import { integer, pgTable, varchar, timestamp, numeric, text } from "drizzle-orm/pg-core";


export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const accountsTable = pgTable("accounts", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 100 }).notNull(),
    userId: integer("user_id").references(()=> usersTable.id).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categoriesTable= pgTable("categories",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({length: 100}).notNull(),
    type: varchar({length: 100}).notNull(),
    userId: integer("user_id").references(()=>usersTable.id),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const transactionsTable = pgTable("transactions",{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    amount: numeric({ precision: 12, scale: 2 }).notNull(),
    type: varchar({length:20}).notNull(),
    description: text(),
    accountId: integer("account_id").references(()=>accountsTable.id).notNull(),
    categoryId: integer("category_id").references(()=>categoriesTable.id),
    userId: integer("user_id").references(()=>usersTable.id).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull()
});