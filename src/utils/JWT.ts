import jwt from "jsonwebtoken";
import { JWTUser, UserInterface } from "types/types";
const JWT_SECRET = "shfks#&@*1223";

export const generateJWT = (user:UserInterface) => {
  const payload: JWTUser = {
    id: user.user_id,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

export const decodeJWT = (token: string) => {
  try {
    const user = jwt.verify(token, JWT_SECRET);
    return user as JWTUser;
  } catch (error) {
    return error;
  }
};
