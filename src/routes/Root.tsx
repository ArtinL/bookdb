import React, {useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import NavBar from '../components/NavBar/NavBar.component';
import {useAuth} from "../hooks/useAuth";
import axios from "axios";
import Footer from "../components/Footer/Footer.component";
import '../App.css';
import {Container} from "@mui/material";

export default function Home(): React.ReactElement {
    const [username, jwt, logIn, logOut]: [string | null, string | null, (username: string, password: string) => void, () => void] = useAuth();
    useEffect(() => {
        if (jwt) {
            const validateURL = "http://localhost:8080/favorites/test";

            async function validate() {
                try {
                    await axios.get(validateURL, {headers: {"Authorization": `Bearer ${jwt}`}});
                } catch (error) {
                    logOut();
                }
            }

            validate();
        }
    }, [jwt, logOut]);
    return (
        <div className="root-container">
            <NavBar/>
            <div className="content-container">
                <Container>
                    <Outlet/>
                </Container>
            </div>
            <Footer/>
        </div>
    );
}

