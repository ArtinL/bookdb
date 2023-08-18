import React from 'react';
import {Outlet} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import {NavigateFunction, Location, useNavigate, useLocation} from 'react-router-dom';
import {Button} from "@mui/material";


export default function Account(): React.ReactElement {
    //const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    //const [username, setUsername] = React.useState("");
    const [displayName, setDisplayName] = React.useState("Account");
    const [displaySignOut, setDisplaySignOut] = React.useState(false);

    const [username, jwt, logIn, logOut]: [string | null, string | null, (username: string, jwt: string) => void, () => void] = useAuth();


    const navigate: NavigateFunction = useNavigate();
    const location: Location = useLocation();

    React.useEffect((): void => {
        const loggedIn: boolean = !!(localStorage.getItem('jwtToken') && localStorage.getItem('username'));

        if (!loggedIn && location.pathname !== '/account/signup' && location.pathname !== '/account/login') {
            navigate('/account/login', {replace: true})
        } else {
            setDisplayName(username as string);
            setDisplayName("Account");

            if (loggedIn) setDisplaySignOut(true);
            else setDisplaySignOut(false);


        }
    }, [username, navigate, location])

    function signOut() {
        logOut();
        //window.location.reload();
    }

    return (
        <div>
            <h1>{displayName}</h1>
            <Outlet/>
            {displaySignOut &&
                <Button size="large" variant="contained" color="error" onClick={signOut}>Sign Out</Button>}
        </div>
    );
}