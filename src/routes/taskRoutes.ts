import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";
import { auth } from "../middleware/auth";

const router = Router();

// Middleware autoryzacji dla wszystkich tras w tym routerze
router.use(auth);

// Pobierz wszystkie zadania użytkownika
router.get("/", getTasks);

// Dodaj nowe zadanie
router.post("/", createTask);

// Aktualizuj zadanie
router.put("/:id", updateTask);

// Usuń zadanie
router.delete("/:id", deleteTask);

export default router;
