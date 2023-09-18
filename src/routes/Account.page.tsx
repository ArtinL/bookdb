import React, {Dispatch, ReactElement, SetStateAction} from 'react';
import {Outlet} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import {NavigateFunction, Location, useNavigate, useLocation} from 'react-router-dom';
import {Button} from "@mui/material";


export default function Account(): ReactElement {
    const [displayName, setDisplayName]: [string, Dispatch<SetStateAction<string>>] = React.useState("Account");
    const [displaySignOut, setDisplaySignOut]: [boolean, Dispatch<SetStateAction<boolean>>] = React.useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [username, jwt, logIn, logOut]: [string | null, string | null, (username: string, jwt: string) => void, () => void] = useAuth();

    const navigate: NavigateFunction = useNavigate();
    const location: Location = useLocation();

    React.useEffect((): void => {
        const loggedIn: boolean = !!(localStorage.getItem('jwtToken') && localStorage.getItem('username'));

        if (!loggedIn && location.pathname !== '/account/signup' && location.pathname !== '/account/login') {
            navigate('/account/login')
        } else {
            setDisplayName(username as string);
            setDisplayName("Account");

            if (loggedIn) setDisplaySignOut(true);
            else setDisplaySignOut(false);


        }
    }, [username, navigate, location])

    function signOut(): void {
        logOut();
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