import {useState, useEffect, Dispatch, SetStateAction} from 'react';


// Function to check token validity and fetch user data
export function useAuth(): [boolean, string | null, string | null] {
    const [isLoggedIn, setIsLoggedIn]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [username, setUsername]: [string | null, Dispatch<SetStateAction<string | null>>] = useState<string | null>(null);
    const [jwt, setJwt]: [string | null, Dispatch<SetStateAction<string | null>>] = useState<string | null>(null);

    useEffect(() => {
        const storedUsername: string | null = localStorage.getItem('username');
        const jwtToken: string | null = localStorage.getItem('jwtToken');

        if (jwtToken && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
            setJwt(jwtToken);
        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('jwtToken');
            setIsLoggedIn(false);
            setUsername(null);
            setJwt(null);
        }
    }, []);

    //console.log('useAuth: ', isLoggedIn, username, jwt);

    return [isLoggedIn, username, jwt];
}
