import express, { Application, Request, Response } from "express";
import path from "path";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req: Request, res: Response) => {
    res.send("MediCore API is running!");
//   res.sendFile(path.join(process.cwd(), "index.html"));
});

export default app;
