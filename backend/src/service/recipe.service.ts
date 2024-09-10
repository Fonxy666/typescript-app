import knex from "../db/knex";
import { IRecipe } from "../interfaces/IRecipe";

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
