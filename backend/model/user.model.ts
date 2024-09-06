import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
    name: string;
    password: string;
    registrationDate: Date;
    publishedRecipes?: String[];
}

const UserSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    registrationDate: { type: Date, required: true, default: Date.now },
    publishedRecipes: { type: [String], required: false, default: null }
})

const Recipe: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default Recipe;