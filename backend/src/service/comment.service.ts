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

export const postComment = async (userId: number, recipeId: number, content: string): Promise<boolean> => {
    try {
        const comments = await knex("comments").insert({
            senderId: userId,
            recipeId: recipeId,
            content: content
        })
        
        if (comments.length < 1) {
            console.log(`There is no comment for recipe ${recipeId}`)
            return false;
        }
        
        return true;
    } catch (error) {
        console.error("Something unexpected happened during posting the comment.", error);
        return false;
    }
}

export const existingComment = async (commentId: number): Promise<boolean> => {
    try {
        const result = await knex("comments")
            .select("id")
            .where("id", commentId)
            .first();

        if (result < 1) {
            return false;
        }

        return true;
    } catch (error) {
        console.error("Something unexpected happened during finding the comment in the database.");
        return false;
    }
}
