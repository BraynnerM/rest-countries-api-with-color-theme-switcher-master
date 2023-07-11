import { useState } from "react";
import CountriesContainer from "./CountriesContainer"
import FiltersContainer from "./FiltersContainer";
import React, { useContext } from 'react';
import { ThemeContext } from "../contexts/ThemeContext";

import "../styles/components/maincontent.sass"

const MainContent = () => {
    interface Country {
        flag: string;
        name: string;
        population: number;
        region: string;
        capital: string;
      }
    const [filteredCountries, setFilteredCountries] =useState<Country[]>([]); 
    const { theme, toggleTheme } = useContext(ThemeContext);
    const themeClassName = `${theme === 'light' ? 'light-theme' : 'dark-theme'}`;   
    return (
        <div className={`main  ${themeClassName}-main`}> 
            <FiltersContainer setFilteredCountries={setFilteredCountries} />       
            <CountriesContainer filteredCountries={filteredCountries} />                           
        </div>
    )
}

export default MainContent;