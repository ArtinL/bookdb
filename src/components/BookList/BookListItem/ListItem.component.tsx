import React, {ReactElement} from 'react';
//import {BookBrief} from '../../../Model/BookBrief';
import {GenericItem} from "../../../Model/GenericItem";
import AddDB from "./AddDB/AddDB.component";
import {Typography} from "@mui/material";
import StarRating from "../../StarRating/StarRating.component";
import {NavigateFunction, useNavigate} from "react-router-dom";
import MovieIcon from '@mui/icons-material/Movie';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {styled} from '@mui/material/styles';

const ItemRoot = styled('div')(() => ({
  display: 'flex',
  cursor: 'pointer',
  backgroundColor: '#eeeeee',
  alignItems: 'center',
  marginBottom: 24,
  padding: 16,
  border: '1px solid #ccc',
  borderRadius: 8,
  transition: 'background-color 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: '#dddddd',
  },
}));

const Cover = styled('img')({
  width: 128,
  height: 192,
  marginRight: 16,
});

const Info = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  padding: 10,
});

const TitleRow = styled('div')({
  display: 'flex',
  fontSize: 18,
  marginBottom: 15,
});

const IconSpan = styled('span')({
  marginLeft: 12,
});

const Authors = styled('div')({
  fontSize: 14,
  color: '#555',
  marginBottom: 15,
});

const Actions = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

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
    <ItemRoot onClick={handleNavDetails}>
      <Cover
        src={item.thumbnail || 'https://via.placeholder.com/128x192.png?text=No%20Cover'}
        alt={item.title}
      />
      <Info>
        <TitleRow>
          <Typography variant="h6">
            {item.title} ({item.date != null ?
            new Date(item.date).getFullYear() :
            "Unknown Date"})
          </Typography>
          <IconSpan>{item.type === 'books' ? <MenuBookIcon/> : <MovieIcon/>}</IconSpan>
        </TitleRow>
        <Authors>
          <Typography variant="body1">
            {
              item.creators != null ?
                `${item.type === 'books' ? "Author" : "Director"}${item.creators.length > 1 ? "s" : ""}: ${item.creators.join(', ')}` :
                "Unknown"
            }
          </Typography>
        </Authors>
        <StarRating rating={item.averageRating} totalRatings={item.ratingsCount}/>
      </Info>
      <Actions>
        <AddDB alreadyAdded={alreadyAdded} item={item}/>
      </Actions>
    </ItemRoot>
  );
};