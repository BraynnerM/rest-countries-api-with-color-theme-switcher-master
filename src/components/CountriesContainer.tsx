import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from "../contexts/ThemeContext";

import "../styles/components/countriescontainer.sass"

interface Country {
    flag: string;
    name: string;
    population: number;
    region: string;
    capital: string;
  }
  
  interface CountriesContainerProps {
    filteredCountries: Country[];
  }
  
  const CountriesContainer = ({ filteredCountries }: CountriesContainerProps) => {
    const { theme } = useContext(ThemeContext);
    const themeClassName = `${theme === 'light' ? 'light-theme' : 'dark-theme'}`;
    return (
      <section className={`countries  ${themeClassName}`}>
        {filteredCountries.map((country) => (
          <Link to={`/details/${country.name}`} className="link" key={country.name}>
            <div className={`country  ${themeClassName}`}>
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
