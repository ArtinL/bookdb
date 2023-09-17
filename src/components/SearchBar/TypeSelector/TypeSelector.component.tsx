import React, {ReactElement} from 'react';
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, SelectChangeEvent} from "@mui/material";

interface TypeSelectorProps {
    setType: (type: string) => void;
}

export default function TypeSelector({setType}: TypeSelectorProps): ReactElement {
    const [reqType, setReqType] = React.useState<string>('books');

    function handleChange(event: SelectChangeEvent<{ value: unknown }>) {
        setReqType(event.target.value as string);
        setType(event.target.value as string);
    }

    return (
        <div id="type-selector">
            <FormControl>
                <RadioGroup
                    row
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={reqType}
                    onChange={handleChange}
                >
                    <FormControlLabel value="books" control={<Radio/>} label="Books"/>
                    <FormControlLabel value="movies" control={<Radio/>} label="Movies"/>
                </RadioGroup>
            </FormControl>
        </div>
    )
}