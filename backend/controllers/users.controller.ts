import { Request, Response } from "express";
import User from "../model/user.model";
import passwordMethods from "../bcrypt/passwordMethods";

interface UserBody {
    name: string;
    password: string;
}

const regUser = async (req: Request, res: Response ): Promise<void> => {
    try {
        const { name, password }: UserBody = req.body;
        
        const newUser = new User({
            name: name,
            password: await passwordMethods.hashPassword(password)
        })

        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        })

    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something unexpected happened during the registration."
        });
    }
}

export default { regUser };