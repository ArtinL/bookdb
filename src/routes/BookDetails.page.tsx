// noinspection JSIgnoredPromiseFromCall

import React, {Dispatch, ReactElement, SetStateAction, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {BookDetail} from '../Model/BookDetail';
import lang from 'iso-639-1'
import StarRating from "../components/StarRating/StarRating.component";
import axios, {AxiosResponse} from "axios";
import AddDB from "../components/BookList/BookListItem/AddDB/AddDB.component";
import './styles/BookDetails.style.css'
import {Button, Typography} from "@mui/material";
import {GenericItem} from "../Model/GenericItem";

//const URL: string = `${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_SEARCH_ENDPOINT}/`;
const URL: string = `${process.env.REACT_APP_API_URL}/books/`;

export default function BookDetails(): ReactElement {
    const [bookData, setBookData]: [BookDetail, Dispatch<SetStateAction<BookDetail>>] = useState<BookDetail>(new BookDetail());
    const [briefItem, setBriefItem]: [GenericItem, Dispatch<SetStateAction<GenericItem>>] = useState<GenericItem>(new GenericItem());
    const [isAdded, setIsAdded]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const navigate: any = useNavigate();
    const {id} = useParams();

    useEffect((): void => {
        const jwt: string | null = localStorage.getItem('jwtToken');

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
            const matchURL: string = `${process.env.REACT_APP_API_URL}/favorites/match/${localStorage.getItem('username')}`;
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

    useEffect((): void => {
        if (!bookData) return;

        const item: GenericItem = new GenericItem({
            type: "books",
            id: bookData.id,
            title: bookData.title,
            creators: bookData.creators,
            date: bookData.date,
            thumbnail: bookData.thumbnail,
            averageRating: bookData.averageRating,
            ratingsCount: bookData.ratingsCount
        });
        setBriefItem(item);

    }, [bookData]);

    if (!bookData) {
        return <div>No book data available</div>;
    }

    function handleGoBack(): void {
        navigate(-1);
    }

    return (
        <div className="book-details-container">
            <div className="go-back-container">
                <Button variant={"outlined"} onClick={handleGoBack}>Go Back</Button>
            </div>
            <div className="header">
                <img
                    className="book-image"
                    src={
                        bookData.thumbnail ||
                        'https://via.placeholder.com/128x192.png?text=No%20Cover'
                    }
                    alt={bookData.title}
                />
                <div className="header-info">
                    <Typography variant="h3">{bookData.title}</Typography>
                    <p>
                        {
                            bookData.creators != null ?
                                `Author${bookData.creators.length > 1 ? "s" : ""}: ${bookData.creators.join(', ')}` :
                                "Unknown"
                        }
                    </p>
                    <p>{
                        ("Published " + new Date(bookData.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }))
                        || 'Unknown publish date'
                    }</p>
                    <StarRating rating={bookData.averageRating} totalRatings={bookData.ratingsCount}/>
                </div>
                <div className={"header-add"}>
                    <AddDB alreadyAdded={isAdded} item={briefItem}/>
                </div>

            </div>
            <div className="details">
                <div className="left-section">
                    <Typography variant={"h6"}>Publisher:</Typography>
                    <p>{bookData.publisher || 'Unknown'}</p>
                    <Typography variant={"h6"}>Page Count:</Typography>
                    <p>{bookData.pageCount || 'No Data'}</p>
                    <Typography variant={"h6"}>Language:</Typography>
                    <p>{lang.getName(bookData.language)}</p>
                    <Typography variant={"h6"}>Categories:</Typography>
                    <p>{bookData.categories || 'Unknown'}</p>
                    {bookData.saleInfo.saleability && (
                        <div>
                            <Typography variant={"h6"}>Sale Info:</Typography>
                            <p>Price: ${bookData.saleInfo.retailPrice}</p>
                            <a href={bookData.saleInfo.buyLink}>Purchase</a>
                        </div>
                    )}

                </div>
                <div className="right-section">
                    <Typography variant={"h4"}>Description</Typography>

                    {bookData.description ?
                        <div
                            className="description"
                            dangerouslySetInnerHTML={{__html: bookData.description}}
                        /> : <p>No description available.</p>
                    }
                </div>
            </div>

        </div>
    );
}
