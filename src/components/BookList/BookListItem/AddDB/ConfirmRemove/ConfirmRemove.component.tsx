import React from 'react';

type confirmRemoveProps = {
    handleRemove: () => Promise<void>;
    handleCancel: () => void;
}

export default function ConfirmRemove({handleRemove, handleCancel}: confirmRemoveProps): React.ReactElement {
    return (
        <div>
            <p>Are you sure you want to remove this book from your collection?</p>
            <button onClick={handleRemove}>Yes</button>
            <button onClick={handleCancel}>No</button>
        </div>
    );
}