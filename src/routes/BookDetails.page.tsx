// noinspection JSIgnoredPromiseFromCall

import React, {Dispatch, ReactElement, SetStateAction, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {BookDetail} from '../Model/BookDetail';
import lang from 'iso-639-1'
import StarRating from "../components/StarRating/StarRating.component";
import axios, {AxiosResponse} from "axios";
import AddDB from "../components/BookList/BookListItem/AddDB/AddDB.component";
import {Button, Typography} from "@mui/material";
import {GenericItem} from "../Model/GenericItem";
import {styled} from '@mui/material/styles';

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
    <DetailsRoot>
      <GoBackContainer>
        <Button variant={"outlined"} onClick={handleGoBack}>Go Back</Button>
      </GoBackContainer>
      <Header>
        <img
          className="book-image"
          src={
            bookData.thumbnail ||
            'https://via.placeholder.com/128x192.png?text=No%20Cover'
          }
          alt={bookData.title}
        />
        <HeaderInfo>
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
        </HeaderInfo>
        <HeaderAdd>
          <AddDB alreadyAdded={isAdded} item={briefItem}/>
        </HeaderAdd>

      </Header>
      <Details>
        <Left>
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
        </Left>
        <Right>
          <Typography variant={"h4"}>Description</Typography>

          {bookData.description ?
            <Description
              dangerouslySetInnerHTML={{__html: bookData.description}}
            /> : <p>No description available.</p>
          }
        </Right>
      </Details>

    </DetailsRoot>
  );
}

const DetailsRoot = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 20,
  backgroundColor: '#ffffff',
  width: '100%',
  borderRadius: 8,
}));

const GoBackContainer = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  marginBottom: 20,
}));

const Header = styled('div')(() => ({
  padding: 10,
  display: 'flex',
  color: 'white',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  marginBottom: 20,
  backgroundColor: '#555555',
  borderRadius: 8,
  '& .book-image': { width: 150, height: 225 },
}));

const HeaderInfo = styled('div')(() => ({
  flexGrow: 1,
  textAlign: 'center',
}));

const HeaderAdd = styled('div')(() => ({
  minWidth: '20%',
  display: 'flex',
  justifyContent: 'center',
}));

const Details = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
}));

const Left = styled('div')(() => ({
  width: '20%',
  paddingRight: 20,
}));

const Right = styled('div')(() => ({
  width: '80%',
  flexGrow: 1,
}));

const Description = styled('div')(() => ({
  padding: 10,
  border: '1px solid #ccc',
  borderRadius: 4,
}));
