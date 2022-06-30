import React, {useEffect, useState} from 'react';
import FullInfo from "../../Components/FullCountry/FullInfo";
import {COUNTRY_URL, BORDER_URL} from "../../config";
import Country from "../../Components/Country/Country";
import axios from "axios";
import './Countries.css';



const Countries = () => {
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const countriesResponse = await axios.get(COUNTRY_URL);
            const promises = countriesResponse.data.map(async country => {
                const countryInfo = BORDER_URL + country.alpha3Code;
                const countryResponse = await axios.get(countryInfo);
                console.log(countryResponse)
                return {...country,
                    capital : countryResponse.data.capital,
                    borders: countryResponse.data.borders,
                    img: countryResponse.data.flag,
                    population: countryResponse.data.population
                };
            });
            const newCountry = await Promise.all(promises);
            setCountries(newCountry);
        };
        fetchData().catch(e => console.error(e));
    }, []);


    return (
        <>
            <div className="restCountries">
                <div className="countries">
                    {countries.map(country => (
                        <Country
                            name={country.name}
                            key={country.name}
                            clicked={() => setSelectedCountry(country)}/>
                    ))}
                </div>
                <section className="countriesInfo">
                    <FullInfo
                        country={selectedCountry}
                    />
                </section>
            </div>
        </>
    );
};
export default Countries;