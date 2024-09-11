import React, { useState, FormEvent, useRef } from "react";
import './App.css';

interface Ingredient {
    name: string;
    weight: number;
}

function App() {
    const userNameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const loginUserNameRef = useRef<HTMLInputElement>(null);
    const loginPasswordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const oldPasswordRef = useRef<HTMLInputElement>(null);
    const newPasswordRef = useRef<HTMLInputElement>(null);
    const recipeNameRef = useRef<HTMLInputElement>(null);
    const recipeRef = useRef<HTMLTextAreaElement>(null);
    const [ingredients, setIngredients] = useState<Ingredient[]>([{ name: "", weight: 0 }]);
    const [filterIngredients, setFilterIngredients] = useState<string[]>([""]);
    const vegetarianRef = useRef<HTMLSelectElement>(null);
    const deleteRecipeIdRef = useRef<HTMLInputElement>(null);

    const onLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(loginUserNameRef.current!.value);
        console.log(loginPasswordRef.current!.value);

        try {
            const response = await fetch("http://localhost:3000/v1/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: loginUserNameRef.current!.value,
                    password: loginPasswordRef.current!.value 
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
    };

    const onRegistrationSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/v1/api/users/user-reg", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: userNameRef.current!.value,
                    password: passwordRef.current!.value,
                    email: emailRef.current!.value
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

    const onPasswordChange = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3000/v1/api/users/password-change", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    oldPassword: oldPasswordRef.current!.value,
                    newPassword: newPasswordRef.current!.value 
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

    const onUserDeletion = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/v1/api/users/delete-user?password=${passwordRef.current!.value}`, {
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
        console.log(value);
    
        if (field === 'name') {
            newIngredients[index][field] = value as string;
        } else if (field === 'weight') {
            newIngredients[index][field] = value as number;
        }
    
        setIngredients(() => {
            return newIngredients;
        })
    };

    const addIngredient = () => {
        setIngredients(ingredients => {
            return [...ingredients, { name: "", weight: 0 }]
        });
    };

    const removeIngredient = () => {
        setIngredients(ingredients => {
            return ingredients.slice(0, -1)
        });
    }

    const handleFilterInputChange = (index: number, value: string) => {
        console.log(value);
        const newIngredients = [...filterIngredients];
    
        newIngredients[index] = value;
    
        setFilterIngredients(() => {
            return newIngredients;
        })
    };

    const addFilteringIngredient = () => {
        setFilterIngredients(ingredients => {
            return [...ingredients, ""]
        });
    };

    const removeFilteringIngredient = () => {
        setFilterIngredients(ingredients => {
            return ingredients.slice(0, -1)
        });
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
                    name: recipeNameRef.current!.value,
                    recipe: recipeRef.current!.value,
                    ingredients: ingredients,
                    vegetarian: vegetarianRef.current!.value
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

    const deleteRecipe = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:3000/v1/api/recipes/delete-recipe?recipeId=${deleteRecipeIdRef.current!.value}`, {
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

    const getRecipes = async (e: { preventDefault: () => void; }) => {
        try {
            const response = await fetch(`http://localhost:3000/v1/api/recipes/get-recipes`, {
                method: "GET",
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

    const getFilteredRecipes = async (e: { preventDefault: () => void; }) => {
        try {
            e.preventDefault();

            const response = await fetch(`http://localhost:3000/v1/api/recipes/get-recipes-with-filters`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ filterIngredients }),
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
                        ref={loginUserNameRef}
                        id='username'
                        name='username'
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        id='password'
                        ref={loginPasswordRef}
                        name='password'
                        type='password'
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
                        ref={userNameRef}
                        id='username'
                        name='username'
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        id='password'
                        ref={passwordRef}
                        name='password'
                        type='password'
                    />
                </div>
                <div>
                    <label htmlFor='password'>Email:</label>
                    <input
                        id='email'
                        ref={emailRef}
                        name='email'
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
                        ref={oldPasswordRef}
                        name='oldPassword'
                        type='password'
                    />
                </div>
                <div>
                    <label htmlFor='password'>New Password:</label>
                    <input
                        id='newPassword'
                        ref={newPasswordRef}
                        name='newPassword'
                        type='password'
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
                        ref={recipeNameRef}
                        name='recipeName'
                    />
                </div>
                <div>
                    <label htmlFor='recipeName'>Recipe:</label>
                    <textarea
                        id='recipe'
                        ref={recipeRef}
                        name='recipe'
                        rows={5}
                        cols={40}
                    />
                </div>
                <div>
                    <label htmlFor='vegetarian'>Vegetarian:</label>
                    <select
                        id='vegetarian'
                        ref={vegetarianRef}
                        name='vegetarian'
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
            <form onSubmit={deleteRecipe}>
                <div>
                    <label htmlFor='recipeDeletion'>Recipe id for deletion:</label>
                    <input
                        id='recipeDeletion'
                        ref={deleteRecipeIdRef}
                        name='recipeDeletion'
                    />
                </div>
                <button type="submit">Recept torlese</button>
            </form>
            <button onClick={getRecipes}>Get recipes</button>
            <form onSubmit={getFilteredRecipes}>
                <div>
                    {filterIngredients.map((ingredient, index) => (
                        <div key={index}>
                        <input
                            type="text"
                            placeholder="Ingredient Name"
                            value={ingredient}
                            onChange={(e) => handleFilterInputChange(index, e.target.value)}
                        />
                        </div>
                    ))}
                    <button type="button" onClick={addFilteringIngredient}>+</button>
                    <button type="button" onClick={removeFilteringIngredient}>-</button>
                </div>
                <button type="submit">Get filtered recipes</button>
            </form>
        </div>
    );
}

export default App;