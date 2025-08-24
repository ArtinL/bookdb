import React, {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import AppBar from '../components/NavBar/AppBar.component'
import {useAuth} from "../hooks/useAuth";
import axios from "axios";
import Footer from "../components/Footer/Footer.component";
import {styled} from '@mui/material/styles';

export default function Home(): React.ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [username, jwt, logIn, logOut]: [string | null, string | null, (username: string, password: string) => void, () => void] = useAuth();
  useEffect(() => {
    if (jwt) {
      const validateURL = `${process.env.REACT_APP_API_URL}/favorites/test`;

      async function validate() {
        try {
          await axios.get(validateURL, {headers: {"Authorization": `Bearer ${jwt}`}});
        } catch (error) {
          logOut();
        }
      }

      // noinspection JSIgnoredPromiseFromCall
      validate();
    }
  }, [jwt, logOut]);
  return (
    <RootContainer>
      <AppBar/>
      <ContentContainer>
        <Outlet/>
      </ContentContainer>
      <Footer/>
    </RootContainer>
  );
}

const RootContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minHeight: '100vh',
}));

const ContentContainer = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'center',
  minWidth: '100%',
}));
