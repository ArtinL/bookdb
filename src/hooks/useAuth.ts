import {useState, useEffect, Dispatch, SetStateAction} from 'react';


// Function to check token validity and fetch user data
export function useAuth(): [string | null, string | null, (username: string, jwt: string) => void, () => void] {
    //const [isLoggedIn, setIsLoggedIn]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [username, setUsername]: [string | null, Dispatch<SetStateAction<string | null>>] = useState<string | null>(null);
    const [jwt, setJwt]: [string | null, Dispatch<SetStateAction<string | null>>] = useState<string | null>(null);

    function logIn(username: string, jwt: string) {
        localStorage.setItem('username', username);
        localStorage.setItem('jwtToken', jwt);
        //setIsLoggedIn(true);
        setUsername(username);
        setJwt(jwt);
        window.location.reload();
    }

    function logOut() {
        localStorage.removeItem('username');
        localStorage.removeItem('jwtToken');
        //setIsLoggedIn(false);
        setUsername(null);
        setJwt(null);
        window.location.reload();
    }

    useEffect(() => {
        const storedUsername: string | null = localStorage.getItem('username');
        const jwtToken: string | null = localStorage.getItem('jwtToken');

        if (jwtToken && storedUsername) {
            //setIsLoggedIn(true);
            setUsername(storedUsername);
            setJwt(jwtToken);
        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('jwtToken');
            //setIsLoggedIn(false);
            setUsername(null);
            setJwt(null);
        }
    }, []);

    //console.log('useAuth: ', isLoggedIn, username, jwt);

    return [username, jwt, logIn, logOut];
}
