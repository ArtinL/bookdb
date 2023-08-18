import {useState, useEffect, Dispatch, SetStateAction} from 'react';


// Function to check token validity and fetch user data
export function useAuth(): [string | null, string | null, (username: string, jwt: string) => void, () => void] {
    const [username, setUsername]: [string | null, Dispatch<SetStateAction<string | null>>] = useState<string | null>(null);
    const [jwt, setJwt]: [string | null, Dispatch<SetStateAction<string | null>>] = useState<string | null>(null);

    function logIn(username: string, jwt: string): void {
        localStorage.setItem('username', username);
        localStorage.setItem('jwtToken', jwt);
        setUsername(username);
        setJwt(jwt);
        window.location.reload();
    }

    function logOut(): void {
        localStorage.removeItem('username');
        localStorage.removeItem('jwtToken');
        setUsername(null);
        setJwt(null);
        window.location.reload();
    }

    useEffect((): void => {
        const storedUsername: string | null = localStorage.getItem('username');
        const jwtToken: string | null = localStorage.getItem('jwtToken');

        if (jwtToken && storedUsername) {
            setUsername(storedUsername);
            setJwt(jwtToken);
        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('jwtToken');
            setUsername(null);
            setJwt(null);
        }
    }, []);


    return [username, jwt, logIn, logOut];
}
