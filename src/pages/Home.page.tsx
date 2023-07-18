import React from 'react';
import {useNavigate} from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar.component';
import NavBar from '../components/NavBar/NavBar.component';

const Home: React.FC = () => {
    const navigate = useNavigate();

    const handleSearch = (query: string) => {
        // Navigate to the results page with the search query
        navigate(`/results?query=${query}`);
    };

    return (
        <div>
            <NavBar/>
            <h1>Home Page</h1>
            <SearchBar onSearch={handleSearch}/>
        </div>
    );
};

export default Home;
