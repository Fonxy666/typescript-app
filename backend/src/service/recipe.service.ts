import knex from "../db/knex";
import { IComment } from "../interfaces/IComment";
import { IIngredient } from "../interfaces/IIngredient";
import { IRecipe } from "../interfaces/IRecipe";
import { IRecipeEditRequest } from "../interfaces/IRecipeEditRequest";
import { IRecipeResponse } from "../interfaces/IRecipeResponse";

export const existingRecipe = async (recipeId: number): Promise<boolean> => {
    try {
        const result = await knex("recipes")
            .select("id")
            .where("id", recipeId)
            .first();

        if (result < 1) {
            return false;
        }

        return true;
    } catch (error) {
        console.error("Something unexpected happened during finding the recipe in the database.");
        return false;
    }
}

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
            .where("id", recipeId)
            .first();

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
            .where("id", recipeId)

        if (result < 1) {
            return false;
        }

        return true;
    } catch (error) {
        console.error("Something unexpected happened during recipe deletion.", error);
        return false;
    }
}

export const getRecipesFromDb = async (): Promise<IRecipeResponse[] | null> => {
    try {
        const recipeIds = await knex("recipes")
            .select("recipes.id")
            .leftJoin("ingredients", "ingredients.recipeId", "recipes.id")
            .groupBy("recipes.id")
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
                .select("id", "content")
                .where("recipeId", recipe.id);

            const recipesLikes = await knex("recipes_likes")
                .select("likeType")
                .where("recipeId", recipe.id)

            recipe.ingredients = ingredients;
            recipe.likes = recipesLikes;
            recipe.comments = comments;
            for (const comment of recipe.comments) {
                const commentLikes = await knex("comments_likes")
                    .select("likeType")
                    .where("commentId", comment.id);

                comment.likes = commentLikes;
            }
        };

        const returningRecipes: IRecipeResponse[] = recipes.map(recipe => {
            return { 
                userId: recipe.senderId,
                recipeId: recipe.id,
                name: recipe.name,
                recipe: recipe.recipe,
                vegetarian: recipe.vegetarian,
                likes: recipe.likes,
                ingredients: recipe.ingredients.map((ingredient: IIngredient) => ({
                    name: ingredient.name,
                    weight: ingredient.weight
                })),
                comments: recipe.comments.map((comment: IComment) => ({
                    id: comment.id,
                    content: comment.content,
                    likes: comment.likes
                }))
            };
        });

        return returningRecipes;
    } catch (error) {
        console.error("Something unexpected happened during getting filtered recipes.", error);
        return null;
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
                .select("id", "content")
                .where("recipeId", recipe.id);

            const recipesLikes = await knex("recipes_likes")
                .select("likeType")
                .where("recipeId", recipe.id)

            recipe.ingredients = ingredients;
            recipe.likes = recipesLikes;
            recipe.comments = comments;
            for (const comment of recipe.comments) {
                const commentLikes = await knex("comments_likes")
                    .select("likeType")
                    .where("commentId", comment.id);

                comment.likes = commentLikes;
            }
        };

        const returningRecipes: IRecipeResponse[] = recipes.map(recipe => {
            return { 
                userId: recipe.senderId,
                recipeId: recipe.id,
                name: recipe.name,
                recipe: recipe.recipe,
                vegetarian: recipe.vegetarian,
                likes: recipe.likes,
                ingredients: recipe.ingredients.map((ingredient: IIngredient) => ({
                    name: ingredient.name,
                    weight: ingredient.weight
                })),
                comments: recipe.comments.map((comment: IComment) => ({
                    id: comment.id,
                    content: comment.content,
                    likes: comment.likes
                }))
            };
        });

        return returningRecipes;
    } catch (error) {
        console.error("Something unexpected happened during getting filtered recipes.", error);
        return null;
    }
}

export const changeParameterForRecipe = async (changeObject: IRecipeEditRequest, recipeId: number): Promise<boolean> => {
    try {
        if (changeObject.name === "vegetarian") {
            changeObject.value = changeObject.value === "true"
        };

        const changeData: { [key: string]: any } = {
            [changeObject.name]: changeObject.value,
        };

        let result: boolean = false;
        try {
            result = await knex("recipes")
                .where("id", recipeId)
                .update(changeData)

        } catch (error) {
            console.error(`Something unexpected happened during updating property: ${changeObject.name} with ${changeObject.value}.`);
        }

        return result;
    } catch (error) {
        console.error("Something unexpected happened during getting filtered recipes.", error);
        return false;
    }
}
