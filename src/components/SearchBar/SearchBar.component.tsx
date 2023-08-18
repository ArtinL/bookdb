import React, {useState, useRef, ChangeEvent, KeyboardEvent} from 'react';
import {useNavigate} from 'react-router-dom';
import AdvSearch from './AdvSearch/AdvSearch.component';
import {Button, TextField} from "@mui/material";

export default function SearchBar(): React.ReactElement {
    const [query, setQuery] = useState<string>('');
    const [advancedParams, setAdvancedParams] = useState<Record<string, string>>({});

    const searchButtonRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();

    function handleSearch(): void {
        let queryString: string = `/book/list?query=${query}`;

        Object.entries(advancedParams).forEach(([key, value]) => {
            queryString += `&${key}=${value}`;
        });

        navigate(queryString);
    }

    function handleAdvancedParamChange(paramKey: string, paramValue: string, reset: boolean): void {
        if (reset) setAdvancedParams({})
        else {
            setAdvancedParams(prevParams => ({
                ...prevParams,
                [paramKey]: paramValue,
            }));
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
        <div>
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
            {/*<AdvSearch advParamChange={handleAdvancedParamChange} prevParams={advancedParams.category}/>*/}

        </div>
    );
}

