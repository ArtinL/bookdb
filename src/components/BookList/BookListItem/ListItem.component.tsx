import React, {ReactElement} from 'react';
//import {BookBrief} from '../../../Model/BookBrief';
import {GenericItem} from "../../../Model/GenericItem";
import AddDB from "./AddDB/AddDB.component";
import './BookListItem.style.css';
import {Typography} from "@mui/material";
import StarRating from "../../StarRating/StarRating.component";
import {useNavigate, NavigateFunction} from "react-router-dom";
import MovieIcon from '@mui/icons-material/Movie';
import MenuBookIcon from '@mui/icons-material/MenuBook';

interface ItemProps {
    key: number;
    item: GenericItem;
    alreadyAdded: boolean;
}

export default function ListItem({item, alreadyAdded}: ItemProps): ReactElement {

    const navigate: NavigateFunction = useNavigate();


    function handleNavDetails() {
        console.log(item)
        navigate(`/${item.type}/${item.id}`)
    }

    return (
        <div className="book-list-item" onClick={handleNavDetails}>
            <img
                className="book-cover"
                src={item.thumbnail || 'https://via.placeholder.com/128x192.png?text=No%20Cover'}
                alt={item.title}
            />
            <div className="book-info">
                <div className="book-title">
                    <Typography variant="h6">
                        {item.title} ({item.date != null ?
                        new Date(item.date).getFullYear() :
                        "Unknown Date"})
                    </Typography>
                    <span className="icon">{item.type === 'books' ? <MenuBookIcon/> : <MovieIcon/>}</span>
                </div>
                <div className="book-authors">
                    <Typography variant="body1">
                        {
                            item.creators != null ?
                                `${item.type === 'books' ? "Author" : "Director"}${item.creators.length > 1 ? "s" : ""}: ${item.creators.join(', ')}` :
                                "Unknown"
                        }
                    </Typography>
                </div>
                <StarRating rating={item.averageRating} totalRatings={item.ratingsCount}/>
            </div>
            <div className="book-actions">
                <AddDB className="add-db" alreadyAdded={alreadyAdded} item={item}/>
            </div>
        </div>
    );
};