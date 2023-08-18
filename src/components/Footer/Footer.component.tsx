import React, {ReactElement} from 'react';
import './Footer.style.css';

export default function Footer(): ReactElement {
    return (
        <footer>
            <p>Built By: Artin Lahni</p>
            <a href="https://github.com/ArtinL/bookdb">GitHub</a>
        </footer>
    );
}