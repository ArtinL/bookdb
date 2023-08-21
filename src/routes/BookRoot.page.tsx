import React, {useEffect} from 'react';
import {Outlet, useLocation} from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar.component';
import {Typography} from "@mui/material";
import './styles/BookRoot.style.css';

export default function BookRoot(): React.ReactElement {
    const [query, setQuery] = React.useState<string>('');

    const location = useLocation();

    useEffect(() => {
        setQuery(new URLSearchParams(location.search).get('query') || '');
    }, [location.search]);

    return (
        <div className="book-root-container">
            <div className="book-search-container">
                <Typography variant={"h3"}>Search for Books</Typography>
                <SearchBar prevQuery={query}/>
            </div>
            <Outlet/>
        </div>
    );
}