import { Request, Response } from "express";
import { authenticateTokenAndGetUserIdFromToken } from "../jsonwebtoken/tokenProvider";
import { deleteRecipeFromDatabase, examineIfUserIsTheCreator, getFilteredRecipesFromDb, getRecipes, saveRecipe } from "../service/recipe.service";
import { examineExistingIngredient, getIngredientsForRecipes, saveIngredient } from "../service/ingredients.service";
import { IIngredient } from "../interfaces/IIngredient";
import { IRecipe } from "../interfaces/IRecipe";
import { IComment } from "../interfaces/IComment";
import { getCommentsForRecipes } from "../service/comment.service";

const getAllRecipes = async (req: Request, res: Response): Promise<void> => {
    try {
        const recipes: IRecipe[] | undefined = await getRecipes();
        if (recipes === undefined) {
            console.log("There is no recipe in the database.");
            res.status(400).json({
                    success: true,
                    message: "There is no recipe in the database."
                });
        }

        const result = await Promise.all(recipes!.map(async recipe => {
            const ingredients: IIngredient[] | null = await getIngredientsForRecipes(recipe.id!);
            const comments: IComment[] | null = await getCommentsForRecipes(recipe.id!);
            return {
                userId: recipe.senderId,
                name: recipe.name,
                recipe: recipe.recipe,
                ingredients: ingredients,
                vegetarian: recipe.vegetarian,
                likes: recipe.likes ?? null,
                dislikes: recipe.dislikes ?? null,
                comments: comments
            }
        }));

        res.status(201).json({
            success: true,
            recipes: result
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something unexpected happened during getting the recipes."
        });
    }
}

const getFilteredRecipes = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await authenticateTokenAndGetUserIdFromToken(req);
        if (userId === undefined) {
            res.status(400).json({
                success: false,
                message: "Invalid authentication token."
            });
            return;
        }
        
        const ingredientsName: string[] = req.body.filterIngredients;
        const existingOptions: boolean[] = await Promise.all(ingredientsName.map(async ingredient => {
            return await examineExistingIngredient(ingredient);
        }));

        if (existingOptions.includes(false)) {
            res.status(400).json({
                success: false,
                message: "There is no recipe with the given ingredients."
            });
            return;
        }

        const filteredRecipes = await Promise.all(ingredientsName.map(async ingredientName => {
            return await getFilteredRecipesFromDb(ingredientName);
        }));

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something unexpected happened during the login."
        });
    }
}

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
        const recipeData: IRecipe = { userId: userIdAsNumber, name, recipe, vegetarian: vegetarian === "true" };

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
                message: "Something happened during ingredients save during recipe save."
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
            message: "Something unexpected happened during getting the recipes."
        });
    }
}

const deleteRecipe = async (req: Request, res: Response ): Promise<void> => {
    try {
        const userId: number = Number(await authenticateTokenAndGetUserIdFromToken(req));
        if (userId === undefined) {
            res.status(400).json({
                success: false,
                message: "Invalid authentication token."
            });
            return;
        }

        const recipeId: number = Number(req.query.recipeId);
        var userIsTheCreator = await examineIfUserIsTheCreator(recipeId, userId);
        if (!userIsTheCreator) {
            res.status(400).json({
                success: false,
                message: "You don't have permission to delete this recipe."
            });
            return;
        }

        const result = await deleteRecipeFromDatabase(recipeId);
        if (!result) {
            res.status(400).json({
                success: false,
                message: "Something unexpected happened during recipe deletion."
            });
            return;
        };

        res.status(201).json({
            success: true,
            message: "Successful recipe deletion."
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something unexpected happened during the login."
        });
    }
}

export default { postRecipe, deleteRecipe, getAllRecipes, getFilteredRecipes };