import { Request, Response } from "express";
import { hashPassword } from "../bcrypt/passwordMethods";
import { validateEmail, validatePassword, isEmailInUse, isUsernameInUse, validatePasswordForLogin, validatePasswordForPasswordChange } from "../validators";
import { changePassword, registerUser } from "../db/dboperations";
import { generateToken, authenticateToken } from "../jsonwebtoken/tokenProvider";

interface UserRegistrationBody {
    username: string;
    password: string;
    email: string;
}

interface UserLoginBody {
    username: string;
    password: string;
}

interface PasswordChangeBody {
    oldPassword: string;
    newPassword: string;
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
        
        if(!username || !password) {
            res.status(400).json({
                success: false,
                message: "Invalid Username or Password."
            });
            return;
        }

        const { success, userId } = await validatePasswordForLogin(password, username);

        if(!success) {
            res.status(400).json({
                success: success,
                message: "Invalid Username or Password."
            });
            return;
        }

        const jwtToken = generateToken(userId);

        const expireDate = new Date();
        expireDate.setUTCHours(expireDate.getUTCHours() + 1);

        res.cookie("auth_token", jwtToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            expires: expireDate
        });

        res.status(201).json({
            success: true,
            message: "Successful login."
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something unexpected happened during the login."
        });
    }
}

const changePassword = async (req: Request, res: Response ): Promise<void> => {
    try {
        const userId = await authenticateToken(req);
        if (userId === undefined) {
            res.status(400).json({
                success: false,
                message: "Invalid authentication token."
            });
            return;
        }
        const { oldPassword, newPassword }: PasswordChangeBody = req.body;
        const validPassword = await validatePasswordForPasswordChange(oldPassword, userId);
        if (validPassword === undefined) {
            res.status(400).json({
                success: false,
                message: "Invalid password."
            });
            return;
        }

        const changePassword = await changePassword()
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something unexpected happened during password change."
        });
    }
}

export default { regUser, loginUser, changePassword };