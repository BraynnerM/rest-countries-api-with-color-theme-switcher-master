import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';

import "../styles/components/filterscontainer.sass"


const FiltersContainer = () => {
    const [showDropDown, setShowDropDown] = useState(false);
    const handleClick = () => {
        setShowDropDown(!showDropDown);
    }
    return (
        <div className="filters">
            <div className='search-container'>
                <AiOutlineSearch className="search-icon" />
                <input className="search-input" type="search" placeholder="Search for a country..." />
            </div>
            <div className='select-container'>
                <span className="select-box" onClick={handleClick}>Filter by Region
                    <svg className='outline-icon' xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" /></svg>
                </span>
                <ul className={`${showDropDown ? 'show-dropdown' : 'hide-dropdown'}`}>
                    <li value="option1">Africa</li>
                    <li value="option2">America</li>
                    <li value="option3">Asia</li>
                    <li value="option4">Europe</li>
                    <li value="option5">Oceania</li>
                </ul>                
            </div>
        </div>
    );
}

export default FiltersContainer;

