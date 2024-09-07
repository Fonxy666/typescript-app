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
