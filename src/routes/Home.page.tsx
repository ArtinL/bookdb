import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar.component';
import {Typography} from "@mui/material";
import '../App.css';

export default function Home(): React.ReactElement {
    return (
        <div className="home-container">
            <Typography variant={"h3"}>Artin's Media Viewer</Typography>
            <SearchBar type="" prevQuery=''/>
        </div>
    );
}

