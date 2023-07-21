import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import BookList from '../components/BookList/BookList.component';
import SearchBar from '../components/SearchBar/SearchBar.component';
import NavBar from '../components/NavBar/NavBar.component';
import {Book} from '../Book';

//const URL: string = `http://localhost:8080/books?title=`

const API_URL: string = "https://www.googleapis.com/books/v1/volumes";
const API_KEY: string = "AIzaSyCQAK-HfYpmCljoCDooRvPIPQcL7MNRTFk";


export default function Results(): React.ReactElement {
    const [results, setResults] = useState<Book[]>([]);

    const location: any = useLocation();
    const queryParams: any = new URLSearchParams(location.search);
    const query: string = queryParams.get('query') || '';
    const category: string = queryParams.get('category') || '';

    useEffect((): void => {
        async function fetchResults(): Promise<void> {
            console.log('Fetching results...' + query);
            try {
                const testURL: string = API_URL + "?q=" + query + "&key=" + API_KEY;
                //const requestURL: string = URL + query;
                const response = await fetch(testURL);
                const data = await response.json();
                setResults(data.items.map((item: any) => new Book({id: item.id, volumeInfo: item.volumeInfo})));
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchResults();
    }, [query]);

    function filterResults(results: Book[]): Book[] {
        if (category) {
            return results.filter((book: Book) => book.categories?.includes(category));
        }
        return results;
    }

    return (
        <div>
            <NavBar/>
            <h1>Results Page</h1>
            <p>Search query: {query}</p>
            <SearchBar/>
            <BookList list={filterResults(results)}/>
        </div>
    );
}

