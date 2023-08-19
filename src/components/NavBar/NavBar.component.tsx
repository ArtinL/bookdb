import React, {Dispatch, ReactElement, SetStateAction, useEffect, useState} from 'react';
import NavItem from './NavItem/NavItem.component';
import {useAuth} from '../../hooks/useAuth';
import './NavBar.style.css';


export default function Navbar(): ReactElement {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [username, jwt, logIn, logOut]: [string | null, string | null, (username: string, password: string) => void, () => void] = useAuth();
    const [display, setDisplay]: [string, Dispatch<SetStateAction<string>>] = useState("Account");


    useEffect((): void => {
        if (username) {
            setDisplay(username);
        } else {
            setDisplay("Account");
        }
    }, [username]);

    return (
        <nav>

            <NavItem name="Home" link="/"/>
            <NavItem name="Collection" link="/collection"/>
            <NavItem
                name={display}
                link={'/account'}
            />


        </nav>
    );
}

