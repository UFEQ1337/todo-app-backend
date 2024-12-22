import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import taskRoutes from "./routes/taskRoutes";

dotenv.config();

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Trasy API
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Trasa główna
app.get("/", (req: Request, res: Response) => {
  res.send("API działa!");
});

// Middleware obsługi błędów
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: "Błąd serwera" });
});

// Połączenie z MongoDB i uruchomienie serwera
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/todo-app";

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Połączono z MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Błąd połączenia z MongoDB:", err);
  });
