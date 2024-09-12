import { Request, Response } from "express";
import { authenticateTokenAndGetUserIdFromToken } from "../jsonwebtoken/tokenProvider";
import { likeOrDislikeElement } from "../service/like.service";

const changeLike = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId: number = Number(await authenticateTokenAndGetUserIdFromToken(req));
        if (userId === undefined) {
            res.status(400).json({
                success: false,
                message: "Invalid authentication token."
            });
            return;
        }

        const { tableName, tableElementId, elementValue } = req.body;
        const elementValueInBoolean: boolean = elementValue === "true";

        let likeResult: boolean = await likeOrDislikeElement(userId, tableName, tableElementId, elementValueInBoolean);
        
        if (!likeResult) {
            res.status(400).json({
                success: false,
                message: "Something happened during liking this content."
            });
            return;
        }

        res.status(201).json({
            success: true,
            message: "Successful like."
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something unexpected happened during the liking."
        });
    }
}

export default { changeLike };