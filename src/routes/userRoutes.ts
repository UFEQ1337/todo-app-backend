import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/userController";
import { auth } from "../middleware/auth";
import { get } from "http";

const router = Router();

// Rejestracja nowego użytkownika
router.post("/register", registerUser);

// Logowanie użytkownika
router.post("/login", loginUser);

// Pobierz dane zalogowanego użytkownika
router.get("/me", auth, getUser);

export default router;
