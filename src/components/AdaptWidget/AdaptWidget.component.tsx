import React, {ReactElement} from 'react';

interface adaptWidgetType {
    title: string;
}

export default function AdaptWidget({title}: adaptWidgetType): ReactElement {

    // TODO

    return (
        <div>
            <h1>{title}</h1>
        </div>
    );
}