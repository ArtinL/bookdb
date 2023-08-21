// noinspection JSIgnoredPromiseFromCall

import React, {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from 'react';
import {Location, NavigateFunction, useLocation, useNavigate} from 'react-router-dom';
import BookList from '../components/BookList/BookList.component';
import {BookBrief} from "../Model/BookBrief";
import axios, {AxiosError, AxiosResponse, isAxiosError} from "axios";
import {useAuth} from "../hooks/useAuth";
import {Pagination, Typography} from "@mui/material";
import './styles/List.style.css';

interface ListProps {
    searchFlag: boolean;
}

//const URL: string = `${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_SEARCH_ENDPOINT}?title=`;
const URL: string = `http://localhost:8080/search`;
const favURL = "http://localhost:8080/favorites";
export default function List({searchFlag}: ListProps): React.ReactElement {
    const [results, setResults]: [Array<BookBrief>, Dispatch<SetStateAction<Array<BookBrief>>>] = useState<BookBrief[]>([]);
    const [success, setSuccess]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [username, jwt, logIn, logOut]: [string | null, string | null, (username: string, password: string) => void, () => void] = useAuth();

    const location: Location = useLocation();
    const queryParams: URLSearchParams = new URLSearchParams(location.search);
    const query: string = queryParams.get('query') || '';
    const page: string = queryParams.get('page') || '1';

    const navigate: NavigateFunction = useNavigate();


    useEffect((): void => {
        async function fetchSearchResults(): Promise<void> {

            try {
                setLoading(true);
                const request: string = `${URL}?title=${query.replace(' ', '+')}&page=${page}`;
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

            try {
                setLoading(true);
                const response: AxiosResponse = await axios.get(`${favURL}/${username}`, {headers: {"Authorization": `Bearer ${jwt}`}});
                const data: Array<Object> = response.data;

                setLoading(false);
                setResults(data.map((item: any) => new BookBrief(item)));
                setSuccess(true);

            } catch (error) {

                if (isAxiosError(error) && (error as AxiosError).response?.status === 401) {
                    logOut();
                    navigate('/account/login', {replace: true});
                }


                setLoading(false);
                setSuccess(false);
                console.log(error);
            }


        }

        if (searchFlag) fetchSearchResults();
        else if (username && jwt) fetchCollectionResults();

    }, [searchFlag, query, username, jwt, page]);

    function handlePageNavigation(e: ChangeEvent<any>, page: number): void {
        navigate(`${location.pathname}?query=${query}&page=${page}`)
    }

    return (
        <div id="list-root-container">
            <Typography variant="h4">{searchFlag ? `Search Results` : "Saved Books"}</Typography>
            <div className="list-container">
                {
                    loading ? <p>Searching...</p> :
                        !success ? <p>Failed to fetch results</p> :
                            (searchFlag && query === '') || (!searchFlag && results.length === 0) ?
                                <p>No items to show.</p> :
                                <BookList list={results}/>
                }
                {(success && searchFlag) &&
                    <div className="page-container">
                        <Pagination
                            onChange={handlePageNavigation}
                            count={10}
                            shape="rounded"
                            size="large"
                        />
                    </div>
                }
            </div>
        </div>
    );
}

