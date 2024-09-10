import knex from "../db/knex";
import { IIngredient } from "../interfaces/IIngredient";

export const saveIngredient = async (ingredients: IIngredient[], recipeId: number): Promise<boolean> => {
    try {
        const result = ingredients.map(async ingredient => {
            const { name, weight }:IIngredient = ingredient;
            return await knex('ingredients').insert({
                recipeId: recipeId,
                name: name,
                weight: weight
            });
        })

        if (result.length > 0) {
            return true;
        } else {
            console.error("No rows inserted, something went wrong.");
            return false;
        }
    } catch (error) {
        console.error("Something unexpected happened during ingredients save to the database.", error);
        return false;
    }
};

export const getIngredientsForRecipes = async (recipeId: number): Promise<IIngredient[] | null> => {
    try {
        const ingredients = await knex("ingredients")
            .select("name", "weight")
            .where({ recipeId: recipeId });
        
        if (ingredients.length < 1) {
            console.log(`There is no ingredients for recipe ${recipeId}`)
            return null;
        }

        return ingredients;
    } catch (error) {
        console.error(`Something unexpected happened during getting the ingredients for recipe: ${recipeId}.`, error);
        return null;
    }
}
