import React, { useState, FormEvent } from "react";
import './App.css';

function App() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

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
        </div>
    );
}

export default App;