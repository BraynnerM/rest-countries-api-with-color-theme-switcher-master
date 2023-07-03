import { useState } from "react";
import CountriesContainer from "./CountriesContainer"
import FiltersContainer from "./FiltersContainer";

import "../styles/components/MainContent.sass"

const MainContent = () => {
    const [filteredCountries, setFilteredCountries] =useState([]);    
    return (
        <div className="main"> 
            <FiltersContainer setFilteredCountries={setFilteredCountries} />       
            <CountriesContainer filteredCountries={filteredCountries} />                           
        </div>
    )
}

export default MainContent;