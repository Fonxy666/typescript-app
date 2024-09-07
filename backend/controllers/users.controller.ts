import { Request, Response } from "express";

interface UserBody {
    name: string;
    password: string;
}

const regUser = async (req: Request, res: Response ): Promise<void> => {
    try {
        const { name, password }: UserBody = req.body;

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