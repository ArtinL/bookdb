import React, {Dispatch, ReactElement, SetStateAction, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {BookBrief} from "../../../../Model/BookBrief";
import axios, {AxiosResponse} from "axios";
import ConfirmRemove from "./ConfirmRemove/ConfirmRemove.component";
import {useAuth} from "../../../../hooks/useAuth";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {HourglassBottom} from "@mui/icons-material";

interface AddDBProps {
    className?: string;
    alreadyAdded: boolean;
    book: BookBrief;
}

export default function AddDB({className, alreadyAdded, book}: AddDBProps): ReactElement {
    const [isInDB, setIsInDB]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [isLoading, setIsLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [display, setDisplay]: [string, Dispatch<SetStateAction<string>>] = useState<string>("Add to Collection");
    const [showConfirm, setShowConfirm]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [username, jwt, logIn, logOut]: [string | null, string | null, (username: string, password: string) => void, () => void] = useAuth();

    const navigate = useNavigate();

    useEffect((): void => {
        setIsInDB(alreadyAdded)
        setDisplay(alreadyAdded ? "Remove from Collection" : "Add to Collection");
    }, [alreadyAdded]);


    async function handleClick() {
        //const jwt: string | null = localStorage.getItem('jwtToken');
        //const username: string | null = localStorage.getItem('username');
        setDisplay("Loading...");
        setIsLoading(true)
        if (jwt === null || username === null) {
            navigate('/account/login', {replace: true})
        } else if (isInDB) {
            //await removeFromDB();
            setShowConfirm(true);
        } else {
            await addToDB(jwt as string, username as string);
        }
        setIsLoading(false)

        //window.location.reload();
    }

    const baseURL = "http://localhost:8080/favorites/";

    async function addToDB(jwt: string, username: string) {
        const apiURL: string = baseURL + username;

        try {
            //console.log(book);
            await axios.post(apiURL, book, {headers: {"Authorization": `Bearer ${jwt}`}});
            setDisplay("Remove from Collection");
            setIsInDB(true);
        } catch (error) {
            setDisplay("Failed to add");
        }

    }

    async function removeFromDB() {
        //const jwt: string | null = localStorage.getItem('jwtToken');
        //const username: string | null = localStorage.getItem('username');

        const id: string = book.id;
        const apiURL: string = baseURL + username as string + "/" + id;

        try {
            await axios.delete(apiURL, {headers: {"Authorization": `Bearer ${jwt as string}`}});
            setDisplay("Add to Collection");
            setIsInDB(false);

            if (window.location.pathname.includes("collection")) window.location.reload();
            else setShowConfirm(false);

        } catch (error) {
            setDisplay("Failed to remove");
        }


    }

    function cancelRemove() {
        setShowConfirm(false);
        setDisplay("Remove from Collection");
    }

    return (
        <div>
            {!showConfirm && <Button size="small" variant="contained"
                                     color={isInDB ? "error" : "success"}
                                     startIcon={isLoading ? <HourglassBottom/> : isInDB ? <DeleteIcon/> : <AddIcon/>}
                                     onClick={handleClick}>{display}</Button>}
            {showConfirm && <ConfirmRemove handleRemove={removeFromDB} handleCancel={cancelRemove}/>}
        </div>
    );
}