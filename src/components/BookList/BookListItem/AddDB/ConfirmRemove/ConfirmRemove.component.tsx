import React from 'react';
import {Button} from "@mui/material";
import './ConfirmRemove.style.css'

interface confirmRemoveProps {
    handleRemove: (e: any) => Promise<void>;
    handleCancel: (e: any) => void;
}

export default function ConfirmRemove({handleRemove, handleCancel}: confirmRemoveProps): React.ReactElement {
    return (
        <div className={"confirm-box"}>
            <p>Are you sure?</p>
            <div className={"confirm-btn-holder"}>
                <Button variant={"outlined"} size="small" color="error" onClick={handleRemove}>Yes</Button>
                <Button variant={"outlined"} size="small" onClick={handleCancel}>No</Button>
            </div>
        </div>
    );
}