import React from 'react';
import {Button} from "@mui/material";
import {styled} from '@mui/material/styles'

interface confirmRemoveProps {
  handleRemove: (e: any) => Promise<void>;
  handleCancel: (e: any) => void;
}

export default function ConfirmRemove({handleRemove, handleCancel}: confirmRemoveProps): React.ReactElement {
  return (
    <ConfirmBox>
      <p>Are you sure?</p>
      <BtnHolder>
        <Button variant={"outlined"} size="small" color="error" onClick={handleRemove}>Yes</Button>
        <Button variant={"outlined"} size="small" onClick={handleCancel}>No</Button>
      </BtnHolder>
    </ConfirmBox>
  );
}

const ConfirmBox = styled('div')(() => ({
  display: 'flex',
  color: 'black',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  border: '#5788ad thin solid',
  backgroundColor: '#ffffff',
  minWidth: 200,
  paddingTop: 10,
  paddingBottom: 10,
  borderRadius: 14,
}));

const BtnHolder = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  width: '100%',
}));