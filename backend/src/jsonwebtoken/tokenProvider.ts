import jwt, { SignOptions } from 'jsonwebtoken';
import * as dotenv from "dotenv";
import { Request } from 'express';

dotenv.config();

const secret = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXPIRES_IN;

export const generateToken = (userId: number): string => {
    const options: SignOptions = { expiresIn };
    return jwt.sign({ id: userId }, secret!, options);
};

export const verifyToken = (token: string): any => {
    try {
        return jwt.verify(token, secret!);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

export const authenticateToken = async (req: Request): Promise<string | undefined> => {
    const token = req.cookies.auth_token;
    console.log(token);

    if (!token) {
        return "Unauthorized: No token provided";
    };

    return new Promise((resolve, reject) => {
        jwt.verify(token, secret!, (err: any, decoded: any) => {
            if (err) {
                resolve("Forbidden: Invalid token");
            } else {
                const obj = decoded as { id: number };
                resolve(obj.id.toString());
            }
        });
    });
};