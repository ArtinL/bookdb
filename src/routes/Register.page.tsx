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
import axios from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {ChangeEvent, Dispatch, ReactElement, SetStateAction, useEffect, useState} from "react";
import {AxiosError, isAxiosError} from "axios";
import {Paper} from "@mui/material";
import emailValidator from "email-validator";


const USER_REGEX: RegExp = /^[a-zA-Z0-9]{4,16}$/;
const PASS_REGEX: RegExp = /^^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,24}$/;

//const EMAIL_REGEX: RegExp = /^[A-Za-z0-9+_.-]+@(.+)$/;


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

const errorMsgSx = {
    backgroundColor: '#ffb9b5',
    border: '#4f0304',
    color: 'Black',
    padding: '30px',
    textAlign: 'center',
    margin: '20px',
}

const errorSx = {
    backgroundColor: '#ffd6d2',
    border: '1px solid',
    //borderRadius: '5px',
    borderColor: '#4f0304',
    color: 'Black',
    padding: '5px',
    textAlign: 'center',
    margin: '5px',
    marginBottom: '20px'
}

const defaultTheme = createTheme();

export default function SignUp(): ReactElement {
    const [errorMsg, setErrorMsg]: [string, Dispatch<SetStateAction<string>>] = useState("");
    const [showErrorBox, setShowErrorBox]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

    const [email, setEmail]: [string, Dispatch<SetStateAction<string>>] = useState<string>("");
    const [user, setUser]: [string, Dispatch<SetStateAction<string>>] = useState<string>("");
    const [pass, setPass]: [string, Dispatch<SetStateAction<string>>] = useState<string>("");
    const [confirmPass, setConfirmPass]: [string, Dispatch<SetStateAction<string>>] = useState<string>("");

    const [emailValid, setEmailValid]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [userValid, setUserValid]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [passValid, setPassValid]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [confirmPassValid, setConfirmPassValid]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

    useEffect((): void => {
        setEmailValid(emailValidator.validate(email));
    }, [email]);

    useEffect((): void => {
        setUserValid(USER_REGEX.test(user));
    }, [user]);

    useEffect((): void => {
        setPassValid(PASS_REGEX.test(pass));
        setConfirmPassValid(pass === confirmPass);
    }, [pass, confirmPass]);

    useEffect((): void => {
        if (errorMsg !== "") {
            setShowErrorBox(true);
        } else setShowErrorBox(false);
    }, [errorMsg]);

    const navigate: NavigateFunction = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //const data = new FormData(event.currentTarget);
        const userObj: { email: string, username: string, password: string } = {
            email: email,
            username: user,
            password: pass
        }
        const URL: string = "https://artin-media-backend.azurewebsites.net/auth/register";
        try {
            await axios.post(URL, userObj);
            navigate('/account/login')
        } catch (error) {
            if (isAxiosError(error) && (error as AxiosError).response?.status === 409) {
                setErrorMsg("Username already exists");
                console.log(errorMsg);
            } else {
                setErrorMsg("Cannot register account");
            }

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
                        Sign up
                    </Typography>

                    {showErrorBox && (
                        <Paper
                            elevation={3}
                            sx={errorMsgSx}
                        >
                            {errorMsg}
                        </Paper>
                    )}

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>

                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                {(email && !emailValid) && (
                                    <Paper
                                        elevation={3}
                                        sx={errorSx}
                                    >
                                        Email must be valid
                                    </Paper>
                                )}
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                {(user && !userValid) && (
                                    <Paper
                                        elevation={3}
                                        sx={errorSx}
                                    >
                                        Username must be 4-16 characters long and contain only letters and numbers
                                    </Paper>
                                )}
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setUser(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                {pass && !passValid && (
                                    <Paper
                                        elevation={3}
                                        sx={errorSx}
                                    >
                                        Password must be 8-24 characters long and contain at least one letter, one
                                        number,
                                        and one special character
                                    </Paper>
                                )}
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                {confirmPass && !confirmPassValid && (
                                    <Paper
                                        elevation={3}
                                        sx={errorSx}
                                    >
                                        Passwords do not match
                                    </Paper>
                                )}
                                <TextField
                                    required
                                    fullWidth
                                    name="confirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confirmPass"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPass(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            disabled={!(emailValid && userValid && passValid && confirmPassValid)}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/account/login" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 5}}/>
            </Container>
        </ThemeProvider>
    );
}