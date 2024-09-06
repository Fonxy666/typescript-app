import { Express, Request, Response, Router } from "express";
import userController from "../controllers/users.controller";

const router = Router();

router.post("/v1/api/users/user-reg", async (req: Request, res: Response) => {
    await userController.regUser(req, res);
})