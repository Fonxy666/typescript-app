import { Request, Response, Router } from "express";
import recipesController from "../controllers/recipes.controller";

const router = Router();

router.get("/get-recipes", async (req: Request, res: Response) => {
    await recipesController.getRecipes(req, res);
});

router.post("/get-recipes-with-filters", async (req: Request, res: Response) => {
    await recipesController.getFilteredRecipes(req, res);
});

router.post("/save-recipe", async (req: Request, res: Response) => {
    await recipesController.postRecipe(req, res);
});

router.patch("/edit-recipe", async (req: Request, res: Response) => {
    await recipesController.editRecipe(req, res);
});

router.delete("/delete-recipe", async (req: Request, res: Response) => {
    await recipesController.deleteRecipe(req, res);
});

export default router;
