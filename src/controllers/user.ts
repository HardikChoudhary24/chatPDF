import express from "express";


export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = 2;
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const createNewUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const data = req.body;
    const newUser = 3;
    res.status(200).json({ message: "Success", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
};

export const deleteUserById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const deletedUser = 3;
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", success: false });
  }
};

export const updateUserById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const updatedUser = 3;

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Success", user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user" });
  }
};


