import { Request, Response, NextFunction, RequestHandler } from "express";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Rejestracja użytkownika
export const registerUser: RequestHandler = async (req, res, next) => {
  const { username, email, password } = req.body;

  // Sprawdź, czy wszystkie pola są wypełnione
  if (!username || !email || !password) {
    res.status(400).json({ message: "Proszę wypełnić wszystkie pola" });
    return;
  }

  try {
    // Sprawdź, czy użytkownik już istnieje
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "Użytkownik już istnieje" });
      return;
    }

    // Hashowanie hasła
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tworzenie nowego użytkownika
    const newUser: IUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Generowanie tokena JWT
    const token = jwt.sign(
      { id: savedUser._id },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
      },
    });
  } catch (err) {
    next(err); // Przekazywanie błędu do middleware
  }
};

// Logowanie użytkownika
export const loginUser: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  // Sprawdź, czy wszystkie pola są wypełnione
  if (!email || !password) {
    res.status(400).json({ message: "Proszę wypełnić wszystkie pola" });
    return;
  }

  try {
    // Znajdź użytkownika
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Nieprawidłowy email lub hasło" });
      return;
    }

    // Sprawdź hasło
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Nieprawidłowy email lub hasło" });
      return;
    }

    // Generowanie tokena JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ msg: "Unauthorized" });
      return;
    }
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      res.status(404).json({ msg: "User not found" });

      return;
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};
