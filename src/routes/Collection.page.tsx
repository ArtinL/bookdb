import React from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import NavBar from '../components/NavBar/NavBar.component';
import {useAuth} from '../hooks/useAuth';
import axios from "axios";


export default function Collection(): React.ReactElement {
    const [username, jwt, logIn, logOut]: [string | null, string | null, (username: string, password: string) => void, () => void] = useAuth();

    const navigate = useNavigate();


    React.useEffect(() => {
        const loggedIn: boolean = !!(localStorage.getItem('jwtToken') && localStorage.getItem('username'));
       
        if (!loggedIn) {
            navigate('/account/login', {replace: true})
        } else {
            navigate('/collection/list', {replace: true})
        }
    }, [navigate])

    return (
        <div>
            <h1>Collection for {username}</h1>
            <Outlet/>
        </div>
    );
}
