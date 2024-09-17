import React, { useRef } from 'react';

export const SignupPage: React.FC = () => {
    const loginUsernameRef = useRef<HTMLInputElement>(null);
    const loginPasswordRef = useRef<HTMLInputElement>(null);
    const signupUsernameRef = useRef<HTMLInputElement>(null);
    const signupPasswordRef = useRef<HTMLInputElement>(null);
    const signupEmailRef = useRef<HTMLInputElement>(null);

    const clearRefs = () => {
        loginUsernameRef.current!.value = "";
        loginPasswordRef.current!.value = "";
        signupUsernameRef.current!.value = "";
        signupPasswordRef.current!.value = "";
        signupEmailRef.current!.value = "";
    }
    
    const handleSignUpClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        clearRefs();
        
        const container = document.querySelector(".inline-sign-container")!;
        container.classList.add('active');
    };

    const handleSignInClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        clearRefs();
        
        const container = document.querySelector(".inline-sign-container")!;
        container.classList.remove('active');
    };

    return (
        <div className='outer-sign-container'>
            <div className="inline-sign-container">
                <div className="curved-shape"></div>
                <div className="curved-shape2"></div>
                <div className='form-box Login'>
                    <h2 className='animation' style={{ '--D': 0, '--S': 21 } as React.CSSProperties}>Login</h2>
                    <form action='#'>
                        <div className='input-box animation' style={{ '--D': 1, '--S': 22 } as React.CSSProperties}>
                            <input type='text' ref={loginUsernameRef} required/>
                            <label htmlFor=''>Username</label>
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className='input-box animation' style={{ '--D': 2, '--S': 23 } as React.CSSProperties}>
                            <input type='password' ref={loginPasswordRef} required/>
                            <label typeof='' htmlFor=''>Password</label>
                            <i className='bx bxs-lock-alt'></i>
                        </div>
                        <div className="input-box animation" style={{ '--D': 3, '--S': 24 } as React.CSSProperties}>
                            <button className='animated-btn animation' type='submit'>Login</button>
                        </div>
                        <div className='regi-link animation' style={{ '--D': 4, '--S': 25 } as React.CSSProperties}>
                            <p>Don't have an account ? <button onClick={ e =>  handleSignUpClick(e) }>Sign Up</button></p>
                        </div>
                    </form>
                </div>
                <div className="info-content Login">
                    <h2 className='animation' style={{ '--D': 0, '--S': 20 } as React.CSSProperties}>WELCOME BACK!</h2>
                    <p className='animation' style={{ '--D': 1, '--S': 21 } as React.CSSProperties}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
                <div className='form-box Register'>
                    <h2 className='animation' style={{ '--Li': 17, '--S': 0 } as React.CSSProperties}>Register</h2>
                    <form action='#'>
                        <div className='input-box animation' style={{ '--Li': 18, '--S': 1 } as React.CSSProperties}>
                            <input type='text' ref={signupUsernameRef} required/>
                            <label htmlFor=''>Username</label>
                            <i className='bx bxs-user'></i>
                        </div>
                        <div className='input-box animation' style={{ '--Li': 19, '--S': 2 } as React.CSSProperties}>
                            <input type='email' ref={signupEmailRef} required/>
                            <label htmlFor=''>Email</label>
                            <i className='bx bxs-lock-alt'></i>
                        </div>
                        <div className='input-box animation' style={{ '--Li': 20, '--S': 3 } as React.CSSProperties}>
                            <input type='Password' ref={signupPasswordRef} required/>
                            <label htmlFor=''>Password</label>
                            <i className='bx bxs-lock-alt'></i>
                        </div>
                        <div className="input-box animation" style={{ '--Li': 21, '--S': 4 } as React.CSSProperties}>
                            <button className='animated-btn' type='submit'>Register</button>
                        </div>
                        <div className='regi-link animation' style={{ '--Li': 22, '--S': 5 } as React.CSSProperties}>
                            <p>Don't have an account ? <button onClick={e =>  handleSignInClick(e)}>Sign In</button></p>
                        </div>
                    </form>
                </div>
                <div className="info-content Register">
                    <h2 className='animation' style={{ '--Li': 17, '--S': 0 } as React.CSSProperties}>WELCOME BACK!</h2>
                    <p className='animation' style={{ '--Li': 18, '--S': 1 } as React.CSSProperties}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
            </div>
        </div>
      );
}
