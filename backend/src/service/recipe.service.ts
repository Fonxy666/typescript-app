import knex from "../db/knex";

export const saveRecipe = async (data: IRecipe): Promise<number | undefined> => {
    try {
        const { userId, name, recipe, ingredients, vegetarian }:IRecipe = data;
        const [recipeId] = await knex('recipes').insert({
            senderId: userId,
            name,
            recipe,
            vegetarian,
            postDate: new Date()
        }).returning('id');

        if (recipeId.length > 0) {
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
