import knex from "./db/knex";
import { getPasswordWithId, getPasswordWithUsername } from "./db/dboperations";
import { comparePassword } from "./bcrypt/passwordMethods";

interface LoginResponse {
    userId: number;
    success: boolean;
}

export const validateEmail = (email: string): boolean => {
    return email.includes('@') && email.includes('.');
};

export const validatePassword = (password: string): boolean => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}:"<>?])[A-Za-z\d!@#$%^&*()_+{}:"<>?]{8,}$/;
    return passwordPattern.test(password);
};

export const isEmailInUse = async (email: string): Promise<boolean> => {
    const existingEmail = await knex("users").where({ email }).first();
    return !!existingEmail;
};

export const isUsernameInUse = async (username: string): Promise<boolean> => {
    const existingUsername = await knex("users").where({ username }).first();
    return !!existingUsername;
};

export const validatePasswordWithUsername = async (providedPassword: string, username: string): Promise<LoginResponse> => {
    const response = await getPasswordWithUsername(username);
    if (response === undefined) {
        return { userId: 0, success: false };
    }
    const { userId, password } = response;

    const result = await comparePassword(providedPassword, password);
    return {userId: result? userId : 0, success: result};
};

export const validatePasswordWithUserId = async (oldPassword: string, userId: string): Promise<boolean> => {
    const password = await getPasswordWithId(userId);
    if (password === undefined) {
        return false;
    }

    const result = await comparePassword(oldPassword, password);
    return result;
}
