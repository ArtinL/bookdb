import React, {ReactElement, useEffect} from 'react';
import {Outlet, useLocation} from "react-router-dom";
import {Typography} from "@mui/material";
import SearchBar from "../components/SearchBar/SearchBar.component";
import {styled} from '@mui/material/styles';

export default function MovieRoot(): ReactElement {
  const [query, setQuery] = React.useState<string>('');

  const location = useLocation();

  useEffect(() => {
    setQuery(new URLSearchParams(location.search).get('query') || '');
  }, [location.search]);

  return (
    <Root>
      <SearchContainer>
        <Typography variant={"h3"}>Search for Movies</Typography>
        <SearchBar type="movies" prevQuery={query}/>
      </SearchContainer>
      <Outlet/>
    </Root>
  );
}

const Root = styled('div')(() => ({
  width: '80%',
}));

const SearchContainer = styled('div')(() => ({
  backgroundColor: '#ffffff',
  paddingTop: 10,
  paddingBottom: 20,
  marginTop: 20,
  width: '100%',
}));