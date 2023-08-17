import React from 'react';

type adaptWidgetType = {
    title: string;
}

export default function AdaptWidget({title}: adaptWidgetType): React.ReactElement {
    return (
        <div>
            <h1>{title}</h1>
        </div>
    );
}