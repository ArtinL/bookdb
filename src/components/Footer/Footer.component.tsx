import React, {ReactElement} from 'react';
import {styled} from '@mui/material/styles';

const FooterRoot = styled('footer')(() => ({
  backgroundColor: '#282c34',
  minHeight: 100,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 14,
  color: 'white',
  '& a': {
    color: '#61dafb',
  },
}));

export default function Footer(): ReactElement {
  return (
    <FooterRoot>
      <p>Built By: Artin Lahni</p>
      <a href="https://github.com/ArtinL/bookdb">GitHub</a>
    </FooterRoot>
  );
}