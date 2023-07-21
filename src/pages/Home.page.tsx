import React from 'react';
import SearchBar from '../components/SearchBar/SearchBar.component';
import NavBar from '../components/NavBar/NavBar.component';

export default function Home(): React.ReactElement {
    return (
        <div>
            <NavBar/>
            <h1>Artin's Book Viewer v0.1.0</h1>
            <SearchBar/>
        </div>
    );
}

