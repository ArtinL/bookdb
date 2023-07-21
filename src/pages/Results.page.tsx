import React, {useEffect, useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import BookList from '../components/BookList/BookList.component';
import SearchBar from '../components/SearchBar/SearchBar.component';
import NavBar from '../components/NavBar/NavBar.component';
import {Book} from '../Book';

const URL: string = `http://localhost:8080/books?title=`

const API_URL: string = "https://www.googleapis.com/books/v1/volumes";
const API_KEY: string = "AIzaSyCQAK-HfYpmCljoCDooRvPIPQcL7MNRTFk";


const Results: React.FC = () => {
    const [results, setResults] = useState<Book[]>([]);

    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const query: string = queryParams.get('query') || '';
    const category: string = queryParams.get('category') || '';

    useEffect((): void => {
        const fetchResults = async () => {
            console.log('Fetching results...' + query);
            try {
                const testURL: string = API_URL + "?q=" + query + "&key=" + API_KEY;
                const requestURL: string = URL + query;
                const response = await fetch(testURL);
                const data = await response.json();
                setResults(data.items.map((item: any) => new Book({id: item.id, volumeInfo: item.volumeInfo})));
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchResults();
    }, [query]);

    const filterResults = (results: Book[]): Book[] => {
        if (category) {
            // Filter the results based on the category
            return results.filter((book: Book) => book.categories?.includes(category));
        }
        return results;
    };

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
            <h1>Results Page</h1>
            <p>Search query: {query}</p>
            <SearchBar onSearch={handleSearch}/>
            <BookList list={filterResults(results)}/>
        </div>
    );
};

export default Results;
