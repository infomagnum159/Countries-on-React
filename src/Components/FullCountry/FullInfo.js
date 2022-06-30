import React, {useEffect, useState} from 'react';
import {BORDER_URL} from "../../config";
import axios from "axios";
import './FullInfo.css'


const FullInfo = props => {
    const [borders, setBorders] = useState(null);

    useEffect(() => {
        if(props.country !== null) {
            const getCountryBorders = async () => {
                const promises = props.country.borders.map(async border => {
                    const borderResponse = await axios.get(BORDER_URL + border);
                    if (borderResponse.data !== null) {
                        return borderResponse.data.name;
                    }
                });
                const newBorders = await Promise.all(promises);
                setBorders(newBorders);
            }
            getCountryBorders().catch(console.error);
        }
    }, [props.country]);

    return props.country && (
        <>
            <div className="full-info">
                <div className="flag-img">
                    <img src={props.country.img} alt="flag"/>
                </div>
                <h3>{props.country.name}</h3>
                <p>
                    <span>Capital: </span>
                    {props.country.capital}
                </p>
                <p>
                    <span>Population: </span>
                    {props.country.population}
                </p>
                <p>

                    {borders && (<ul>{borders.length > 0 ? 'Borders with:' : null}{borders.map(border => {
                        let i = 0;
                        return (<li key={i++}><p>{border}</p></li>
                        )})}</ul>)}
                </p>
            </div>
        </>
    );
};

export default FullInfo;