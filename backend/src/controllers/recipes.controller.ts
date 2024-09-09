import { Request, Response } from "express";
import { authenticateTokenAndGetUserIdFromToken } from "../jsonwebtoken/tokenProvider";

const postRecipe = async (req: Request, res: Response ): Promise<void> => {
    try {
        const userId = await authenticateTokenAndGetUserIdFromToken(req);
        if (userId === undefined) {
            res.status(400).json({
                success: false,
                message: "Invalid authentication token."
            });
            return;
        }

        const { name, recipe, ingredients, vegetarian }: IRecipe = req.body;
        console.log("name:", name);
        console.log("recipe:", recipe);
        console.log("ingredients:", ingredients);
        console.log("vegetarian:", vegetarian);

        res.status(201).json({
            success: true,
            message: "Successful recipe send."
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something unexpected happened during the login."
        });
    }
}

export default { postRecipe };