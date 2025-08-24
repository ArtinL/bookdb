import React, {Dispatch, ReactElement, SetStateAction, useEffect, useState} from 'react';
import NavItem from './NavItem/NavItem.component';
import {useAuth} from '../../hooks/useAuth';
import {styled} from '@mui/material/styles';

const NavBarRoot = styled('nav')(() => ({
  backgroundColor: '#3b3b3b',
  color: '#ffffff',
  display: 'flex',
  justifyContent: 'space-around',
  padding: '10px',
  marginBottom: '30px',
  top: 0,
  width: 'auto',
  zIndex: 1,
  borderBottom: '#7a7a7a solid 5px',
}));


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
  <NavBarRoot>

      <NavItem name="Home" link="/"/>
      <NavItem name="Collection" link="/collection"/>
      <NavItem
        name={display}
        link={'/account'}
      />


  </NavBarRoot>
  );
}

