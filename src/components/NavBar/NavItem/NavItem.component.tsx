import React, {ReactElement} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import {Button} from "@mui/material";

interface NavItemProps {
  name: string;
  link: string;
}


export default function NavItem({name, link}: NavItemProps): ReactElement {
  const navigate: NavigateFunction = useNavigate();

  function handleNav(): void {
    navigate(link);
  }

  return (

    <Button variant="text" sx={{color: 'white'}} onClick={handleNav}>{name}</Button>

  );
};
