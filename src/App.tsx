import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Root from './routes/Root';
import Home from './routes/Home.page';
import List from './routes/List.page';
import Collection from './routes/Collection.page';
import BookDetails from "./routes/BookDetails.page";
import Login from "./routes/Login.page";
import Account from "./routes/Account.page";
import SignUp from "./routes/SignUp.page";
import BookRoot from "./routes/BookRoot.page";


const App: React.FC = () => {
    return (
        <Routes>

            <Route path="/" element={<Root/>}>
                <Route index element={<Home/>}/>
                <Route path="/book" element={<BookRoot/>}>
                    <Route path="/book/list" element={<List searchFlag={true}/>}/>
                    <Route path="/book/:id" element={<BookDetails/>}/>
                </Route>

                <Route path="/collection" element={<Collection/>}>
                    <Route path="/collection/list" element={<List searchFlag={false}/>}/>
                </Route>

                <Route path="/account" element={<Account/>}>
                    <Route path="/account/login" element={<Login/>}/>
                    <Route path="/account/signup" element={<SignUp/>}/>
                </Route>
            </Route>

        </Routes>

    );
};

export default App;
