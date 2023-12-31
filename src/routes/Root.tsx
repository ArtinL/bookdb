import React, {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import AppBar from '../components/NavBar/AppBar.component'
import {useAuth} from "../hooks/useAuth";
import axios from "axios";
import Footer from "../components/Footer/Footer.component";
import '../App.css';

export default function Home(): React.ReactElement {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [username, jwt, logIn, logOut]: [string | null, string | null, (username: string, password: string) => void, () => void] = useAuth();
    useEffect(() => {
        if (jwt) {
            const validateURL = "https://artin-media-backend.azurewebsites.net/favorites/test";

            async function validate() {
                try {
                    await axios.get(validateURL, {headers: {"Authorization": `Bearer ${jwt}`}});
                } catch (error) {
                    logOut();
                }
            }

            // noinspection JSIgnoredPromiseFromCall
            validate();
        }
    }, [jwt, logOut]);
    return (
        <div className="root-container">
            <AppBar/>
            <div className="content-container">

                <Outlet/>

            </div>
            <Footer/>
        </div>
    );
}

