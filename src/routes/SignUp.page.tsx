import React, {useEffect, useState, Dispatch, SetStateAction} from 'react';
import {Link, NavigateFunction} from "react-router-dom";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth";

const USERNAME_REGEX: RegExp = /^[a-zA-Z0-9]{4,24}$/;
const PASS_REGEX: RegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,24}$/;

const URL: string = "http://localhost:8080/auth/register";


export default function SignUp(): React.ReactElement {
    const [user, setUser]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');
    const [userValid, setUserValid]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

    const [pass, setPass]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');
    const [passValid, setPassValid]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

    const [passConfirm, setPassConfirm]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');
    const [passConfirmValid, setPassConfirmValid]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

    const [error, setError]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');
    const [success, setSuccess]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

    const [username, jwt, logIn, logOut]: [string | null, string | null, (username: string, jwt: string) => void, () => void] = useAuth();

    const navigate: NavigateFunction = useNavigate();

    useEffect((): void => {
        if (jwt !== null) {
            navigate('/', {replace: true});
        }
    }, [jwt, navigate]);

    useEffect((): void => {
        if (success) {
            window.location.reload();
        }
    }, [success, navigate]);

    useEffect((): void => {
        setUserValid(USERNAME_REGEX.test(user));
    }, [user]);

    useEffect((): void => {
        setPassValid(PASS_REGEX.test(pass));
        setPassConfirmValid(pass === passConfirm);
    }, [pass, passConfirm]);

    useEffect((): void => {
        setError('');
    }, [user, pass, passConfirm]);


    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();
        if (!userValid || !passValid || !passConfirmValid) {
            setError("Invalid username or password.");
            return;
        }

        const userObj: { username: string, password: string } = {
            username: user,
            password: pass
        }

        try {
            await axios.post(URL, userObj);
            setSuccess(true);
        } catch (error) {
            console.log(error);
            setError("Unable to create account.");
        }

    }

    return (
        <div>
            <h1>Sign Up</h1>
            {error ? <p>{error}</p> : null}
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input type="text"
                       id="username"
                       name="username"
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)}
                       autoComplete="off"
                       required
                       value={user}
                />
                {user && !userValid ?
                    <p>Username must be 4-24 characters long and contain only letters and numbers.</p> : null}
                <label htmlFor="password">Password</label>
                <input type="password"
                       id="password"
                       name="password"
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
                       required
                       value={pass}
                />
                {pass && !passValid ?
                    <p>Password must be 8-24 characters long and contain at least one letter, one number, and one
                        special character.</p> : null}
                <label htmlFor="passwordConfirm">Confirm Password</label>
                <input type="password"
                       id="passwordConfirm"
                       name="passwordConfirm"
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassConfirm(e.target.value)}
                       required
                       value={passConfirm}
                />
                {passConfirm && !passConfirmValid ? <p>Passwords must match.</p> : null}
                <button type="submit" disabled={!userValid && !passValid && !passConfirmValid}>Sign Up</button>
            </form>
            <p>Already have an account? </p> <Link to="/account/login">Log In</Link>
        </div>
    );
}