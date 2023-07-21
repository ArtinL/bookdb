import React from 'react';
import {Link} from 'react-router-dom';

type NavItemProps = {
    name: string;
    link: string;
};

export default function NavItem({name, link}: NavItemProps): React.ReactElement {
    return (
        <li>
            <Link to={link}>{name}</Link>
        </li>
    );
};
