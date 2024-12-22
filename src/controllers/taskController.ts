import { Request, Response, NextFunction, RequestHandler } from "express";
import Task, { ITask } from "../models/Task";

// Pobierz wszystkie zadania użytkownika
export const getTasks: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user?.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

// Dodaj nowe zadanie
export const createTask: RequestHandler = async (req, res, next) => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ message: "Tytuł zadania jest wymagany" });
    return;
  }

  try {
    const newTask: ITask = new Task({
      title,
      user: req.user?.id,
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    next(err);
  }
};

// Aktualizuj zadanie
export const updateTask: RequestHandler = async (req, res, next) => {
  const { title, completed } = req.body;

  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user?.id });

    if (!task) {
      res.status(404).json({ message: "Zadanie nie znalezione" });
      return;
    }

    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } catch (err) {
    next(err);
  }
};

// Usuń zadanie
export const deleteTask: RequestHandler = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user?.id,
    });

    if (!task) {
      res.status(404).json({ message: "Zadanie nie znalezione" });
      return;
    }

    res.status(200).json({ message: "Zadanie usunięte" });
  } catch (err) {
    next(err);
  }
};
