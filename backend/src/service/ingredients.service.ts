import knex from "../db/knex";
import { IIngredient } from "../interfaces/IIngredient";

export const saveIngredient = async (ingredients: IIngredient[], recipeId: number): Promise<boolean> => {
    try {
        const result = ingredients.map(async ingredient => {
            const { name, weight }:IIngredient = ingredient;
            console.log("name:", name);
            console.log("weight:", weight);
            console.log("recipeId:", recipeId);
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
