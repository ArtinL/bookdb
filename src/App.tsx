import React, {ReactElement} from 'react';
import {Routes, Route} from 'react-router-dom';
import Root from './routes/Root';
import Home from './routes/Home.page';
import Results from './routes/Results.page';
import Collection from './routes/Collection.page';
import BookDetails from "./routes/BookDetails.page";
import MovieDetails from "./routes/MovieDetails.page";
import Account from "./routes/Account.page";
import BookRoot from "./routes/BookRoot.page";
import MovieRoot from "./routes/MovieRoot.page";
import SignIn from "./routes/SignIn.page";
import Register from "./routes/Register.page";
import './App.css'

export default function App(): ReactElement {
    return (

        <Routes>
            <Route path="/" element={<Root/>}>
                <Route index element={<Home/>}/>
                <Route path="/books" element={<BookRoot/>}>
                    <Route path="/books/search" element={<Results type="books"/>}/>
                    <Route path="/books/:id" element={<BookDetails/>}/>
                </Route>
                <Route path="/movies" element={<MovieRoot/>}>
                    <Route path="/movies/search" element={<Results type="movies"/>}/>
                    <Route path="/movies/:id" element={<MovieDetails/>}/>
                </Route>

                <Route path="/collection" element={<Collection/>}/>

                <Route path="/account" element={<Account/>}>
                    <Route path="/account/login" element={<SignIn/>}/>
                    <Route path="/account/signup" element={<Register/>}/>
                </Route>
            </Route>
        </Routes>

    );
};


