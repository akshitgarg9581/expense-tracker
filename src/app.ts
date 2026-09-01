import express from "express";
import categoryRoutes from "./routes/category.routes.js";
import accountRoutes from "./routes/account.routes.js";
import userRoutes from "./routes/user.routes.js";
import transactionRoutes from "./routes/transaction.routes.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.use("/api/categories", categoryRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/users", userRoutes);
app.use("/api/transactions", transactionRoutes);
export default app;
