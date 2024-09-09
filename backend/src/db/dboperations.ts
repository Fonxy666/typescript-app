import { hashPassword } from "../bcrypt/passwordMethods";
import knex from "../db/knex";

interface LoginResponse {
    userId: number;
    password: string;
}

export const registerUser = async (username: string, password: string, email: string): Promise<boolean> => {
    try {
        const result = await knex("users").insert({
            username,
            email,
            password,
            registrationDate: new Date(),
            recipe_ids: null
        });

        if (result.length > 0) {
            return true;
        } else {
            console.error("No rows inserted, something went wrong.");
            return false;
        }
    } catch (error) {
        console.error("Something unexpected happened during the user save in to the database.", error);
        return false;
    }
};

export const getPasswordWithUsername = async (username: string): Promise<LoginResponse | undefined> => {
    try {
        const user = await knex("users").where({ username }).first();

        if (user) {
            return { userId: user.id, password: user.password };
        } else {
            console.log("No user found with the given username.");
            return undefined;
        }
    } catch (error) {
        console.error("Something unexpected happened during getting the password for the user with username.", error);
        return undefined;
    }
}

export const getPasswordWithId = async (id: string): Promise<string | undefined> => {
    try {
        const user = await knex("users").where({ id }).first();

        if (!user) {
            console.log("No user found with the given username.");
            return undefined;
        }
         return user.password;
    } catch (error) {
        console.error("Something unexpected happened during getting the password for the user with userId.", error);
        return undefined;
    }
}

export const dbChangePassword = async (id: string, newPassword: string): Promise<boolean> => {
    try {
        const user = await knex("users").where({ id }).first();

        if (!user) {
            console.log("No user found with the given username.");
            return false;
        }

        const newHashedPassword = await hashPassword(newPassword);
        var result = await knex("users")
            .where({ id })
            .update({ password: newHashedPassword });

        if (result === 0) {
            console.log("Something unexpected happened in the database.")
            return false;
        }
            
        return true;
    } catch (error) {
        console.error("Something unexpected happened during getting the password for the user with userId.", error);
        return false;
    }
}
