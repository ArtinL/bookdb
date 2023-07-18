import React from 'react';
import {Link} from 'react-router-dom';

type NavItemProps = {
    name: string;
    link: string;
};

const NavItem: React.FC<NavItemProps> = ({name, link}) => {
    return (
        <li>
            <Link to={link}>{name}</Link>
        </li>
    );
};

export default NavItem;