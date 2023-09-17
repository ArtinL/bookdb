import React, {ReactElement, useEffect} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {Typography} from "@mui/material";
import SearchBar from "../components/SearchBar/SearchBar.component";

export default function MovieRoot(): ReactElement {
    const [query, setQuery] = React.useState<string>('');

    const location = useLocation();

    useEffect(() => {
        setQuery(new URLSearchParams(location.search).get('query') || '');
    }, [location.search]);

    return (
        <div className="book-root-container">
            <div className="book-search-container">
                <Typography variant={"h3"}>Search for Movies</Typography>
                <SearchBar type="movies" prevQuery={query}/>
            </div>
            <Outlet/>
        </div>
    );
}