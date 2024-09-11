export interface IRecipe {
    id?: number,
    senderId?: number,
    userId: number,
    name: string;
    recipe: string;
    vegetarian: boolean;
}