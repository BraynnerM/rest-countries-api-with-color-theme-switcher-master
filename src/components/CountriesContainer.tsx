import { useEffect, useState } from 'react';
import FiltersContainer from './FiltersContainer';

import "../styles/components/countriescontainer.sass"

const CountriesContainer = () => {

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        try {
            const response = await fetch('../../data.json');
            const data = await response.json();
            setCountries(data);
        } catch (error) {
            console.error('Ocorreu um erro:', error);
        }
    };
    const [countries, setCountries] = useState<{ flag: string, name: string, population: number, region: string, capital: string }[]>([]);
    return (
        <>
            <FiltersContainer countries={countries} />
            <section className="countries">
                {countries.map((country, index) => (
                    <div className="country" key={index}>
                        <span className="country-flag">
                            <img src={country.flag} alt="country-flag" />
                        </span>
                        <span className="country-text">
                            <h2>{country.name}</h2>
                            <span>
                                <h3>Population:</h3>
                                <p>{country.population.toLocaleString()}</p>
                            </span>
                            <span>
                                <h3>Region:</h3>
                                <p>{country.region}</p>
                            </span>
                            <span>
                                <h3>Capital:</h3>
                                <p>{country.capital}</p>
                            </span>
                        </span>
                    </div>
                ))}
            </section>
        </>
    );
};

export default CountriesContainer;

