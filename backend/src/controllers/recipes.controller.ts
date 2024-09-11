import { Request, Response } from "express";
import { authenticateTokenAndGetUserIdFromToken } from "../jsonwebtoken/tokenProvider";
import { changeParameterForRecipe, deleteRecipeFromDatabase, examineIfUserIsTheCreator, getFilteredRecipesFromDb, getRecipesFromDb, saveRecipe } from "../service/recipe.service";
import { examineExistingIngredient, saveIngredient } from "../service/ingredients.service";
import { IRecipe } from "../interfaces/IRecipe";
import { IRecipeEditRequest } from "../interfaces/IRecipeEditRequest";

const getRecipes = async (req: Request, res: Response): Promise<void> => {
    try {
        const recipes = await getRecipesFromDb();
        if (recipes === null) {
            res.status(400).json({
                success: false,
                message: "Something unexpected happened in the database."
            });
            return;
        }
        res.status(201).json({
            success: 201,
            recipes: recipes
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something unexpected happened during the login."
        });
    }
}

const getFilteredRecipes = async (req: Request, res: Response): Promise<void> => {
    try {        
        const ingredientsNames: string[] = req.body.filterIngredients;
        const existingOptions: boolean[] = await Promise.all(ingredientsNames.map(async ingredient => {
            return await examineExistingIngredient(ingredient);
        }));

        if (existingOptions.includes(false)) {
            res.status(400).json({
                success: false,
                message: "There is no recipe with the given ingredients."
            });
            return;
        }

        const filteredRecipes = await getFilteredRecipesFromDb(ingredientsNames);
        if (filteredRecipes === null) {
            res.status(400).json({
                success: false,
                message: "Something unexpected happened in the database."
            });
            return;
        }
        res.status(201).json({
            success: 201,
            recipes: filteredRecipes
        });

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
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something unexpected happened during getting the recipes."
        });
    }
}

const editRecipe = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await authenticateTokenAndGetUserIdFromToken(req);
        if (userId === undefined) {
            res.status(400).json({
                success: false,
                message: "Invalid authentication token."
            });
            return;
        };

        const { recipeId , changingObject } = req.body;

        const userIdToNumber: number = Number(userId);
        const userIsTheCreator = await examineIfUserIsTheCreator(recipeId, userIdToNumber);
        if (!userIsTheCreator) {
            res.status(400).json({
                success: false,
                message: "You don't have permission for doing that."
            });
            return;
        }

        const changeParams = ["name", "recipe", "vegetarian", "likes", "dislikes"]
        const numberRecipeId: number = Number(recipeId);
        if (Number.isNaN(numberRecipeId)) {
            res.status(400).json({
                success: false,
                message: "Given recipeId is not a number."
            });
            return;
        };

        const changeable: boolean[] = changingObject.map((param: IRecipeEditRequest) => {
            return changeParams.includes(param.name);
        });

        if (changeable.includes(false)) {
            res.status(400).json({
                success: false,
                message: "Given parameters are not changeable."
            });
            return;
        };

        const changed: boolean[] = await Promise.all(changingObject.map(async (param: IRecipeEditRequest) => {
            return await changeParameterForRecipe(param, numberRecipeId);
        }));

        if (changed.includes(false)) {
            res.status(400).json({
                success: false,
                message: "Something happened in the database during update."
            });
            return;
        }

        res.status(201).json({
            success: true,
            message: "Successful update."
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something unexpected happened during editing the recipe."
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

export default { getRecipes, postRecipe, deleteRecipe, getFilteredRecipes, editRecipe };