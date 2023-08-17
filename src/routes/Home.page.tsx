import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar.component';
import {Outlet} from 'react-router-dom';

export default function Home(): React.ReactElement {
    return (
        <div>
            <h1>Artin's Book Viewer v0.1.0</h1>
            <SearchBar/>
        </div>
    );
}

