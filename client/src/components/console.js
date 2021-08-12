import React from 'react'
import './console.css';
import Left from './left';
import Right from './right';

function Console() {
    return (
        <div className="console">
            <Left/>
            <Right/>
        </div>
    )
}

export default Console;