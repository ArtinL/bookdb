import React from 'react';
import {useNavigate} from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar.component';
import NavBar from '../components/NavBar/NavBar.component';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleSearch = (query: string, advancedParams: Record<string, string>) => {
        // Construct the query string with the search query and advanced parameters
        let queryString = `/results?query=${query}`;

        // Append the advanced parameters to the query string
        Object.entries(advancedParams).forEach(([key, value]) => {
            queryString += `&${key}=${value}`;
        });

        // Navigate to the results page with the complete query string
        navigate(queryString);
    };

    return (
        <div>
            <NavBar/>
            <h1>Artin's Book Viewer v0.1.0</h1>
            <SearchBar onSearch={handleSearch}/>
        </div>
    );
};

export default Home;
