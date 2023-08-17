import React, {Dispatch, SetStateAction, useEffect} from 'react';
import BookListItem from './BookListItem/BookListItem.component';
import {BookBrief} from '../../Model/BookBrief';
import axios from "axios";
import {useAuth} from "../../hooks/useAuth";

type BookListProps = {
    list: BookBrief[];
}

export default function BookList({list}: BookListProps): React.ReactElement {
    const [matched, setMatched]: [Array<string>, Dispatch<SetStateAction<Array<string>>>] = React.useState(new Array<string>());
    const [isLoggedIn, username, jwt]: [boolean, string | null, string | null] = useAuth();

    useEffect((): void => {
        //const username: string | null = localStorage.getItem('username');
        //const jwt: string | null = localStorage.getItem('jwtToken');

        const ids: string[] = list.map((item: BookBrief) => item.id);
        const URL: string = `http://localhost:8080/favorites/match/${username}`;
        //setLoggedIn(jwt !== null);
        if (jwt === null) return;

        async function matchInDB() {
            try {
                const response = await axios.post(URL, ids, {headers: {"Authorization": `Bearer ${jwt}`}});
                const data: Array<string> = response.data;
                //console.log(data);
                setMatched(data);
            } catch (error) {
                console.log(error);
            }
        }

        matchInDB();

    }, [jwt, list, username]);

    return (
        <div>
            <h2>Results:</h2>
            {list.map((item: BookBrief, i: number) => (
                <BookListItem key={i} book={item} alreadyAdded={matched.includes(item.id)}/>
            ))}
        </div>
    );
}

