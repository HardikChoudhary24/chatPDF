import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes";
import projectRouter from "./routes/projectRoutes";

dotenv.config();
const app = express();
app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use("/api/users", userRouter);
app.use("/api/project", projectRouter);
app.get("/api/ping", (req: express.Request, res: express.Response) => {
  res.json("running");
});
app.listen(process.env.PORT || 4000, () =>
  console.log("Server running on ", process.env.PORT || 4000)
);
