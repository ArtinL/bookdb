// noinspection HtmlUnknownTarget

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useAuth} from "../hooks/useAuth";
import axios, {AxiosError, isAxiosError} from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {ChangeEvent, Dispatch, ReactElement, SetStateAction, useEffect, useState} from "react";
import {Paper} from "@mui/material";
import emailValidator from "email-validator";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/ArtinL/">
                Artin Lahni
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const errorMsgSx = {
    backgroundColor: '#ffb9b5',
    border: '#4f0304',
    color: 'Black',
    padding: '30px',
    textAlign: 'center',
    margin: '20px',
}

interface resType {
    user: {
        userId: number,
        username: string,
    },
    jwt: string
}

export default function SignIn(): ReactElement {
    const [errorMsg, setErrorMsg]: [string, Dispatch<SetStateAction<string>>] = useState("");
    const [showErrorBox, setShowErrorBox]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

    const [info, setInfo]: [string, Dispatch<SetStateAction<string>>] = useState<string>("");
    const [pass, setPass]: [string, Dispatch<SetStateAction<string>>] = useState<string>("");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [username, jwt, logIn, logOut]: [string | null, string | null, (username: string, password: string) => void, () => void] = useAuth();

    useEffect(() => {
        if (errorMsg !== "") {
            setShowErrorBox(true);
        } else setShowErrorBox(false);
    }, [errorMsg]);

    const navigate: NavigateFunction = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        let emailToSend: string = '';
        let usernameToSend: string = '';

        if (emailValidator.validate(info)) {
            emailToSend = info;
        } else {
            usernameToSend = info;
        }

        const userObj: { email: string, username: string, password: string } = {
            email: emailToSend,
            username: usernameToSend,
            password: pass
        }

        let res: resType;
        const URL: string = "http://localhost:8080/auth/login";
        try {
            res = (await axios.post(URL, userObj)).data;
            navigate('/');
            logIn(res.user.username, res.jwt);
            setErrorMsg("");
        } catch (error) {
            setErrorMsg("Invalid username or password");
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    {showErrorBox && (
                        <Paper
                            elevation={3}
                            sx={errorMsgSx}
                        >
                            {errorMsg}
                        </Paper>
                    )}

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username or Email"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setInfo(event.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPass(event.target.value)}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/account/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
}