import React from 'react';
import {useNavigate} from 'react-router-dom';
import {Button} from "@mui/material";

interface NavItemProps {
    name: string;
    link: string;
}


export default function NavItem({name, link}: NavItemProps): React.ReactElement {
    const navigate = useNavigate();

    function handleNav() {
        navigate(link);
    }

    return (

        <Button variant="text" onClick={handleNav}>{name}</Button>

    );
};
