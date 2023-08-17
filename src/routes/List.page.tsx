import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Location, useLocation} from 'react-router-dom';
import BookList from '../components/BookList/BookList.component';
import {BookBrief} from "../Model/BookBrief";
import axios, {AxiosResponse} from "axios";
import {useAuth} from "../hooks/useAuth";

type ListProps = {
    searchFlag: boolean;
}
//const URL: string = `${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_SEARCH_ENDPOINT}?title=`;
const URL: string = `http://localhost:8080/search?title=`;
const favURL = "http://localhost:8080/favorites";
export default function List({searchFlag}: ListProps): React.ReactElement {
    const [results, setResults]: [Array<BookBrief>, Dispatch<SetStateAction<Array<BookBrief>>>] = useState<BookBrief[]>([]);
    const [success, setSuccess]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(true);
    const [isLoggedIn, username, jwt]: [boolean, string | null, string | null] = useAuth();

    const location: Location = useLocation();
    const queryParams: URLSearchParams = new URLSearchParams(location.search);
    const query: string = queryParams.get('query') || '';


    useEffect((): void => {
        async function fetchSearchResults(): Promise<void> {

            try {
                setLoading(true);
                const request: string = URL + query.replace(' ', '+');
                //console.log(request);
                const response: Response = await fetch(request);
                const data: Array<Object> = await response.json();
                setLoading(false);
                setResults(data.map((item: any) => new BookBrief(item)));
                setSuccess(true);
            } catch (error) {
                //console.log("What")
                if (error instanceof TypeError && error.message === 'Failed to fetch') {
                    setLoading(false);
                    setSuccess(false);
                    console.log(error);
                }
                console.log('Error:', error);
            }
        }

        async function fetchCollectionResults(): Promise<void> {
            //const jwt = localStorage.getItem("jwtToken");
            //const username = localStorage.getItem("username");


            try {
                setLoading(true);
                const response: AxiosResponse = await axios.get(`${favURL}/${username}`, {headers: {"Authorization": `Bearer ${jwt}`}});
                const data: Array<Object> = response.data;

                setLoading(false);
                setResults(data.map((item: any) => new BookBrief(item)));
                setSuccess(true);

            } catch (error) {
                setLoading(false);
                setSuccess(false);
                console.log(error);
            }


        }

        if (searchFlag) fetchSearchResults();
        else fetchCollectionResults();
        //fetchSearchResults();

    }, [searchFlag, query, username, jwt]);

    function filterResults(results: BookBrief[]): BookBrief[] {
        // if (category) {
        //     return results.filter((book: BookDetail) => book.categories?.includes(category));
        // }
        return results;
    }

    return (
        <div>
            <h1>Results Page</h1>
            {searchFlag && <p>Search query: {query}</p>}
            {
                loading ? <p>Searching...</p> :
                    (searchFlag && query === '') || (results.length === 0) ? <p>No items to show.</p> :
                        success ? <BookList list={filterResults(results)}/> : <p>Failed to fetch results</p>
            }

        </div>
    );
}

