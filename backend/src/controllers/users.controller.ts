import { Request, Response } from "express";
import { hashPassword } from "../bcrypt/passwordMethods";
import { validateEmail, validatePassword, isEmailInUse, isUsernameInUse, validatePasswordWithUsername, validatePasswordWithUserId } from "../validators";
import { dbChangePassword, dbDeleteUser, registerUser } from "../db/dboperations";
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

        const { success, userId } = await validatePasswordWithUsername(password, username);

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

        if (!validatePassword(newPassword)) {
            res.status(400).json({
                success: false,
                message: "Your password should contain lower and uppercase letter(s), symbol(s), and number(s) as well."
            });
            return;
        };

        const validPassword = await validatePasswordWithUserId(oldPassword, userId);
        if (validPassword === false) {
            res.status(400).json({
                success: false,
                message: "Invalid password."
            });
            return;
        }

        const changePassword = await dbChangePassword(userId, newPassword);
        if (!changePassword) {
            res.status(400).json({
                success: false,
                message: "Something unexpected happened during password change in the database."
            });
            return;
        }

        res.status(201).json({
            success: true,
            message: "Successful password change."
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something unexpected happened during password change."
        });
    }
}

const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = await authenticateToken(req);
        if (userId === undefined) {
            res.status(400).json({
                success: false,
                message: "Invalid authentication token."
            });
            return;
        }

        const password = typeof req.query.password === 'string' ? req.query.password : undefined;
        if (!password) {
            res.status(400).json({
                success: false,
                message: "You need to provide us your password."
            });
            return;
        }

        const validPassword = await validatePasswordWithUserId(password, userId);
        if (validPassword === false) {
            res.status(400).json({
                success: false,
                message: "Invalid password."
            });
            return;
        }

        const deleteUser = await dbDeleteUser(userId);
        if (!deleteUser) {
            res.status(400).json({
                success: false,
                message: "Something unexpected happened during user deletion in the database."
            });
            return;
        }

        res.clearCookie("auth_token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        res.status(201).json({
            success: true,
            message: "Successful user deletion."
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something unexpected happened during user deletion."
        });
    }
}

export default { regUser, loginUser, changePassword, deleteUser };