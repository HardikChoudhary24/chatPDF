import express from "express";

export interface UserInterface {
  user_id: string;
  name: string;
  password: string;
  email: string;
}

export interface JWTUser {
  id: string;
  name: string;
  email: string;
}
export interface AuthenticatedRequest extends express.Request {
  user?: JWTUser; // Replace `any` with the actual user type if available
}
export interface MessageHistoryInterface {
  id: number;
  project_id: number;
  role: string;
  message: string;
  created_at: Date;
}


export interface ProjectInterface {
  project_id: number;
  project_name: string;
  pdfURL: string;
  user_id: number;
  status: string;
}

export interface EmbeddingInterface {
  id: number;
  project_id: number;
  text_embedding: number[];
  text_content: string;
}

