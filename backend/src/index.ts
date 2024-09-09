import express, { Express, Request, Response } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import recipesRoutes from "./routes/recipeRoutes";
import cookieParser from "cookie-parser";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:3001",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Authorization, Content-Type',
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use("/v1/api/users", userRoutes);
app.use("/v1/api/recipes", recipesRoutes);

app.listen(3000, () => {
    console.log('Running on port 3000');
});
