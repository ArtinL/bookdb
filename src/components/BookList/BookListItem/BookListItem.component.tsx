import React, {ReactElement} from 'react';
import {BookBrief} from '../../../Model/BookBrief';
import AddDB from "./AddDB/AddDB.component";
import './BookListItem.style.css';
import {Button} from "@mui/material";

interface ItemProps {
    key: number;
    book: BookBrief;
    alreadyAdded: boolean;
}

export default function BookListItem({book, alreadyAdded}: ItemProps): ReactElement {

    return (
        <div className="book-list-item">
            <img
                className="book-cover"
                src={book.smallThumbnail || 'https://via.placeholder.com/128x192.png?text=No%20Cover'}
                alt={book.title}
            />
            <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-authors">
                    Authors: {book.authors != null ? book.authors.join(', ') : 'Unknown'}
                </p>
                <p className="book-published-date">
                    Published Date: {new Date(book.publishedDate).toLocaleDateString()}
                </p>
                <Button className="book-details-link" href={`/book/${book.id}`}>
                    Details
                </Button>
            </div>
            <div className="book-actions">
                <AddDB className="add-db" alreadyAdded={alreadyAdded} book={book}/>
            </div>
        </div>
    );
};