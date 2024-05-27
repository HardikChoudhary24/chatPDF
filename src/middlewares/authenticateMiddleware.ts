import express from "express";
import { AuthenticatedRequest, JWTUser, UserInterface } from "types/types";
import { decodeJWT } from "../utils/JWT";

export const authenticateMiddleware = async (
  req: AuthenticatedRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ details: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token || token ==="undefined") {
      return res.status(401).json({ details: "Token missing" });
    }

    const user = decodeJWT(token);

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(401).json({ details: "Unauthorized Request" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ details: "Internal Server Error" });
  }
};
