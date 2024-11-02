// controllers/userController.ts
import { Request, Response } from "express";
import * as UserService from "../Services/UserService";

export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred." });
    }
  }
};
