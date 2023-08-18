import React, {useEffect, useState} from 'react';
import NavItem from './NavItem/NavItem.component';
import {useAuth} from '../../hooks/useAuth';
import './NavBar.style.css';


export default function Navbar(): React.ReactElement {
    const [username, jwt, logIn, logOut]: [string | null, string | null, (username: string, password: string) => void, () => void] = useAuth();
    const [display, setDisplay] = useState("Account");
    //console.log('check: ', username && isLoggedIn);
    //if (username && isLoggedIn) console.log('true');
    //else console.log('false');

    useEffect(() => {
        if (username) {
            setDisplay(username);
        } else {
            setDisplay("Account");
        }
    }, [username]);

    return (
        <nav>

            <NavItem name="Home" link="/"/>
            <NavItem name="Top" link="/top"/>
            <NavItem name="Collection" link="/collection"/>
            <NavItem
                name={display}
                link={'/account'}
            />


        </nav>
    );
}

