import React from 'react';
import {BookBrief} from '../../../Model/BookBrief'
import {Link} from 'react-router-dom'
import AddDB from "./AddDB/AddDB.component";

type ItemProps = {
    key: number;
    book: BookBrief;
    alreadyAdded: boolean;
};

export default function BookListItem({book, alreadyAdded}: ItemProps): React.ReactElement {
    //console.log(book)
    return (
        <div>
            <img
                src={book.smallThumbnail || 'https://via.placeholder.com/128x192.png?text=No%20Cover'}
                alt={book.title}/>
            <h3>{book.title}</h3>
            {<p>Authors: {book.authors != null ? book.authors.join(', ') : 'Unknown'}</p>}
            <p>Published Date: {new Date(book.publishedDate).toLocaleDateString()}</p>
            <Link to={`/book/${book.id}`}> Details </Link>
            <AddDB alreadyAdded={alreadyAdded} book={book}/>
            <hr/>


        </div>
    );
};