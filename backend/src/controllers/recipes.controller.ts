import { Request, Response } from "express";
import { authenticateTokenAndGetUserIdFromToken } from "../jsonwebtoken/tokenProvider";
import { saveRecipe } from "../service/recipe.service";
import { saveIngredient } from "../service/ingredients.service";
import { IIngredient } from "../interfaces/IIngredient";
import { IRecipe } from "../interfaces/IRecipe";

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

        const userIdAsNumber: number = Number(userId);
        const { name, recipe, vegetarian, ingredients } = req.body;
        const recipeData: IRecipe = { userId: userIdAsNumber, name, recipe, vegetarian };
        console.log("recipe:", recipeData);
        console.log("ingreddients:", ingredients);

        const recipeId = await saveRecipe(recipeData);
        if (recipeId === undefined) {
            res.status(400).json({
                success: false,
                message: "Something happened during recipe save."
            });
            return;
        };

        const saveResult = await saveIngredient(ingredients, recipeId);
        if (!saveResult) {
            res.status(400).json({
                success: false,
                message: "Something happened during ingredients save."
            });
            return;
        };

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