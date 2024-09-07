import express, { Express } from "express";
import userRoutes from "./routes/userRoutes";

const app: Express = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/v1/api/users", userRoutes);

app.listen(3000, () => {
    console.log('Running on port 3000');
});
