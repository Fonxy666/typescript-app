import knex from "../db/knex";
import { IComment } from "../interfaces/IComment";
import { IIngredient } from "../interfaces/IIngredient";
import { IRecipe } from "../interfaces/IRecipe";
import { IRecipeResponse } from "../interfaces/IRecipeResponse";

export const saveRecipe = async (data: IRecipe): Promise<number | undefined> => {
    try {
        const { userId, name, recipe, vegetarian }:IRecipe = data;
        const [recipeId] = await knex('recipes').insert({
            senderId: userId,
            name: name,
            recipe: recipe,
            vegetarian: vegetarian,
            postDate: new Date()
        });

        if (recipeId > 0) {
            return recipeId;
        } else {
            console.error("No rows inserted, something went wrong.");
            return undefined;
        }
    } catch (error) {
        console.error("Something unexpected happened during the user save in to the database.", error);
        return undefined;
    }
};

export const examineIfUserIsTheCreator = async (recipeId: number, userId: number): Promise<boolean> => {
    try {
        const result = await knex("recipes")
            .select("senderId")
            .where({ id: recipeId })
            .first();

        console.log(result.senderId);
        if (!result || result.senderId !== userId) {
            return false;
        }

        return true;
    } catch (error) {
        console.error("Something unexpected happened during recipe deletion.", error);
        return false;
    }
}

export const deleteRecipeFromDatabase = async (recipeId: number): Promise<boolean> => {
    try {
        const result = await knex("recipes")
            .delete()
            .where({ id: recipeId });

        if (result < 1) {
            return false;
        }

        return true;
    } catch (error) {
        console.error("Something unexpected happened during recipe deletion.", error);
        return false;
    }
}

export const getRecipes = async (): Promise<IRecipe[] | undefined> => {
    try {
        const recipes: IRecipe[] = await knex("recipes")
            .select("*");
            
        if (recipes.length < 1) {
            return undefined;
        }

        return recipes;
    } catch (error) {
        console.error("Something unexpected happened during recipe get recipes.", error);
        return undefined;
    }
}

export const getFilteredRecipesFromDb = async (ingredientNames: string[]): Promise<IRecipeResponse[] | null> => {
    try {
        const recipeIds = await knex("recipes")
            .select("recipes.id")
            .leftJoin("ingredients", "ingredients.recipeId", "recipes.id")
            .whereIn("ingredients.name", ingredientNames)
            .groupBy("recipes.id")
            .havingRaw(`COUNT(DISTINCT ingredients.name) = ?`, [ingredientNames.length])
            .pluck("recipes.id");

        if (recipeIds.length === 0) {
            return null;
        };

        const recipes = await knex("recipes")
            .select("*")
            .whereIn("id", recipeIds);

        for (const recipe of recipes) {
            const ingredients = await knex("ingredients")
                .select("name", "weight")
                .where("recipeId", recipe.id);

            const comments = await knex("comments")
                .select("content", "likes", "dislikes")
                .where("recipeId", recipe.id);

            recipe.ingredients = ingredients;
            recipe.comments = comments;
        };

        const returningRecipes: IRecipeResponse[] = recipes.map(recipe => {
            return { 
                userId: recipe.senderId,
                recipeId: recipe.id,
                name: recipe.name,
                recipe: recipe.recipe,
                vegetarian: recipe.vegetarian,
                likes: recipe.likes,
                dislikes: recipe.dislikes,
                ingredients: recipe.ingredients.map((ingredient: IIngredient) => ({
                    name: ingredient.name,
                    weight: ingredient.weight
                })),
                comments: recipe.comments.map((comment: IComment) => ({
                    id: comment.id,
                    content: comment.content,
                    likes: comment.likes,
                    dislikes: comment.dislikes
                }))
            };
        });

        return returningRecipes;
    } catch (error) {
        console.error("Something unexpected happened during getting filtered recipes.", error);
        return null;
    }
}
