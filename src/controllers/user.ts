import { generateJWT } from "../utils/JWT";
import pool from "../database/db";
import { createNewUserQuery } from "../database/userQueries";
import express from "express";

export const createNewUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await pool.query("Select * from users where email = $1", [
      email,
    ]);
    if (userExist.rowCount > 0) {
      return res.json({ success: false, user: undefined });
    }
    const newUser = await pool.query(createNewUserQuery, [
      name,
      email,
      password,
    ]);
    res
      .status(200)
      .json({ success: true, user: { ...newUser.rows[0], password: "" } });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};
export const authenticateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { email, password } = req.body;
    const userExist = await pool.query("Select * from users where email = $1", [
      email,
    ]);
    if (userExist.rowCount == 0) {
      return res.json({ token: "", user: undefined });
    }
    if (userExist.rows[0].password === password) {
      const token = generateJWT(userExist.rows[0]);
      return res.json({
        token,
        user: {
          ...userExist.rows[0],
          password: "",
        },
      });
    }
    res.status(500).json({ details: "Failed to login!" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};
