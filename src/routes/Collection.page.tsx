import React from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import NavBar from '../components/NavBar/NavBar.component';
import {useAuth} from '../hooks/useAuth';
import axios from "axios";


export default function Collection(): React.ReactElement {
    //const {isLoggedIn, username, jwt} = useAuth();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [username, setUsername] = React.useState("");

    const navigate = useNavigate();

    React.useEffect(() => {
        if (localStorage.getItem("jwtToken") !== null) {
            setIsLoggedIn(true);
            setUsername(localStorage.getItem("username") as string);
        }
    }, []);

    React.useEffect(() => {

        const loggedIn = localStorage.getItem("jwtToken") !== null;
        setIsLoggedIn(loggedIn);

        if (!loggedIn) {
            //console.log('not logged in');
            navigate('/account/login', {replace: true})
        } else {
            navigate('/collection/list', {replace: true})
        }
    }, [isLoggedIn, navigate])

    return (
        <div>
            <h1>Collection for {username}</h1>
            <Outlet/>
        </div>
    );
}
