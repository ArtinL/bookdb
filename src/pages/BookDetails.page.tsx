import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Book} from '../Book';
import Navbar from "../components/NavBar/NavBar.component";

export default function BookDetails(): React.ReactElement {
    const location: any = useLocation();
    const navigate: any = useNavigate();

    const bookData: Book = location.state?.bookData;

    if (!bookData) {
        return <div>No book data available</div>;
    }

    function handleGoBack(): void {
        navigate(-1);
    }

    return (
        <div>
            <Navbar/>
            <button onClick={handleGoBack}>Go Back</button>
            <h2>Book Details</h2>
            <img
                src={bookData.imageLinks != null ? bookData.imageLinks.smallThumbnail : 'https://via.placeholder.com/128x192.png?text=No%20Cover'}
                alt={bookData.title}/>
            <p>Title: {bookData.title}</p>
            <p>Authors: {bookData.authors != null ? bookData.authors.join(', ') : 'Unknown'}</p>
            <p>Published Date: {bookData.publishedDate}</p>
            <p>Publisher: {bookData.publisher}</p>
            <p>Page Count: {bookData.pageCount}</p>
            <p>Categories: {bookData.categories != null ? bookData.categories.join(', ') : 'Unknown'}</p>
            <p>Average Rating: {bookData.averageRating}</p>
            <p>Ratings Count: {bookData.ratingsCount}</p>
            <p>Description: {bookData.description}</p>

        </div>
    );
}
