import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

export const SignupPage: React.FC = () => {
    const loginUsernameRef = useRef<HTMLInputElement>(null);
    const loginPasswordRef = useRef<HTMLInputElement>(null);
    const signupUsernameRef = useRef<HTMLInputElement>(null);
    const signupPasswordRef = useRef<HTMLInputElement>(null);
    const signupEmailRef = useRef<HTMLInputElement>(null);

    return (
        <div className='outer-sign-container'>
            <div className="inline-sign-container">
                <div className='form-box Login'>
                    <h2>Login</h2>
                    <form action='#'>
                        <div className='input-box'>
                            <input type='text' required/>
                            <label htmlFor=''>Username</label>
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className='input-box'>
                            <input type='text' required/>
                            <label htmlFor=''>Password</label>
                            <i className='bx bxs-lock-alt'></i>
                        </div>
                        <div className="input-box">
                            <button className='login-btn' type='submit'>Login</button>
                        </div>
                        <div className='regi-link'>
                            <p>Don't have an account ? <Link to='#' className='signup-link'>Sign up</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      );
}
