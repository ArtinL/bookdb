import React, {Dispatch, SetStateAction, useEffect} from 'react';
import ListItem from './BookListItem/ListItem.component';
//import {BookBrief} from '../../Model/BookBrief';
import axios, {AxiosResponse} from "axios";
import {useAuth} from "../../hooks/useAuth";
import {GenericItem} from "../../Model/GenericItem";

interface BookListProps {
    list: GenericItem[];

}

export default function GenericList({list}: BookListProps): React.ReactElement {
    const [matched, setMatched]: [Array<string>, Dispatch<SetStateAction<Array<string>>>] = React.useState(new Array<string>());
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [username, jwt, logIn, logOut]: [string | null, string | null, (username: string, password: string) => void, () => void] = useAuth();

    useEffect((): void => {

        const ids: string[] = list.map((item: GenericItem) => item.id);
        if (username === null || jwt === null) return;
        const URL: string = `http://localhost:8080/favorites/match/${username}`;

        async function matchInDB(): Promise<void> {
            try {
                const response: AxiosResponse = await axios.post(URL, ids, {headers: {"Authorization": `Bearer ${jwt}`}});
                const data: Array<string> = response.data;
                setMatched(data);
            } catch (error) {
                console.log(error);
            }
        }

        // noinspection JSIgnoredPromiseFromCall
        matchInDB();

    }, [jwt, list, username]);

    return (
        <div>
            {list.map((item: GenericItem, i: number) => (
                <ListItem key={i} item={item} alreadyAdded={matched.includes(item.id)}/>
            ))}
        </div>
    );
}

