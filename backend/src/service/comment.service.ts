import knex from "../db/knex";
import { IComment } from "../interfaces/IComment";

export const getCommentsForRecipes = async (recipeId: number): Promise<IComment[] | null> => {
    try {
        const comments = await knex("comments")
            .select("content", "likes", "dislikes")
            .where({ recipeId: recipeId });
        
        if (comments.length < 1) {
            console.log(`There is no comment for recipe ${recipeId}`)
            return null;
        }
        
        return comments;
    } catch (error) {
        console.error(`Something unexpected happened during getting the comments for recipe: ${recipeId}.`, error);
        return null;
    }
}