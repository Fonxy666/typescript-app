import knex from "../db/knex";

export const likeOrDislikeElement = async (userId: number, tableName: string, tableElementId: number, elementValue: boolean): Promise<boolean> => {
    try {
        let result: number[] | undefined;
        switch (tableName) {
            case "recipes":
                result = await knex("recipes_likes")
                    .insert({ userId: userId, recipeId: tableElementId, likeType: elementValue })
                    .onConflict([ "recipeId", "userId" ])
                    .merge({ likeType: elementValue })
                break;

            case "comments":
                result = await knex("comments_likes")
                    .insert({ userId: userId, commentId: tableElementId, likeType: elementValue })
                    .onConflict([ "commentId", "userId" ])
                    .merge({ likeType: elementValue })
                break;
        
            default:
                break;
        }

        if (!result || result.length < 1) {
            console.log("We couldn't update or create a new like in the database.");
            return false;
        }
        
        return true;
    } catch (error) {
        console.error(`Something unexpected happened during liking or disliking the element.`, error);
        return false;
    }
}
