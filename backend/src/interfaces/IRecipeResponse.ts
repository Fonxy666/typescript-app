import { IComment } from "./IComment";
import { IIngredient } from "./IIngredient";

export interface IRecipeResponse {
    userId: number,
    name: string;
    recipe: string;
    ingredients: IIngredient[];
    vegetarian: boolean;
    likes: number | null;
    dislikes: number | null;
    comments: IComment | null;
}