import cors from "cors";
import express, { Request, Response } from "express";
import { globalErrorHandler } from "./app/middleWares/globalErrorHandler";
import notFound from "./app/middleWares/notFound";
import { router } from "./app/routes";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to tour management system.",
  });
});

app.use(globalErrorHandler);
app.use(notFound);
export default app;
