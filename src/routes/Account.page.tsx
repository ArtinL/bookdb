import React from 'react';
import {Outlet} from 'react-router-dom';
import {useAuth} from '../hooks/useAuth';
import {NavigateFunction, Location, useNavigate, useLocation} from 'react-router-dom';


export default function Account(): React.ReactElement {
    //const [isLoggedIn, username, jwt]: [boolean, string | null, string | null] = useAuth();
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    const [username, setUsername] = React.useState("");
    const [displayName, setDisplayName] = React.useState("Account");
    const [displaySignOut, setDisplaySignOut] = React.useState(false);


    const navigate: NavigateFunction = useNavigate();
    const location: Location = useLocation();

    React.useEffect((): void => {
        const loggedIn = localStorage.getItem("jwtToken") !== null;
        setIsLoggedIn(loggedIn);
        if (!loggedIn && location.pathname !== '/account/signup' && location.pathname !== '/account/login') {
            navigate('/account/login', {replace: true})
        } else {
            const user = localStorage.getItem("username");
            setUsername(user as string);
            if (user) setDisplayName(user);
            else setDisplayName("Account");

            if (loggedIn) setDisplaySignOut(true);
            else setDisplaySignOut(false);


        }
    }, [username, isLoggedIn, navigate, location])

    function signOut() {
        //console.log("Sign Out");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("username");
        //navigate('/account/login', {replace: true})
        window.location.reload();
        //console.log(localStorage.getItem("jwtToken"));
    }

    return (
        <div>
            <h1>{displayName}</h1>
            <Outlet/>
            {displaySignOut && <button onClick={signOut}>Sign Out</button>}
        </div>
    );
}