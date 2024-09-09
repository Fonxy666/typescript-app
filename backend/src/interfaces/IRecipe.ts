interface IRecipe {
    userId: number,
    name: string;
    recipe: string;
    ingredients: IIngredient[];
    vegetarian: boolean;
}