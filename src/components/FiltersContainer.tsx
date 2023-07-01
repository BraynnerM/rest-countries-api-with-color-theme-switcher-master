import { AiOutlineSearch } from 'react-icons/ai';
import { useState, useEffect, useRef } from 'react';

import "../styles/components/filterscontainer.sass";

interface FiltersContainerProps {
  countries: { flag: string; name: string; population: number; region: string; capital: string; }[];
}

const FiltersContainer: React.FC<FiltersContainerProps> = ({ countries }) => {
  //codigo novo
  const [searchTerm, setSearchTerm] = useState(''); // Estado para armazenar o valor digitado

  const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().startsWith(searchTerm.toLowerCase()) // Filtro de países por nome
  );
  //fim do codigo novo
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const selectContainerRef = useRef<HTMLDivElement>(null);
  console.log(countries); 

  const handleClick = (value: string) => {
    setSelectedOption(value);
    setShowDropDown(false);
    setShowPlaceholder(false);
  };

  const handleSelectBoxClick = () => {
    setShowDropDown(!showDropDown);
    setShowPlaceholder(true);
  };

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
  return (
    <div className="filters">
      <div className='search-container'>
        <AiOutlineSearch className="search-icon" />
        <input className="search-input" type="search" placeholder="Search for a country..." value={searchTerm} onChange={{handleSearchTermChange}} />
      </div>
      <div className='select-container' ref={selectContainerRef}>
        <span className="select-box" onClick={handleSelectBoxClick}>
          {showPlaceholder ? 'Filter by Region' : selectedOption}
          <svg className='outline-icon' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </span>
        <ul className={`${showDropDown ? 'show-dropdown' : 'hide-dropdown'}`}>
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
