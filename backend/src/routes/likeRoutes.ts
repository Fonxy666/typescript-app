import { Request, Response, Router } from "express";
import likesController from "../controllers/likes.controller";

const router = Router();

router.post("/change-like-value", async (req: Request, res: Response) => {
    await likesController.changeLike(req, res);
});

export default router;
