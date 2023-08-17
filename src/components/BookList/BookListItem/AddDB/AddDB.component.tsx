import React, {Dispatch, ReactElement, SetStateAction, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {BookBrief} from "../../../../Model/BookBrief";
import axios, {AxiosResponse} from "axios";
import ConfirmRemove from "./ConfirmRemove/ConfirmRemove.component";
import {useAuth} from "../../../../hooks/useAuth";

type AddDBProps = {
    alreadyAdded: boolean;
    book: BookBrief;
}
export default function AddDB({alreadyAdded, book}: AddDBProps): ReactElement {
    const [isInDB, setIsInDB]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [display, setDisplay]: [string, Dispatch<SetStateAction<string>>] = useState<string>("Add to Favorites");
    const [showConfirm, setShowConfirm]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [isLoggedIn, username, jwt]: [boolean, string | null, string | null] = useAuth();

    const navigate = useNavigate();

    useEffect((): void => {
        setIsInDB(alreadyAdded)
        setDisplay(alreadyAdded ? "Remove from Favorites" : "Add to Favorites");
    }, [alreadyAdded]);


    async function handleClick() {
        //const jwt: string | null = localStorage.getItem('jwtToken');
        //const username: string | null = localStorage.getItem('username');
        setDisplay("Loading...");
        if (jwt === null || username === null) {
            navigate('/account/login', {replace: true})
        } else if (isInDB) {
            //await removeFromDB();
            setShowConfirm(true);
        } else {
            await addToDB(jwt as string, username as string);
        }

        //window.location.reload();
    }

    const baseURL = "http://localhost:8080/favorites/";

    async function addToDB(jwt: string, username: string) {
        const apiURL: string = baseURL + username;

        try {
            //console.log(book);
            await axios.post(apiURL, book, {headers: {"Authorization": `Bearer ${jwt}`}});
            setDisplay("Remove from Favorites");
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
            setDisplay("Add to Favorites");
            setIsInDB(false);
            if (window.location.pathname.includes("collection"))
                window.location.reload();
        } catch (error) {
            setDisplay("Failed to remove");
        }


    }

    function cancelRemove() {
        setShowConfirm(false);
        setDisplay("Remove from Favorites");
    }

    return (
        <div>
            {!showConfirm && <button onClick={handleClick}>{display}</button>}
            {showConfirm && <ConfirmRemove handleRemove={removeFromDB} handleCancel={cancelRemove}/>}
        </div>
    );
}