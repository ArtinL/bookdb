import React from 'react';
import {Outlet} from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar.component';

export default function BookRoot(): React.ReactElement {
    return (
        <div>
            <h1>Books</h1>
            <p>Search for a book:</p>
            <SearchBar/>
            <Outlet/>
        </div>
    );
}