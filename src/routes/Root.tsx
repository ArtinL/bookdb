import React from 'react';
import {Outlet} from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar.component';

export default function Home(): React.ReactElement {

    return (
        <div>
            <NavBar/>
            <Outlet/>
        </div>
    );
}

