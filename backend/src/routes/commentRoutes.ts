import { Request, Response, Router } from "express";
import commentsController from "../controllers/comments.controller";

const router = Router();

router.post("/create-comment", async (req: Request, res: Response) => {
    await commentsController.createComment(req, res);
});

export default router;
