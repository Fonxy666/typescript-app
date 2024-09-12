import React, { FormEvent, useRef, useState } from 'react';

interface Ingredient {
    name: string;
    weight: number;
}

const TestPage: React.FC = () => {
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
    const changeNameRef = useRef<HTMLInputElement>(null);
    const changeRecipeRef = useRef<HTMLInputElement>(null);
    const changeVegetarianRef = useRef<HTMLInputElement>(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const recipeIdForComment = useRef<HTMLInputElement>(null);
    const commentRef = useRef<HTMLInputElement>(null);
    const tableNameRef = useRef<HTMLInputElement>(null);
    const elementIdRef = useRef<HTMLInputElement>(null);
    const likeOrDislikeRef = useRef<HTMLInputElement>(null);

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

    const editRecipe = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const response = await fetch(`http://localhost:3000/v1/api/recipes/edit-recipe`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    recipeId: 1,
                    changingObject: [
                        {
                            name: "vegetarian",
                            value: changeVegetarianRef.current!.value
                        },
                        {
                            name: "likes",
                            value: likes
                        },
                        {
                            name: "recipe",
                            value: "Ez a recept aztan jol megvaltozott!"
                        },
                        {
                            name: "dislikes",
                            value: dislikes
                        }]
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

    const handleLike = () => {
        setLikes(likes => {
            return likes += likes + 1; 
        })
    };

    const handleDislike = () => {
        setDislikes(likes => {
            return likes = likes + 1; 
        })
    };

    const createComment = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const response = await fetch(`http://localhost:3000/v1/api/comments/create-comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    recipeId: recipeIdForComment.current!.value,
                    comment: commentRef.current!.value
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

    const likeOrDislikeRecipeOrComment = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const response = await fetch(`http://localhost:3000/v1/api/likes/change-like-value`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tableName: tableNameRef.current!.value,
                    tableElementId: elementIdRef.current!.value,
                    elementValue: likeOrDislikeRef.current!.value
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
            <form onSubmit={editRecipe}>
                <div>
                    <label htmlFor='changeName'>Change name:</label>
                    <input
                        id='changeName'
                        ref={changeNameRef}
                        name='changeName'
                    />
                </div>
                <div>
                    <label htmlFor='changeRecipe'>Change recipe:</label>
                    <input
                        id='changeRecipe'
                        ref={changeRecipeRef}
                        name='changeRecipe'
                    />
                </div>
                <div>
                    <label htmlFor='changeVegetarian'>Change vegetarian:</label>
                    <input
                        id='changeVegetarian'
                        ref={changeVegetarianRef}
                        name='changeVegetarian'
                    />
                </div>
                <div>
                    <label htmlFor='recipeLike'>Like:</label>
                    <button id='recipeLike' name='recipeLike' onClick={() => handleLike()}>+</button>
                </div>
                <div>
                    <label htmlFor='recipeDislike'>Dislike:</label>
                    <button id='recipeDislike' name='recipeDislike' onClick={() => handleDislike()}>-</button>
                </div>
                <button type="submit">Edit recipe</button>
            </form>
            <form onSubmit={createComment}>
                <div>
                    <label htmlFor='comment'>Comment:</label>
                    <input
                        id='comment'
                        ref={commentRef}
                        name='comment'
                    />
                </div>
                <div>
                    <label htmlFor='recipeIdForComment'>Recipe id:</label>
                    <input
                        id='recipeIdForComment'
                        ref={recipeIdForComment}
                        name='recipeIdForComment'
                    />
                </div>
                <button type="submit">Create comment</button>
            </form>
            <form onSubmit={likeOrDislikeRecipeOrComment}>
            <div>
                    <label htmlFor='tableName'>Table name:</label>
                    <input
                        id='tableName'
                        ref={tableNameRef}
                        name='tableName'
                    />
                </div>
                <div>
                    <label htmlFor='elementId'>Element id:</label>
                    <input
                        id='elementId'
                        ref={elementIdRef}
                        name='elementId'
                    />
                </div>
                <div>
                    <label htmlFor='likeOrDislike'>Like value:</label>
                    <input
                        id='likeOrDislike'
                        ref={likeOrDislikeRef}
                        name='likeOrDislike'
                    />
                </div>
                <button type="submit">Like or dislike the element</button>
            </form>
        </div>
    );
};

export default TestPage;