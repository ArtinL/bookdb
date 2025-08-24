import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar.component';
import {Typography} from "@mui/material";
import {styled} from '@mui/material/styles';

export default function Home(): React.ReactElement {
  return (
    <HomeContainer>
      <Typography variant={"h3"}>Artin's Media Finder</Typography>
      <SearchBar type="" prevQuery=''/>
      <Disclaimer>
        <Typography>Note: due to the free deployment tier the backend sits on, requests might take a minute or so to
          load the first time.</Typography>
        <Typography>Everything works properly, you might just have to give it a sec!</Typography>
      </Disclaimer>
    </HomeContainer>
  );
}

const HomeContainer = styled('div')(() => ({
  marginTop: 100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '50%',
  minWidth: '100%',
}));

const Disclaimer = styled('div')(() => ({
  position: 'fixed',
  bottom: '18vh',
  left: 0,
  width: '100%',
  textAlign: 'center',
  fontSize: '0.7rem',
  zIndex: 100,
  pointerEvents: 'none',
}));

