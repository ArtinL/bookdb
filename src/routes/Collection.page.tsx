import React, {Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react';
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useAuth} from '../hooks/useAuth';
import {Typography} from "@mui/material";
import './styles/Collection.style.css';
import axios, {AxiosError, AxiosResponse, isAxiosError} from "axios";
import GenericList from "../components/BookList/GenericList.component";
import {GenericItem} from "../Model/GenericItem";
import TypeSelector from "../components/SearchBar/TypeSelector/TypeSelector.component";


const favURL = "https://artin-media-backend.azurewebsites.net/favorites";

export default function Collection(): React.ReactElement {
    const [type, setType]: [string, Dispatch<SetStateAction<string>>] = useState<string>('books');
    const [results, setResults]: [Array<GenericItem>, Dispatch<SetStateAction<Array<GenericItem>>>] = useState<GenericItem[]>([]);
    const [success, setSuccess]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [loading, setLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(true);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [username, jwt, logIn, logOut]: [string | null, string | null, (username: string, password: string) => void, () => void] = useAuth();

    const navigate: NavigateFunction = useNavigate();

    const fetchCollectionResults = useCallback(async (): Promise<void> => {

        try {
            setLoading(true);
            const response: AxiosResponse = await axios.get(`${favURL}/${type}/${username}`, {headers: {"Authorization": `Bearer ${jwt}`}});
            const data: Array<Object> = response.data;

            setLoading(false);
            setResults(data.map((item: any) => item as GenericItem));
            setSuccess(true);

        } catch (error) {
            setLoading(false);
            setSuccess(false);
            console.log(error);
        }


    }, [type, jwt, username]);


    useEffect((): void => {
        const loggedIn: boolean = !!(localStorage.getItem('jwtToken') && localStorage.getItem('username'));

        if (!loggedIn) {
            navigate('/account/login')
        } else {
            navigate('/collection')
        }
    }, [navigate])

    useEffect(() => {
        fetchCollectionResults();
    }, [fetchCollectionResults]);


    return (
        <div id="collection-container">
            <Typography variant="h3">Collection for {username}</Typography>
            <TypeSelector setType={setType}/>
            {
                loading ? <Typography variant="h5">Loading...</Typography> :
                    !success ? <Typography variant="h5">Unable to fetch results</Typography> :
                        results.length === 0 ? <Typography variant="h5">No items in collection</Typography> :
                            <GenericList list={results}/>
            }

        </div>
    );
}
