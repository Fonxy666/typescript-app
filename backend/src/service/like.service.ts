import knex from "../db/knex";

export const likeOrDislikeElement = async (userId: number, tableName: string, tableElementId: number, elementValue: boolean): Promise<boolean> => {
    try {
        const likeTable = tableName === "recipes" ? "recipes_likes" : "comments_likes";
        const idColumn = tableName === "recipes" ? "recipeId" : "commentId";

        const existingRow = await knex(likeTable)
            .select("id")
            .where({
                userId: userId,
                [idColumn]: tableElementId,
                likeType: elementValue
            });

        let result: number[] | undefined;

        if (existingRow.length > 0) {
            result = await knex(likeTable)
                .where({
                    userId: userId,
                    [idColumn]: tableElementId,
                    likeType: elementValue
                })
                .delete();
        } else {
            result = await knex(likeTable)
                .insert({
                    userId: userId,
                    [idColumn]: tableElementId,
                    likeType: elementValue
                })
                .onConflict([idColumn, "userId"])
                .merge({
                    likeType: elementValue
                });
        }

        if (!result || result.length < 1) {
            console.log("We couldn't update or create a new like in the database.");
            return false;
        }

        return true;
    } catch (error) {
        console.error("Something unexpected happened during liking or disliking the element.", error);
        return false;
    }
};