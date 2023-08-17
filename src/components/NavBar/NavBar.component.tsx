import React, {useEffect, useState} from 'react';
import NavItem from './NavItem/NavItem.component';
import {useAuth} from '../../hooks/useAuth';


export default function Navbar(): React.ReactElement {
    const [isLoggedIn, username, jwt]: [boolean, string | null, string | null] = useAuth();
    const [display, setDisplay] = useState("Account");
    //console.log('check: ', username && isLoggedIn);
    //if (username && isLoggedIn) console.log('true');
    //else console.log('false');

    useEffect(() => {
        if (username && isLoggedIn) {
            setDisplay(username);
        } else {
            setDisplay("Account");
        }
    }, [isLoggedIn, username]);

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

