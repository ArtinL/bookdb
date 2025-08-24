// noinspection JSIgnoredPromiseFromCall

import React, {Dispatch, ReactElement, SetStateAction, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import StarRating from "../components/StarRating/StarRating.component";
import axios, {AxiosResponse} from "axios";
import AddDB from "../components/BookList/BookListItem/AddDB/AddDB.component";
import {Button, Typography} from "@mui/material";
import {GenericItem} from "../Model/GenericItem";
import {MovieDetail} from "../Model/MovieDetail";
import {styled} from '@mui/material/styles';

//const URL: string = `${process.env.REACT_APP_BACKEND_URL}/${process.env.REACT_APP_SEARCH_ENDPOINT}/`;
const URL: string = `${process.env.REACT_APP_API_URL}/movies/`;

export default function MovieDetails(): ReactElement {
  const [movieData, setMovieData]: [MovieDetail, Dispatch<SetStateAction<MovieDetail>>] = useState<MovieDetail>(new MovieDetail());
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
        setMovieData(new MovieDetail(data));
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
    if (!movieData) return;

    const item: GenericItem = new GenericItem({
      type: "books",
      id: movieData.id,
      title: movieData.title,
      creators: movieData.creators,
      date: movieData.date,
      thumbnail: movieData.thumbnail,
      averageRating: movieData.averageRating,
      ratingsCount: movieData.ratingsCount
    });
    setBriefItem(item);

  }, [movieData]);

  if (!movieData) {
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
            movieData.thumbnail ||
            'https://via.placeholder.com/128x192.png?text=No%20Cover'
          }
          alt={movieData.title}
        />
        <HeaderInfo>
          <Typography variant="h3">{movieData.title}</Typography>
          <p>
            {
              movieData.creators != null ?
                `Director${movieData.creators.length > 1 ? "s" : ""}: ${movieData.creators.join(', ')}` :
                "Unknown"
            }
          </p>
          <p>{
            ("Released " + new Date(movieData.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: '2-digit'
            }))
            || 'Unknown publish date'
          }</p>
          <StarRating rating={movieData.averageRating} totalRatings={movieData.ratingsCount}/>
        </HeaderInfo>
        <HeaderAdd>
          <AddDB alreadyAdded={isAdded} item={briefItem}/>
        </HeaderAdd>

      </Header>
      <Details>
        <Left>
          <Typography variant={"h5"}>{`Rated ${movieData.mpaaRated}` || ''}</Typography>
          <p></p>
          <Typography variant={"h6"}>{`Runtime: ${movieData.runtime} minutes` || ''}</Typography>
          <p></p>
          <Typography variant={"h6"}>Languages:</Typography>
          {movieData.languages ? movieData.languages.map((language: string, index: number) => <p
              key={index}>{language}</p>) :
            <p key="0">Unknown</p>}
          <Typography variant={"h6"}>Genres:</Typography>
          {movieData.genres ? movieData.genres.map((genre: string, index: number) => <p
            key={index}>{genre}</p>) : <p key="0">Unknown</p>}
          <Typography variant={"h6"}>Awards:</Typography>
          <p>{movieData.awards || 'No Data'}</p>
        </Left>
        <Right>
          <Typography variant={"h4"}>Description</Typography>

          <p>{movieData.plot || "No plot summary"}</p>
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
