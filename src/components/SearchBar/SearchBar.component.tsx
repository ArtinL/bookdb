import React, {
    useState,
    useRef,
    ChangeEvent,
    KeyboardEvent,
    Dispatch,
    SetStateAction,
    RefObject,
    ReactElement
} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import AdvSearch from './AdvSearch/AdvSearch.component';
import {Button, TextField} from "@mui/material";
import './SearchBar.style.css';

export default function SearchBar(): ReactElement {
    const [query, setQuery]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');
    const [advancedParams, setAdvancedParams]: [Record<string, string>, Dispatch<SetStateAction<Record<string, string>>>] = useState<Record<string, string>>({});

    const searchButtonRef: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);
    const navigate: NavigateFunction = useNavigate();

    function handleSearch(): void {
        let queryString: string = `/book/list?query=${query}`;

        for (const key in advancedParams) {
            if (Object.prototype.hasOwnProperty.call(advancedParams, key)) {
                queryString += `+${key}:${advancedParams[key]}`;
            }
        }

        console.log(queryString);

        navigate(queryString);
    }

    function handleAdvancedParamChange(paramKey: string, paramValue: string, reset: boolean): void {
        if (reset) setAdvancedParams({})
        else {
            setAdvancedParams(prevParams => ({
                ...prevParams,
                [paramKey]: paramValue,
            }))
            console.log(advancedParams)
        }
    }

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
        if (e.key === 'Enter') {
            handleSearch();
        }
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
        setQuery(e.target.value);
    }

    return (
        <div id="search-container">
            <div id="bar-container">
                <TextField
                    style={{width: "50%"}}
                    size="small"
                    placeholder="Search..."
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                />
                <Button variant="contained" ref={searchButtonRef} onClick={handleSearch}>
                    Search
                </Button>
            </div>
            <AdvSearch advParamChange={handleAdvancedParamChange} prevParams={advancedParams.category}/>

        </div>
    );
}

