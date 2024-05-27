import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import projectRouter from "./routes/projectRoutes";
import { authenticateMiddleware } from "./middlewares/authenticateMiddleware";

dotenv.config();
const app = express();
app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use("/api/users", userRouter);
app.use("/api/project", authenticateMiddleware, projectRouter);
app.get(
  "/api/ping",
  authenticateMiddleware,
  (req: express.Request, res: express.Response) => {
    res.status(200).json();
  }
);
app.listen(process.env.PORT || 4000, () =>
  console.log("Server running on ", process.env.PORT || 4000)
);
