import React, {
    ChangeEvent,
    Dispatch,
    MouseEventHandler,
    ReactElement,
    SetStateAction,
    useEffect,
    useState
} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
//import {BookBrief} from "../../../../Model/BookBrief";
import axios from "axios";
import ConfirmRemove from "./ConfirmRemove/ConfirmRemove.component";
import {useAuth} from "../../../../hooks/useAuth";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import {HourglassBottom} from "@mui/icons-material";
import {GenericItem} from "../../../../Model/GenericItem";

interface AddDBProps {
    className?: string;
    alreadyAdded: boolean;
    item: GenericItem;
}

export default function AddDB({className, alreadyAdded, item}: AddDBProps): ReactElement {
    const [isInDB, setIsInDB]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [isLoading, setIsLoading]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [display, setDisplay]: [string, Dispatch<SetStateAction<string>>] = useState<string>("Add to Collection");
    const [showConfirm, setShowConfirm]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [username, jwt, logIn, logOut]: [string | null, string | null, (username: string, password: string) => void, () => void] = useAuth();

    const navigate: NavigateFunction = useNavigate();

    useEffect((): void => {
        setIsInDB(alreadyAdded)
        setDisplay(alreadyAdded ? "Remove from Collection" : "Add to Collection");
    }, [alreadyAdded]);


    async function handleClick(e: any): Promise<void> {
        e.stopPropagation();
        setDisplay("Loading...");
        setIsLoading(true)
        if (jwt === null || username === null) {
            navigate('/account/login', {replace: true})
        } else if (isInDB) {
            setShowConfirm(true);
        } else {
            await addToDB(jwt as string, username as string);
        }
        setIsLoading(false)

    }

    const baseURL: string = "http://localhost:8080/favorites/";

    async function addToDB(jwt: string, username: string): Promise<void> {
        const apiURL: string = baseURL + username;

        try {
            await axios.post(apiURL, item, {headers: {"Authorization": `Bearer ${jwt}`}});
            setDisplay("Remove from Collection");
            setIsInDB(true);
        } catch (error) {
            setDisplay("Failed to add");
        }

    }

    async function removeFromDB(): Promise<void> {

        const id: string = item.id;
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

    function cancelRemove(): void {
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