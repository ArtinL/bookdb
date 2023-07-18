import React from 'react';
import {Book} from '../../../Book'
import {Link} from 'react-router-dom'

type ItemProps = {
    item: Book;
};

const BookListItem: React.FC<ItemProps> = (props: any) => {
    const book: Book = props.item;
    //console.log(book)

    return (
        <div>
            <h3>Title: {book.title}</h3>
            {<p>Authors: {book.authors != null ? book.authors.join(', ') : 'Unknown'}</p>}
            <p>Published Date: {new Date(book.publishedDate).toLocaleDateString()}</p>
            <Link to={`/book`} state={{bookData: book}}> Details </Link>


        </div>
    );
};

export default BookListItem;
