// noinspection HtmlUnknownTarget

import * as React from 'react';
import {ChangeEvent, ReactElement, useEffect, useState} from 'react';
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
import axios from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import emailValidator from "email-validator";

// New imports for consistent UX with SignUp
import {Alert, Card, CardContent, CircularProgress, IconButton, InputAdornment, Snackbar} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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

interface resType {
  user: { userId: number, username: string },
  jwt: string
}

export default function SignIn(): ReactElement {
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [showErrorBox, setShowErrorBox] = useState<boolean>(false);

  const [info, setInfo] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [username, jwt, logIn, logOut]: [string | null, string | null, (username: string, token: string) => void, () => void] = useAuth();

  useEffect(() => {
    setShowErrorBox(errorMsg !== "");
  }, [errorMsg]);

  const navigate: NavigateFunction = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setSubmitted(true);

    if (!info.trim() || !pass) return;

    const emailToSend = emailValidator.validate(info) ? info : '';
    const usernameToSend = emailToSend ? '' : info;

    const userObj = {email: emailToSend, username: usernameToSend, password: pass};

    const URL: string = `${process.env.REACT_APP_API_URL}/auth/login`;
    try {
      setLoading(true);
      const res = (await axios.post<resType>(URL, userObj)).data;
      logIn(res.user.username, res.jwt);
      setErrorMsg("");
      navigate('/');
    } catch (err: any) {
      setErrorMsg("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  const canSubmit = info.trim().length > 0 && pass.length > 0;

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

          {/* Consistent Card wrapper */}
          <Card elevation={6} sx={{width: '100%', mt: 3, borderRadius: 2}}>
            <CardContent sx={{p: {xs: 2.5, sm: 3}}}>
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username or Email"
                  name="username"
                  autoComplete="username"
                  autoFocus
                  value={info}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setInfo(event.target.value)}
                  error={submitted && !info.trim()}
                  helperText={submitted && !info.trim() ? "This field is required" : " "}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon fontSize="small"/>
                      </InputAdornment>
                    )
                  }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  value={pass}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setPass(event.target.value)}
                  error={submitted && !pass}
                  helperText={submitted && !pass ? "Password is required" : " "}
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

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{mt: 3, mb: 1}}
                  disabled={!canSubmit || loading}
                >
                  {loading ? (
                    <>
                      Signing in…&nbsp;<CircularProgress size={18}/>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="/account/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Copyright sx={{mt: 5}}/>

        {/* Subtle, non-intrusive error popup */}
        <Snackbar
          open={showErrorBox}
          autoHideDuration={6000}
          onClose={(_, reason) => {
            if (reason === 'clickaway') return;
            setShowErrorBox(false);
            setErrorMsg("");
          }}
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
        >
          <Alert
            onClose={() => {
              setShowErrorBox(false);
              setErrorMsg("");
            }}
            severity="error"
            variant="filled"
            sx={{width: '100%'}}
          >
            {errorMsg}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
