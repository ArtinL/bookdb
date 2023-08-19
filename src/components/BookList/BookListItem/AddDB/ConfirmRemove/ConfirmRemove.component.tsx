import React from 'react';
import {Button} from "@mui/material";
import './ConfirmRemove.style.css'

interface confirmRemoveProps {
    handleRemove: () => Promise<void>;
    handleCancel: () => void;
}

export default function ConfirmRemove({handleRemove, handleCancel}: confirmRemoveProps): React.ReactElement {
    return (
        <div className={"confirm-box"}>
            <p>Are you sure?</p>
            <div className={"confirm-btn-holder"}>
                <Button variant={"contained"} size="small" color="secondary" onClick={handleRemove}>Yes</Button>
                <Button variant={"contained"} size="small" onClick={handleCancel}>No</Button>
            </div>
        </div>
    );
}