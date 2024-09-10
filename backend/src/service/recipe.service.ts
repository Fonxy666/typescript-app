import knex from "../db/knex";
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
        const recipes: IRecipe[] = await knex('recipes')
            .select("*");
            
        if (recipes.length < 1) {
            return undefined;
        }

        return recipes;
    } catch (error) {
        console.error("Something unexpected happened during recipe deletion.", error);
        return undefined;
    }
}
