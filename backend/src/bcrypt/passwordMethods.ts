import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 15;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};