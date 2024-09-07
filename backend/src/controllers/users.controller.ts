import { Request, Response } from "express";
import { hashPassword } from "../bcrypt/passwordMethods";
import knex from "../db/knex";
import { validateEmail, validatePassword, isEmailInUse, isUsernameInUse } from "../validators";

interface UserBody {
    username: string;
    password: string;
    email: string;
}

const regUser = async (req: Request, res: Response ): Promise<void> => {
    try {
        const { username, password, email }: UserBody = req.body;

        if (!validateEmail(email)) {
            res.status(400).json({
                success: false,
                message: "You need to give a valid e-mail address."
            });
            return;
        }

        if (!validatePassword(password)) {
            res.status(400).json({
                success: false,
                message: "Your password should contain lower and uppercase letter(s), symbol(s), and number(s) as well."
            });
            return;
        }

        if (await isEmailInUse(email, knex)) {
            res.status(400).json({
                success: false,
                message: "Email address already in use."
            });
            return;
        }

        if (await isUsernameInUse(username, knex)) {
            res.status(400).json({
                success: false,
                message: "Username already in use."
            });
            return;
        }

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