import React from 'react';
import {NavigateFunction, Outlet, useNavigate} from "react-router-dom";
import {useAuth} from '../hooks/useAuth';


export default function Collection(): React.ReactElement {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [username, jwt, logIn, logOut]: [string | null, string | null, (username: string, password: string) => void, () => void] = useAuth();

    const navigate: NavigateFunction = useNavigate();


    React.useEffect((): void => {
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
