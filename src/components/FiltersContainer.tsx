import { AiOutlineSearch } from 'react-icons/ai';
import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import React, { useContext } from 'react';
import { ThemeContext } from "../contexts/ThemeContext";
import { getCountries } from '../services/requestApi';

import "../styles/components/filterscontainer.sass";

interface FiltersContainerProps {
  setFilteredCountries: Dispatch<SetStateAction<{ flag: string; name: string; population: number; region: string; capital: string }[]>>;
}
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

 
   
const FiltersContainer = ({ setFilteredCountries }: FiltersContainerProps) => {
  //theme context
  const { theme } = useContext(ThemeContext);
  const themeClassName = `${theme === 'light' ? 'light-theme' : 'dark-theme'}`;
  //busca de países na api
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function fetchData(): Promise<void> {
    try {      
      const data : Country[] = await getCountries();
      setCountries(data);
      setFilteredCountries(data);
    } catch (error) {
      console.error('Ocorreu um erro:', error);
      setFilteredCountries([]);
    }
  }
  const [countries, setCountries] = useState<{ flag: string, name: string, population: number, region: string, capital: string }[]>([]);

  //fim do codigo de busca de api

  //recebendo os caracteres digitados no input
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }
  //fim do codigo de guardar os valores digitados

  //filtrando os paises de acordo com o que foi passado no searchTerm
  const handleFilterCountries = () => {
    let filteredCountries = countries;

    // Filtrar por região
    if (selectedOption && selectedOption !== "Filter by Region") {
      filteredCountries = filteredCountries.filter((country) =>
        country.region.toLowerCase().includes(selectedOption.toLowerCase())
      );
    }

    // Filtrar por searchTerm
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filteredCountries = filteredCountries.filter((country) =>
        country.name.toLowerCase().includes(lowerSearchTerm) ||
        country.region.toLowerCase().includes(lowerSearchTerm)
      );
    }

    setFilteredCountries(filteredCountries);
  };

  //fim do filtro onde os paises filtrados ficam na variavel filtered countries

  //codigo que faz funcionar a select box personalizada
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const selectContainerRef = useRef<HTMLDivElement>(null);

  const handleClick = (value: string) => {
    setSelectedOption(value);
    setShowDropDown(false);
    setShowPlaceholder(false);
  };

  const handleSelectBoxClick = () => {
    if (showDropDown === false) {
      setShowDropDown(!showDropDown);
      setShowPlaceholder(true);
    } else {
      handleClick("Filter by Region");
      setShowDropDown(!showDropDown);
      setShowPlaceholder(true);
    }
  }

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      selectContainerRef.current &&
      !selectContainerRef.current.contains(event.target as Node)
    ) {    
      setShowDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  //fim da select box personalizada
  //codigo para verificar os estados dos filtros
  useEffect(() => {
    handleFilterCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, selectedOption]);
  //fim do codigo para verificar estados dos filtros
  return (
    <div className={`filters  ${themeClassName}`}>
      <div className='search-container'>
        <AiOutlineSearch className={`search-icon  ${themeClassName}1`} />
        <input
          className={`search-input  ${themeClassName}`}
          type="search"
          placeholder="Search for a country..."
          onChange={handleSearchTermChange} />
      </div>
      <div className='select-container' ref={selectContainerRef}>
        <span className={`select-box  ${themeClassName}`} onClick={handleSelectBoxClick}>
          {showPlaceholder ? 'Filter by Region' : selectedOption}
          <svg className={`outline-icon  ${themeClassName}1`} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </span>
        <ul className={`${showDropDown ? 'show-dropdown' : 'hide-dropdown'} ${themeClassName}`}>
          <li value="option1" onClick={() => handleClick("Africa")}>Africa</li>
          <li value="option2" onClick={() => handleClick("America")}>America</li>
          <li value="option3" onClick={() => handleClick("Asia")}>Asia</li>
          <li value="option4" onClick={() => handleClick("Europe")}>Europe</li>
          <li value="option5" onClick={() => handleClick("Oceania")}>Oceania</li>
        </ul>
      </div>
    </div>
  );
}

export default FiltersContainer;