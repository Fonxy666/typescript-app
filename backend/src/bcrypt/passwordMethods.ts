import bcrypt from "bcrypt";

const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 15;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};

export default { hashPassword, comparePassword };