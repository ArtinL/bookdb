// noinspection JSIgnoredPromiseFromCall

import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react';
import {Location, NavigateFunction, useLocation, useNavigate} from 'react-router-dom';
import GenericList from '../components/BookList/GenericList.component';
import axios, {AxiosError, AxiosResponse, isAxiosError} from "axios";
import {useAuth} from "../hooks/useAuth";
import {Pagination, Typography} from "@mui/material";
import './styles/List.style.css';
import {GenericItem} from "../Model/GenericItem";

interface ResultsProps {
    type: string;
}

//const URL: string = `${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_SEARCH_ENDPOINT}?title=`;
const URL: string = `http://localhost:8080/search`;
export default function Results({type}: ResultsProps): React.ReactElement {
    const [results, setResults]: [Array<GenericItem>, Dispatch<SetStateAction<Array<GenericItem>>>] = useState<GenericItem[]>([]);
    const [success, setSuccess]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [username, jwt, logIn, logOut]: [string | null, string | null, (username: string, password: string) => void, () => void] = useAuth();

    const location: Location = useLocation();
    const queryParams: URLSearchParams = new URLSearchParams(location.search);
    const query: string = queryParams.get('query') || '';
    const page: string = queryParams.get('page') || '1';

    const navigate: NavigateFunction = useNavigate();

    const fetchBooks = useCallback(async (): Promise<void> => {

        try {
            setLoading(true);
            const request: string = `${URL}?title=${query.replace(' ', '+')}&page=${page}&type=${type}`;
            console.log(request);
            const response: Response = await fetch(request);
            const data: Array<Object> = await response.json();
            setLoading(false);
            setResults(data.map((item: any) => new GenericItem(item)));
            setSuccess(true);
        } catch (error) {
            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                setLoading(false);
                setSuccess(false);
                console.log(error);
            }
            console.log('Error:', error);
        }
    }, [query, page, type]);


    useEffect((): void => {
        fetchBooks();
    }, [fetchBooks]);

    function handlePageNavigation(e: ChangeEvent<any>, page: number): void {
        navigate(`${location.pathname}?query=${query}&page=${page}`)
    }

    return (
        <div id="list-root-container">
            <Typography variant="h4">{`Search Results`}</Typography>
            <div className="list-container">
                {
                    query === '' ? <Typography variant="h5">Nothing to show</Typography> :
                        loading ? <Typography variant="h5">Loading...</Typography> :
                            !success ? <Typography variant="h5">Unable to fetch results</Typography> :
                                results.length === 0 ? <Typography variant="h5">No items found</Typography> :
                                    <GenericList list={results}/>
                }
                {(success) &&
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

