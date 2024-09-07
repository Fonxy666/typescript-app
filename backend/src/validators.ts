import { Knex } from "knex";

export const validateEmail = (email: string): boolean => {
    return email.includes('@') && email.includes('.');
};

export const validatePassword = (password: string): boolean => {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}:"<>?])[A-Za-z\d!@#$%^&*()_+{}:"<>?]{8,}$/;
    return passwordPattern.test(password);
};

export const isEmailInUse = async (email: string, knex: Knex): Promise<boolean> => {
    const existingEmail = await knex("users").where({ email }).first();
    return !!existingEmail;
};

export const isUsernameInUse = async (username: string, knex: Knex): Promise<boolean> => {
    const existingUsername = await knex("users").where({ username }).first();
    return !!existingUsername;
};