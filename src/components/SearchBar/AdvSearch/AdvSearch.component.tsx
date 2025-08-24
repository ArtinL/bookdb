import React, {ChangeEvent, Dispatch, ReactElement, SetStateAction, useState} from 'react';
import {Button, TextField, Typography} from "@mui/material";
import './AdvSearch.style.css';
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

interface advSearchProps {
  advParamChange: (paramkey: string, paramvalue: string, reset: boolean) => void;
  show: boolean;
  search: () => void;
}

export default function AdvSearch({advParamChange, show, search}: advSearchProps): ReactElement {
  const [title, setTitle]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');
  const [author, setAuthor]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');
  const [subject, setSubject]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');
  const [publisher, setPublisher]: [string, Dispatch<SetStateAction<string>>] = useState<string>('');

  function handleClearFilters(): void {
    advParamChange('', '', true);
    setTitle('');
    setAuthor('');
    setSubject('');
    setPublisher('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>): void {
    if (e.key === 'Enter') {
      search();
    }
  }

  return (

    <div id={"adv-search"} hidden={!show}>
      <div id={"input-group"} onKeyDown={handleKeyDown}>
        <div className="input-field">
          <Typography className="input-label">Title: </Typography>
          <TextField
            size="small"
            type="text"
            placeholder={'Enter a title...'}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
              advParamChange('intitle', e.target.value, false);
            }}
            value={title}
          />
        </div>
        <div className="input-field">
          <Typography className="input-label">Author: </Typography>
          <TextField
            size="small"
            type="text"
            placeholder={'Enter an author...'}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setAuthor(e.target.value);
              advParamChange('inauthor', e.target.value, false);
            }}
            value={author}
          />
        </div>
        <div className="input-field">
          <Typography className="input-label">Subject: </Typography>
          <TextField
            size="small"
            type="text"
            placeholder={'Enter a subject...'}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setSubject(e.target.value);
              advParamChange('subject', e.target.value, false);
            }}
            value={subject}
          />
        </div>
        <div className="input-field">
          <Typography className="input-label">Publisher: </Typography>
          <TextField
            size="small"
            type="text"
            placeholder={'Enter a publisher...'}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setPublisher(e.target.value);
              advParamChange('inpublisher', e.target.value, false);
            }}
            value={publisher}
          />
        </div>


      </div>
      <div id="btn-group">
        <Button startIcon={<SearchIcon/>}
                size="small"
                variant="outlined"
                onClick={search}
                disabled={!title && !author && !subject && !publisher}>
          Search
        </Button>
        <Button startIcon={<ClearIcon/>}
                size="small"
                variant="outlined"
                color="error"
                onClick={handleClearFilters}>Clear
          Filters
        </Button>
      </div>
    </div>


  );
}

