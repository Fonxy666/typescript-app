import mongoose, { Schema, Document, Model } from "mongoose";

interface IRecipe extends Document {
    name: string;
    ingredients: string[];
    publishDate?: Date;
    comments?: string[];
    likes?: number;
    dislikes?: number;
    image?: string;
}

const RecipeSchema: Schema<IRecipe> = new Schema({
    name: { type: String, required: true},
    ingredients: { type: [String], required: true },
    publishDate: { type: Date, required: false, default: Date.now },
    comments: { type: [String], required: false, default: null },
    likes: { type: Number, required: false, default: null },
    dislikes: { type: Number, required: false, default: null },
    image: { type: String, required: false, default: null }
})

const Recipe: Model<IRecipe> = mongoose.model<IRecipe>("Recipe", RecipeSchema);

export default Recipe;