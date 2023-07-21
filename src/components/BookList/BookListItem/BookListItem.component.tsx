import React from 'react';
import {Book} from '../../../Book'
import {Link} from 'react-router-dom'

type ItemProps = {
    key: number;
    book: Book;
};

export default function BookListItem({book}: ItemProps): React.ReactElement {
    return (
        <div>
            <img
                src={book.imageLinks != null ? book.imageLinks.thumbnail : 'https://via.placeholder.com/128x192.png?text=No%20Cover'}
                alt={book.title}/>
            <h3>{book.title}</h3>
            {<p>Authors: {book.authors != null ? book.authors.join(', ') : 'Unknown'}</p>}
            <p>Published Date: {new Date(book.publishedDate).toLocaleDateString()}</p>
            <Link to={`/book`} state={{bookData: book}}> Details </Link>
            <hr/>


        </div>
    );
};