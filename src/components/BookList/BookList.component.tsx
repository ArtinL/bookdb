import React from 'react';
import BookListItem from './BookListItem/BookListItem.component';
import {Book} from "../../Book";

type BookListProps = {
    list: Book[];
}

export default function BookList({list}: BookListProps): React.ReactElement {
    return (
        <div>
            <h2>Results:</h2>
            {list.map((item: Book, i: number) => (
                <BookListItem key={i} book={item}/>
            ))}
        </div>
    );
}

