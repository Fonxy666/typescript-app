import { Request, Response } from "express";
import { hashPassword } from "../bcrypt/passwordMethods";
import { validateEmail, validatePassword, isEmailInUse, isUsernameInUse, validatePasswordForLogin } from "../validators";
import { registerUser } from "../db/dboperations";

interface UserRegistrationBody {
    username: string;
    password: string;
    email: string;
}

interface UserLoginBody {
    username: string;
    password: string;
}

const regUser = async (req: Request, res: Response ): Promise<void> => {
    try {
        const { username, password, email }: UserRegistrationBody = req.body;

        if (!validateEmail(email)) {
            res.status(400).json({
                success: false,
                message: "You need to give a valid e-mail address."
            });
            return;
        };

        if (!validatePassword(password)) {
            res.status(400).json({
                success: false,
                message: "Your password should contain lower and uppercase letter(s), symbol(s), and number(s) as well."
            });
            return;
        };

        if (await isEmailInUse(email)) {
            res.status(400).json({
                success: false,
                message: "Email address already in use."
            });
            return;
        };

        if (await isUsernameInUse(username)) {
            res.status(400).json({
                success: false,
                message: "Username already in use."
            });
            return;
        };

        const hashedPassword = await hashPassword(password);

        const successfullUserRegistration = await registerUser(username, hashedPassword, email);

        if (!successfullUserRegistration) {
            return;
        };

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

const loginUser = async (req: Request, res: Response ): Promise<void> => {
    try {
        const { username, password }: UserLoginBody = req.body;
        const login = await validatePasswordForLogin(password, username);

        if(!login) {
            res.status(400).json({
                success: false,
                message: "Invalid Username or Password."
            });
            return;
        }

        res.status(201).json({
            success: true
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something unexpected happened during the login."
        });
    }
}

export default { regUser, loginUser };