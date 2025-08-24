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
import axios, {AxiosError, isAxiosError} from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {ChangeEvent, Dispatch, ReactElement, SetStateAction, useEffect, useState} from "react";
import emailValidator from "email-validator";

// NEW imports for nicer UX
import {
    Alert,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    Snackbar
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const USER_REGEX: RegExp = /^[a-zA-Z0-9]{4,16}$/;
// NOTE: removed the accidental double ^ at the start
const PASS_REGEX: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,24}$/;

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

const defaultTheme = createTheme();

export default function SignUp(): ReactElement {
    const [errorMsg, setErrorMsg] = useState<string>("");
    const [showErrorBox, setShowErrorBox] = useState<boolean>(false);

    const [email, setEmail] = useState<string>("");
    const [user, setUser] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");

    const [emailValid, setEmailValid] = useState<boolean>(false);
    const [userValid, setUserValid] = useState<boolean>(false);
    const [passValid, setPassValid] = useState<boolean>(false);
    const [confirmPassValid, setConfirmPassValid] = useState<boolean>(false);

    // password visibility toggles
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

    useEffect((): void => {
        setEmailValid(email ? emailValidator.validate(email) : false);
    }, [email]);

    useEffect((): void => {
        setUserValid(user ? USER_REGEX.test(user) : false);
    }, [user]);

    useEffect((): void => {
        setPassValid(pass ? PASS_REGEX.test(pass) : false);
        setConfirmPassValid(confirmPass ? pass === confirmPass : false);
    }, [pass, confirmPass]);

    useEffect((): void => {
        setShowErrorBox(errorMsg !== "");
    }, [errorMsg]);

    const navigate: NavigateFunction = useNavigate();
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const userObj = { email: email, username: user, password: pass };
        const URL = `${process.env.REACT_APP_API_URL}/auth/register`;
        try {
            await axios.post(URL, userObj);
            navigate('/account/login');
        } catch (error) {
            if (isAxiosError(error) && (error as AxiosError).response?.status === 409) {
                setErrorMsg("That username is taken. Try another one.");
            } else {
                setErrorMsg("Couldn’t register the account. Try again in a bit.");
            }
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        mt: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>

                    {/* Card wraps the form for a cleaner look */}
                    <Card elevation={6} sx={{ width: '100%', mt: 3, borderRadius: 2 }}>
                        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                            <Box component="form" noValidate onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email"
                                            name="email"
                                            value={email}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                            error={!!email && !emailValid}
                                            helperText={!!email && !emailValid ? "Enter a valid email address" : " "}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <EmailIcon fontSize="small"/>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            name="username"
                                            value={user}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setUser(e.target.value)}
                                            error={!!user && !userValid}
                                            helperText={
                                                !!user && !userValid
                                                    ? "4–16 chars, letters & numbers only"
                                                    : " "
                                            }
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <PersonIcon fontSize="small"/>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="password"
                                            label="Password"
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            autoComplete="new-password"
                                            value={pass}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setPass(e.target.value)}
                                            error={!!pass && !passValid}
                                            helperText={
                                                !!pass && !passValid
                                                    ? "8–24 chars, ≥1 letter, ≥1 number, ≥1 special"
                                                    : " "
                                            }
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockOutlinedIcon fontSize="small"/>
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => setShowPassword(v => !v)}
                                                            edge="end"
                                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                                        >
                                                            {showPassword ? <VisibilityOff/> : <Visibility/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            name="confirmPassword"
                                            label="Confirm Password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPass"
                                            value={confirmPass}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPass(e.target.value)}
                                            error={!!confirmPass && !confirmPassValid}
                                            helperText={
                                                !!confirmPass && !confirmPassValid ? "Passwords must match" : " "
                                            }
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <LockOutlinedIcon fontSize="small"/>
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() => setShowConfirmPassword(v => !v)}
                                                            edge="end"
                                                            aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                                                        >
                                                            {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 1 }}
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
                        </CardContent>
                    </Card>
                </Box>

                <Copyright sx={{ mt: 5 }}/>

                {/* Subtle, non-intrusive error popup */}
                <Snackbar
                    open={showErrorBox}
                    autoHideDuration={6000}
                    onClose={(_, reason) => {
                        if (reason === 'clickaway') return;
                        setShowErrorBox(false);
                        setErrorMsg("");
                    }}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert
                        onClose={() => { setShowErrorBox(false); setErrorMsg(""); }}
                        severity="error"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {errorMsg}
                    </Alert>
                </Snackbar>
            </Container>
        </ThemeProvider>
    );
}
