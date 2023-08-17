import React from 'react';
import {useNavigate} from 'react-router-dom';

type NavItemProps = {
    name: string;
    link: string;
};


export default function NavItem({name, link}: NavItemProps): React.ReactElement {
    const navigate = useNavigate();

    function handleNav() {
        navigate(link);
    }

    return (

        <button onClick={handleNav}>{name}</button>

    );
};
