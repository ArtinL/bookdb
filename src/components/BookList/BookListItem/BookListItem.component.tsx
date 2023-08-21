import React, {ReactElement} from 'react';
import {BookBrief} from '../../../Model/BookBrief';
import AddDB from "./AddDB/AddDB.component";
import './BookListItem.style.css';
import {Button, Typography} from "@mui/material";
import StarRating from "../../StarRating/StarRating.component";
import {useNavigate, NavigateFunction} from "react-router-dom";

interface ItemProps {
    key: number;
    book: BookBrief;
    alreadyAdded: boolean;
}

export default function BookListItem({book, alreadyAdded}: ItemProps): ReactElement {

    const navigate: NavigateFunction = useNavigate();

    function handleNavDetails() {
        navigate(`/book/${book.id}`, {replace: true})
    }

    return (
        <div className="book-list-item" onClick={handleNavDetails}>
            <img
                className="book-cover"
                src={book.smallThumbnail || 'https://via.placeholder.com/128x192.png?text=No%20Cover'}
                alt={book.title}
            />
            <div className="book-info">
                <div className="book-title">
                    <Typography variant="h6">
                        {book.title} ({new Date(book.publishedDate).getFullYear()})
                    </Typography>
                </div>
                <div className="book-authors">
                    <Typography variant="body1">
                        {
                            book.authors != null ?
                                `Author${book.authors.length > 1 ? "s" : ""}: ${book.authors.join(', ')}` :
                                "Unknown"
                        }
                    </Typography>
                </div>
                {book.averageRating ? <StarRating rating={book.averageRating} totalRatings={book.ratingsCount}/> :
                    "No ratings available"}
            </div>
            <div className="book-actions">
                <AddDB className="add-db" alreadyAdded={alreadyAdded} book={book}/>
            </div>
        </div>
    );
};