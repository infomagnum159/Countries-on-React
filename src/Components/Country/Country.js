import React from 'react';
import './Country.css';

const Country = props => {
    return (
        <>
            <li className="country" onClick={props.clicked}>

                <p className="flagName"> <img src={props.img} className="flag" alt="flag"/>{props.name}</p>
            </li>
        </>
    );
};

export default Country