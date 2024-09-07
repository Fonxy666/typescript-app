import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../bcrypt/passwordMethods";
import knex from "../db/knex";

interface UserBody {
    username: string;
    password: string;
    email: string;
}

const regUser = async (req: Request, res: Response ): Promise<void> => {
    try {
        const { username, password, email }: UserBody = req.body;

        const hashedPassword = await hashPassword(password);

        await knex("users").insert({
            username,
            email,
            password: hashedPassword,
            registrationDate: new Date(),
            recipe_ids: null
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully"
        });

    } catch (error: any) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something unexpected happened during the registration."
        });
    }
}

export default { regUser };