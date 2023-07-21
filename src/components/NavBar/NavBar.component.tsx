import React from 'react';
import NavItem from './NavItem/NavItem.component';

export default function Navbar(): React.ReactElement {
    return (
        <nav>
            <ul>
                <NavItem name="Home" link="/"/>
                <NavItem name="Top" link="/top"/>
                <NavItem name="Collection" link="/collection"/>
                <NavItem name="Account" link="/account"/>
            </ul>
        </nav>
    );
}

