import express, { Express } from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import recipesRoutes from "./routes/recipeRoutes";
import cookieParser from "cookie-parser";
import commentRoutes from "./routes/commentRoutes";
import likeRoutes from "./routes/likeRoutes";

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
    origin: "http://localhost:5173",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Authorization, Content-Type',
    credentials: true
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));

app.use("/v1/api/users", userRoutes);
app.use("/v1/api/recipes", recipesRoutes);
app.use("/v1/api/comments", commentRoutes);
app.use("/v1/api/likes", likeRoutes);

app.listen(3000, () => {
    console.log('Running on port 3000');
});
