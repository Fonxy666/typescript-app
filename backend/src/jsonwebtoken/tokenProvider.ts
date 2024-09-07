import jwt, { SignOptions } from 'jsonwebtoken';
import * as dotenv from "dotenv";

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