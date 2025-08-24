import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar.component';
import {Typography} from "@mui/material";
import '../App.css';
import './styles/Root.style.css';

export default function Home(): React.ReactElement {
  return (
    <div className="home-container">
      <Typography variant={"h3"}>Artin's Media Finder</Typography>
      <SearchBar type="" prevQuery=''/>
      <div className='disclaimer'>
        <Typography>Note: due to the free deployment tier the backend sits on, requests might take a minute or so to
          load the first time.</Typography>
        <Typography>Everything works properly, you might just have to give it a sec!</Typography>
      </div>
    </div>
  );
}

