import { Request, Response } from "express";
import { authenticateTokenAndGetUserIdFromToken } from "../jsonwebtoken/tokenProvider";
import { existingRecipe } from "../service/recipe.service";
import { postComment } from "../service/comment.service";

const createComment = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: number = Number(await authenticateTokenAndGetUserIdFromToken(req));
        if (userId === undefined) {
            res.status(400).json({
                success: false,
                message: "Invalid authentication token."
            });
            return;
        }

        const { recipeId, comment } = req.body;
        var recipeIdToNumber: number = Number(recipeId);
        const recipeExisting = await existingRecipe(recipeIdToNumber);
        if (!recipeExisting) {
            res.status(400).json({
                success: false,
                message: "Recipe with the given id not existing."
            });
        };

        const commentResult = await postComment(userId, recipeIdToNumber, comment);
        if (!commentResult) {
            res.status(400).json({
                success: false,
                message: "Something happened during saving the comment."
            });
            return;
        }

        res.status(201).json({
            success: true,
            message: "Successful comment save."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something unexpected happened during the login."
        });
    }
}

export default { createComment };