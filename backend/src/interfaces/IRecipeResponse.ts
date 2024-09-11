import { IComment } from "./IComment";
import { IIngredient } from "./IIngredient";
import { ILikes } from "./ILikes";

export interface IRecipeResponse {
    userId: number,
    recipeId: number,
    name: string;
    recipe: string;
    ingredients: IIngredient[];
    vegetarian: boolean;
    comments: IComment[] | null;
    likes: ILikes[] | null;
}