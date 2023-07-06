import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

import "../styles/components/details.sass"

const DetailsComponent = () => {
    const { id } = useParams();    
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('../api/data.json');
            const data = await response.json();
            setCountries(data);
        } catch (error) {
            console.error('Ocorreu um erro:', error);
        }
    };

    const [countries, setCountries] = useState<Country[]>([]);   
    if (countries.length === 0) {
        return null; // Retorna null se os dados ainda não foram carregados
    }
    
    // outros atributos do objeto country

    interface Country {
        flag: string;
        name: string;
        nativeName: string;
        population: number;
        region: string;
        subregion: string;
        capital: string;
        topLevelDomain: string;
        currencies: Array<Currency>;
        languages: Array<Language>;
        borders: string[];
        alpha3Code: string;
    }

    interface Currency {
        name: string;
    }

    interface Language {
        name: string;
    }

    interface Border {
        name: string;
                        
    }    

    const filteredCountry: Country[] = countries.filter((country: Country) => {
        if (country.name === id) {
            return country;
        }
    });

    if (!filteredCountry) {
        return <div>Country not found</div>;
    }

    const borderCountries = filteredCountry[0].borders && filteredCountry[0].borders.length > 0
        ? filteredCountry[0].borders.map((borderCode) => {
            
            const borderCountry : Border   = countries.find((c) => c.alpha3Code === borderCode) ?? {name:""};
            return borderCountry ? borderCountry.name : "";
        })
        : [];

    return (
        <div className="details-container">
            <div className="details-main">
                <div className="details-flag">
                    <Link className="link-back" to={`/`}><HiOutlineArrowNarrowLeft /> Back</Link>
                    <div className="flag">
                        <img src={filteredCountry[0].flag} alt="country-flag" />
                    </div>
                </div>
                <div className="details-text">
                    <h2 className="country-name">{filteredCountry[0].name}</h2>
                    <div className="country-stats">
                        <div className="country-data">
                            <span>
                                <h3>Native Name:</h3>
                                <p>{filteredCountry[0].nativeName}</p>
                            </span>
                            <span>
                                <h3>Population: </h3>
                                <p>{filteredCountry[0].population.toLocaleString()}</p>
                            </span>
                            <span>
                                <h3>Region:</h3>
                                <p> {filteredCountry[0].region}</p>
                            </span>
                            <span>
                                <h3>Sub Region:</h3>
                                <p> {filteredCountry[0].subregion}</p>
                            </span>
                            <span>
                                <h3>Capital:</h3>
                                <p> {filteredCountry[0].capital}</p>
                            </span>
                        </div>
                        <div className="country-sub-data">
                            <span>
                                <h3>Top Level Domain: </h3>
                                <p>{filteredCountry[0].topLevelDomain}</p>
                            </span>
                            <span>
                                <h3>Currencies: </h3>
                                <p>
                                    {filteredCountry[0].currencies && filteredCountry[0].currencies.length > 0 ? (
                                        filteredCountry[0].currencies.map((currency, index) => (
                                            <span key={currency.name}>
                                                {currency.name}
                                                {index < filteredCountry[0].currencies.length - 1 && ", "}
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
                                    {filteredCountry[0].languages && filteredCountry[0].languages.length > 0 ? (
                                        filteredCountry[0].languages.map((language, index) => (
                                            <span key={language.name}>
                                                {language.name}
                                                {index < filteredCountry[0].languages.length - 1 && ","}
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
