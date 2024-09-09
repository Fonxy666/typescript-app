import { Request, Response, Router } from "express";
import userController from "../controllers/users.controller";

const router = Router();

router.post("/user-reg", async (req: Request, res: Response) => {
    await userController.regUser(req, res);
});

router.post("/login", async (req: Request, res: Response) => {
    await userController.loginUser(req, res);
});

router.patch("/password-change", async (req: Request, res: Response) => {
    await userController.changePassword(req, res);
});

export default router;
