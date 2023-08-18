import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {useAuth} from "../hooks/useAuth";

const URL = "http://localhost:8080/auth/login";
export default function Login(): React.ReactElement {
    const [user, setUser] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState(false);

    const [username, jwt, logIn, logOut] = useAuth();

    const navigate = useNavigate();

    useEffect((): void => {
        if (jwt !== null) {
            navigate('/', {replace: true});
        }
    }, [jwt, navigate]);

    useEffect((): void => {
        if (success) {
            //window.location.reload();
        }
    }, [success, navigate]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        const userObj: { username: string, password: string } = {
            username: user,
            password: password
        }

        let res: {
            user: {
                userId: number,
                username: string,
            },
            jwt: string
        };

        try {
            res = (await axios.post(URL, userObj)).data;
            console.log(res);
            setSuccess(true);
            logIn(res.user.username, res.jwt);
        } catch (error) {
            console.log(error);
            setError("Invalid username or password.")
        }

    }

    return (
        <div>
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                {error && <p>{error}</p>}
                <label htmlFor="username">Username</label>
                <input type="text"
                       id="username"
                       name="username"
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUser(e.target.value)}
                       autoComplete="off"
                       required={true}
                       value={user}
                />
                <label htmlFor="password">Password</label>
                <input type="password"
                       id="password"
                       name="password"
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                       required={true}
                       value={password}
                />
                <button type="submit">Log In</button>
            </form>
            <p>No account? </p> <Link to="/account/signup">Sign Up</Link>
        </div>
    );
}