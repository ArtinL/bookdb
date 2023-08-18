import React, {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {BookDetail} from '../Model/BookDetail';
import lang from 'iso-639-1'
import AdaptWidget from "../components/AdaptWidget/AdaptWidget.component";
import StarRating from "../components/StarRating/StarRating.component";
import axios, {AxiosResponse} from "axios";
import {BookBrief} from "../Model/BookBrief";
import AddDB from "../components/BookList/BookListItem/AddDB/AddDB.component";
import './styles/BookDetails.style.css'
import {Button, Typography} from "@mui/material";

//const URL: string = `${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_SEARCH_ENDPOINT}/`;
const URL: string = `http://localhost:8080/search/`;
export default function BookDetails(): React.ReactElement {
    const [bookData, setBookData] = React.useState<BookDetail | null>(null);
    const [bookBrief, setBookBrief] = React.useState<BookBrief | null>(null);
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);
    const [isAdded, setIsAdded] = React.useState<boolean>(false);
    const navigate: any = useNavigate();
    const {id} = useParams();

    useEffect((): void => {
        const jwt: string | null = localStorage.getItem('jwtToken');
        setIsLoggedIn(jwt !== null);

        async function fetchBook(): Promise<void> {
            try {
                const response: any = await fetch(URL + id);
                const data = await response.json();
                setBookData(new BookDetail(data));
            } catch (error) {
                console.error('Error:', error);
            }
        }

        async function matchInDB(): Promise<void> {
            const ids: string[] = [id as string];
            const matchURL: string = `http://localhost:8080/favorites/match/${localStorage.getItem('username')}`;
            try {
                const response: AxiosResponse<any> = await axios.post(matchURL, ids, {headers: {"Authorization": `Bearer ${jwt}`}});
                const data: Array<string> = response.data;
                setIsAdded(data.length > 0);
            } catch (error) {
                console.log(error);
            }
        }

        if (jwt) matchInDB();
        fetchBook();
    }, [id]);

    useEffect(() => {
        if (!bookData) return;

        const brief: BookBrief = new BookBrief({
            id: bookData.id,
            title: bookData.title,
            authors: bookData.authors,
            publishedDate: bookData.publishedDate,
            smallThumbnail: bookData.largeThumbnail,
        });
        setBookBrief(brief);

    }, [bookData]);

    if (!bookData) {
        return <div>No book data available</div>;
    }

    function handleGoBack(): void {
        navigate(-1);
    }

    return (
        <div className="book-details-container">
            <div className="header">
                <img
                    className="book-image"
                    src={
                        bookData.largeThumbnail ||
                        'https://via.placeholder.com/128x192.png?text=No%20Cover'
                    }
                    alt={bookData.title}
                />
                <div className="header-info">
                    <h2>{bookData.title}</h2>
                    <p>Authors: {bookData.authors || 'Unknown'}</p>
                    <p>Published Date: {bookData.publishedDate || 'Unknown'}</p>
                    <StarRating rating={bookData.averageRating} totalRatings={bookData.ratingsCount}/>
                </div>
                <AddDB alreadyAdded={isAdded} book={bookBrief as BookBrief}/>
            </div>
            <div className="details">
                <div className="left-section">
                    <Typography variant={"h6"}>Publisher:</Typography>
                    <p>{bookData.publisher || 'Unknown'}</p>
                    <Typography variant={"h6"}>Publisher:</Typography>
                    <p>{bookData.pageCount || 'No Data'}</p>
                    <Typography variant={"h6"}>Publisher:</Typography>
                    <p>{lang.getName(bookData.language)}</p>
                    <Typography variant={"h6"}>Publisher:</Typography>
                    <p>{bookData.categories || 'Unknown'}</p>
                </div>
                <div className="right-section">
                    <Typography variant={"h4"}>Description</Typography>
                    <div
                        className="description"
                        dangerouslySetInnerHTML={{__html: bookData.description}}
                    />
                </div>
            </div>

        </div>
    );
}
