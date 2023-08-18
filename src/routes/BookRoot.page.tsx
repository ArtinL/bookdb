import React from 'react';
import {Outlet} from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar.component';
import {Typography} from "@mui/material";
import './styles/BookRoot.style.css';

export default function BookRoot(): React.ReactElement {
    return (
        <div>
            <div className="book-search-container">
                <Typography variant={"h3"}>Search for Books</Typography>
                <SearchBar/>
            </div>
            <Outlet/>
        </div>
    );
}