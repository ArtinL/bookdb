import React, {ChangeEvent, Dispatch, ReactElement, SetStateAction, useState} from 'react';
import {Button, TextField, Typography} from "@mui/material";
import {styled} from '@mui/material/styles';
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

    <AdvSearchRoot hidden={!show}>
      <InputGroup onKeyDown={handleKeyDown}>
        <InputField>
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
        </InputField>
        <InputField>
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
        </InputField>
        <InputField>
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
        </InputField>
        <InputField>
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
        </InputField>


      </InputGroup>
      <BtnGroup>
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
      </BtnGroup>
    </AdvSearchRoot>


  );
}

const AdvSearchRoot = styled('div')(() => ({
  border: '1px solid #808080',
  borderRadius: 5,
  backgroundColor: '#f6f6f6',
  padding: 20,
  marginTop: 20,
  width: '90%',
}));

const InputGroup = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 10,
  flexWrap: 'wrap',
  gap: 8,
}));

const InputField = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  '& .input-label': { margin: 10 },
}));

const BtnGroup = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
}));

