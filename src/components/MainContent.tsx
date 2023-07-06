import { useState } from "react";
import CountriesContainer from "./CountriesContainer"
import FiltersContainer from "./FiltersContainer";

import "../styles/components/MainContent.sass"

const MainContent = () => {
    interface Country {
        flag: string;
        name: string;
        population: number;
        region: string;
        capital: string;
      }
    const [filteredCountries, setFilteredCountries] =useState<Country[]>([]);    
    return (
        <div className="main"> 
            <FiltersContainer setFilteredCountries={setFilteredCountries} />       
            <CountriesContainer filteredCountries={filteredCountries} />                           
        </div>
    )
}

export default MainContent;