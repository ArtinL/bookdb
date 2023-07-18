import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home.page';
import Results from './pages/Results.page';
import Collection from './pages/Collection.page';
import BookDetails from "./pages/BookDetails.page";

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/results" element={<Results/>}/>
                <Route path="/collection" element={<Collection/>}/>
                <Route path="/book" element={<BookDetails/>}/>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
