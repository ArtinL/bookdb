import React from 'react';
import {Button} from "@mui/material";

interface confirmRemoveProps {
    handleRemove: () => Promise<void>;
    handleCancel: () => void;
}

export default function ConfirmRemove({handleRemove, handleCancel}: confirmRemoveProps): React.ReactElement {
    return (
        <div>
            <p>Are you sure?</p>
            <Button size="small" color="secondary" onClick={handleRemove}>Yes</Button>
            <Button size="small" onClick={handleCancel}>No</Button>
        </div>
    );
}