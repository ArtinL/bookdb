import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';

const URL = "http://localhost:8080/auth/login";
export default function Login(): React.ReactElement {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState(false);

    function testLogin() {
        //console.log("Login");
        localStorage.setItem("jwtToken", "test");
        //console.log(localStorage.getItem("jwtToken"));
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("jwtToken") !== null) {
            navigate('/', {replace: true});
        }
    }, [navigate]);

    useEffect(() => {
        if (success) {
            window.location.reload();
        }
    }, [success, navigate]);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        const user = {
            username: username,
            password: password
        }
        let res;
        try {
            res = (await axios.post(URL, user)).data;
            //console.log(res.data);
        } catch (error) {
            console.log(error);
            setError("Invalid username or password.")
        }
        console.log(res);
        setSuccess(true);
        //console.log('success!')
        localStorage.setItem("jwtToken", res.jwt);
        localStorage.setItem("username", res.user.username);

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
                       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                       autoComplete="off"
                       required={true}
                       value={username}
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