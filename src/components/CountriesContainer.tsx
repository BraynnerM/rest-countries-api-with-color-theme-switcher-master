import { Link } from 'react-router-dom';

import "../styles/components/countriescontainer.sass"

const CountriesContainer = ( {filteredCountries} ) => {    
    return (
        
        <section className="countries">
            {filteredCountries.map((country, index) => (
                <Link to={`/details/${index}`} className='link' key={index}>
                    <div className="country">                        
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
                </Link>
            ))}
        </section>
        
    );
};

export default CountriesContainer;
