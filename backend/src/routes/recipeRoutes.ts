import { Request, Response, Router } from "express";
import recipesController from "../controllers/recipes.controller";

const router = Router();

router.get("/get-recipes", async (req: Request, res: Response) => {
    
});

router.get("get-recipes-with-filters", async (req: Request, res: Response) => {

});

router.post("/save-recipe", async (req: Request, res: Response) => {
    await recipesController.postRecipe(req, res);
});

router.patch("/edit-recipe", async (req: Request, res: Response) => {
    
});

router.delete("/delete-recipe", async (req: Request, res: Response) => {

});

export default router;
