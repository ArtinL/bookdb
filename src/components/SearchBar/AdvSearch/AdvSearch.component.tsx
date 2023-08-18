import React, {ChangeEvent, Dispatch, ReactElement, SetStateAction, useState} from 'react';
import {Button, TextField, Typography} from "@mui/material";
import {ExpandLess, ExpandMore} from "@mui/icons-material";

interface advSearchProps {
    advParamChange: (paramkey: string, paramvalue: string, reset: boolean) => void;
    prevParams: string;
}

export default function AdvSearch({advParamChange}: advSearchProps): ReactElement {

    const [showAdvancedSearch, setShowAdvancedSearch]: [boolean, Dispatch<SetStateAction<boolean>>] = useState<boolean>(false);

    function handleToggleAdvancedSearch(): void {
        setShowAdvancedSearch((prevValue: boolean) => !prevValue);
    }

    function handleClearFilters(): void {
        advParamChange('', '', true);
    }

    return (
        <div>
            <Button startIcon={showAdvancedSearch ? <ExpandLess/> : <ExpandMore/>} variant={"outlined"} size={"medium"}
                    onClick={handleToggleAdvancedSearch}>
                {showAdvancedSearch ? 'Hide' : 'Show'} Advanced Search
            </Button>
            {showAdvancedSearch && (
                <div className={"adv-search"}>
                    <div className={"input-group"}>
                        <Typography>Title</Typography>
                        <TextField
                            size="small"
                            type="text"
                            placeholder={'Enter a title...'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => advParamChange('intitle', e.target.value, false)}
                        />
                        <Typography>Author</Typography>
                        <TextField
                            size="small"
                            type="text"
                            placeholder={'Enter an author...'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => advParamChange('inauthor', e.target.value, false)}
                        />
                        <Typography>Subject</Typography>
                        <TextField
                            size="small"
                            type="text"
                            placeholder={'Enter a subject...'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => advParamChange('subject', e.target.value, false)}
                        />
                        <Typography>Publisher</Typography>
                        <TextField
                            size="small"
                            type="text"
                            placeholder={'Enter a publisher...'}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => advParamChange('inpublisher', e.target.value, false)}
                        />


                    </div>
                    <Button variant="outlined" size="small" color="error" onClick={handleClearFilters}>Clear
                        Filters</Button>
                </div>
            )}
        </div>
    );
}

