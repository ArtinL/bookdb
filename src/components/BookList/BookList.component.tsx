import React from 'react';
import BookListItem from './BookListItem/BookListItem.component';
import {Book} from "../../Book";

type BookListProps = {
    list: Book[];
}

const BookList: React.FC<BookListProps> = (props: any) => {
    const list: Book[] = props.list;
    return (
        <div>
            <h2>Results:</h2>
            {list.map((book: Book, index: number) => (
                <BookListItem key={index} item={book}/>
            ))}
        </div>
    );
};

export default BookList;
