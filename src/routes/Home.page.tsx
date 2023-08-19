import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar.component';
import {Typography} from "@mui/material";

export default function Home(): React.ReactElement {
    return (
        <div>
            <Typography variant={"h3"}>Artin's Book Viewer v0.1.0</Typography>
            <SearchBar/>
        </div>
    );
}

