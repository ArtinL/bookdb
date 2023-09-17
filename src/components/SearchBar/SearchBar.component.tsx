import React, {
    useState,
    useRef,
    ChangeEvent,
    KeyboardEvent,
    Dispatch,
    SetStateAction,
    RefObject,
    ReactElement, useEffect
} from 'react';
import {NavigateFunction, useNavigate} from 'react-router-dom';
import AdvSearch from './AdvSearch/AdvSearch.component';
import {Button, TextField, InputAdornment, IconButton} from "@mui/material";
import './SearchBar.style.css';
import SearchIcon from '@mui/icons-material/Search';
import {ExpandLess, ExpandMore} from "@mui/icons-material";
import ClearIcon from "@mui/icons-material/Clear";
import TypeSelector from "./TypeSelector/TypeSelector.component";

interface SearchBarProps {
    type: string;
    prevQuery: string;
}

export default function SearchBar({type, prevQuery}: SearchBarProps): ReactElement {
    const [query, setQuery]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');
    const [advancedParams, setAdvancedParams]: [Record<string, string>, Dispatch<SetStateAction<Record<string, string>>>] = useState<Record<string, string>>({});
    const [showAdvancedSearch, setShowAdvancedSearch]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);
    const [reqType, setReqType]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');
    const [showTypeSelector, setShowTypeSelector]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

    const searchButtonRef: RefObject<HTMLButtonElement> = useRef<HTMLButtonElement>(null);
    const navigate: NavigateFunction = useNavigate();

    useEffect(() => {
        searchButtonRef.current?.focus();
    }, []);

    useEffect(() => {
        setReqType(type || 'books');
        setShowTypeSelector(type === '')
    }, [type]);

    useEffect(() => {
        setQuery(prevQuery);
    }, [prevQuery]);

    function handleSearch(): void {
        let queryString: string = `/${reqType}/search?query=${query}`;
        console.log(queryString);
        navigate(queryString);
    }

    function handleAdvancedSearch(): void {
        let queryString: string = `/${reqType}/search?query=`;
        for (const key in advancedParams) {
            if (Object.prototype.hasOwnProperty.call(advancedParams, key)) {
                queryString += `+${key}:${advancedParams[key]}`;
            }
        }
        navigate(queryString);

    }

    function handleAdvancedParamChange(paramKey: string, paramValue: string, reset: boolean): void {
        if (reset) {
            setAdvancedParams({});
        } else {
            setAdvancedParams((prevParams: Record<string, string>) => {
                const updatedParams = {...prevParams};

                if (paramValue.trim() === '') {
                    delete updatedParams[paramKey];
                } else {
                    updatedParams[paramKey] = paramValue;
                }
                return updatedParams;
            });
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

    function clearInput(): void {
        setQuery('');
    }

    return (
        <div id="search-container">

            <div id="bar-container">
                <TextField
                    style={{width: "50%"}}
                    size="small"
                    placeholder={`Search ${reqType}...`}
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    fullWidth
                    InputProps={
                        {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <IconButton edge="start" color="error" onClick={clearInput} disabled={!query}>
                                        <ClearIcon/>
                                    </IconButton>
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton edge="end" color="info" onClick={handleSearch}
                                                disabled={!query}>
                                        <SearchIcon/>
                                    </IconButton>
                                </InputAdornment>
                            )
                        }
                    }
                />
                {(!showTypeSelector && type === 'books') &&
                    <Button startIcon={showAdvancedSearch ? <ExpandLess/> : <ExpandMore/>}
                            variant={"outlined"}
                            size={"large"}
                            onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}>
                        Advanced
                    </Button>}
            </div>

            {showTypeSelector && <TypeSelector setType={setReqType}/>}

            <AdvSearch advParamChange={handleAdvancedParamChange}
                       show={showAdvancedSearch}
                       search={handleAdvancedSearch}/>

        </div>
    );
}

