import React from 'react';
import NavItem from './NavItem/NavItem.component';

const Navbar: React.FC = () => {
    return (
        <nav>
            <ul>
                <NavItem name="Home" link="/"/>
                <NavItem name="Top" link="/top"/>
                <NavItem name="Collection" link="/collection"/>
            </ul>
        </nav>
    );
};

export default Navbar;
