import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/Hi";

import "../styles/components/details.sass"

const DetailsComponent = () => {
    const { id } = useParams();    
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

    const [countries, setCountries] = useState([]);

    if (countries.length === 0) {
        return null; // Retorna null se os dados ainda não foram carregados
    }

    const country = countries[id];

    if (!country) {
        return <div>Country not found</div>;
    }

    const borderCountries = country.borders && country.borders.length > 0
        ? country.borders.map((borderCode) => {
            const borderCountry = countries.find((c) => c.alpha3Code === borderCode);
            return borderCountry ? borderCountry.name : "";
        })
        : [];

    return (
        <div className="details-container">
            <div className="details-main">
                <div className="details-flag">
                    <Link className="link-back" to={`/`}><HiOutlineArrowNarrowLeft /> Back</Link>
                    <div className="flag">
                        <img src={country.flag} alt="country-flag" />
                    </div>
                </div>
                <div className="details-text">
                    <h2 className="country-name">{country.name}</h2>
                    <div className="country-stats">
                        <div className="country-data">
                            <span>
                                <h3>Native Name:</h3>
                                <p>{country.nativeName}</p>
                            </span>
                            <span>
                                <h3>Population: </h3>
                                <p>{country.population.toLocaleString()}</p>
                            </span>
                            <span>
                                <h3>Region:</h3>
                                <p> {country.region}</p>
                            </span>
                            <span>
                                <h3>Sub Region:</h3>
                                <p> {country.subregion}</p>
                            </span>
                            <span>
                                <h3>Capital:</h3>
                                <p> {country.capital}</p>
                            </span>
                        </div>
                        <div className="country-sub-data">
                            <span>
                                <h3>Top Level Domain: </h3>
                                <p>{country.topLevelDomain}</p>
                            </span>
                            <span>
                                <h3>Currencies: </h3>
                                <p>
                                    {country.currencies && country.currencies.length > 0 ? (
                                        country.currencies.map((currency, index) => (
                                            <span key={currency.name}>
                                                {currency.name}
                                                {index < country.currencies.length - 1 && ", "}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="unknown">No currencies available</span>
                                    )}
                                </p>
                            </span>
                            <span>
                                <h3>Languages: </h3>
                                <p>
                                    {country.languages && country.languages.length > 0 ? (
                                        country.languages.map((language, index) => (
                                            <span key={language.name}>
                                                {language.name}
                                                {index < country.languages.length - 1 && ","}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="unknown">No languages available</span>
                                    )}
                                </p>
                            </span>
                        </div>

                    </div>
                    <div className="country-border">
                        <h3>Border Countries:</h3>
                        {borderCountries.length > 0 ? (
                            <span>
                                {borderCountries.map((borderCountry, index) => (
                                    <span key={index}>
                                        {borderCountry}
                                    </span>
                                ))}
                            </span>
                        ) : (
                            <span className="unknown">No border countries</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsComponent;
