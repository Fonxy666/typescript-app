import React, { useState, FormEvent } from "react";
import './App.css';

interface Ingredient {
    name: string;
    weight: number;
}

function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [recipeName, setRecipeName] = useState("");
    const [recipe, setRecipe] = useState("");
    const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: "", weight: 0 }]);
    const [vegetarian, setVegetarian] = useState(false);

    const onLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/v1/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username, password: password }),
                credentials: "include"
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);

        } catch (error) {
            console.error('Error:', error);
        }
    };

    const onRegistrationSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/v1/api/users/user-reg", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username: username, password: password, email: email }),
                credentials: "include"
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const onPasswordChange = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/v1/api/users/password-change", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ oldPassword: oldPassword, newPassword: newPassword }),
                credentials: "include"
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const onUserDeletion = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/v1/api/users/delete-user?password=${password}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include"
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleInputChange = (index: number, field: keyof Ingredient, value: string | number) => {
        const newIngredients = [...ingredients];
    
        if (field === 'name') {
            newIngredients[index][field] = value as string;
        } else if (field === 'weight') {
            newIngredients[index][field] = value as number;
        }
    
        setIngredients(newIngredients);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { name: "", weight: 0 }]);
    };

    const removeIngredient = () => {
        setIngredients(ingredients.slice(0, -1));
    }

    const postRecipe = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:3000/v1/api/recipes/save-recipe`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: recipeName,
                    recipe: recipe,
                    ingredients: ingredients,
                    vegetarian: vegetarian
                }),
                credentials: "include"
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log('Success:', result);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <form onSubmit={onLoginSubmit}>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input
                        id='username'
                        name='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        id='password'
                        name='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <button type='submit'>Login</button>
                </div>
            </form>
            <form onSubmit={onRegistrationSubmit}>
                <div>
                    <label htmlFor='username'>Username:</label>
                    <input
                        id='username'
                        name='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        id='password'
                        name='password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Email:</label>
                    <input
                        id='email'
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <button type='submit'>Registration</button>
                </div>
            </form>
            <form onSubmit={onPasswordChange}>
                <div>
                    <label htmlFor='password'>Old password:</label>
                    <input
                        id='oldPassword'
                        name='oldPassword'
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>New Password:</label>
                    <input
                        id='newPassword'
                        name='newPassword'
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Change Password</button>
            </form>
            <form onSubmit={onUserDeletion}>
                <button>Delete User</button>
            </form>
            <form onSubmit={postRecipe}>
                <div>
                    <label htmlFor='recipeName'>Recipe name:</label>
                    <input
                        id='recipeName'
                        name='recipeName'
                        value={recipeName}
                        onChange={(e) => setRecipeName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='recipeName'>Recipe:</label>
                    <textarea
                        id='recipeName'
                        name='recipeName'
                        value={recipe}
                        onChange={(e) => setRecipe(e.target.value)}
                        rows={5}  // Adjust the number of visible rows as needed
                        cols={40} // Adjust the width of the textarea as needed
                    />
                </div>
                <div>
                    <label htmlFor='vegetarian'>Vegetarian:</label>
                    <select
                        id='vegetarian'
                        name='vegetarian'
                        value={vegetarian ? "true" : "false"}
                        onChange={(e) => setVegetarian(e.target.value === "true")}
                    >
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                </div>
                <div>
                    {ingredients.map((ingredient, index) => (
                        <div key={index}>
                        <input
                            type="text"
                            placeholder="Ingredient Name"
                            value={ingredient.name}
                            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Weight"
                            value={ingredient.weight}
                            onChange={(e) => handleInputChange(index, 'weight', parseFloat(e.target.value))}
                        />
                        </div>
                    ))}
                    <button type="button" onClick={addIngredient}>+</button>
                    <button type="button" onClick={removeIngredient}>-</button>
                </div>
                <button type="submit">Recept mentese</button>
            </form>
        </div>
    );
}

export default App;