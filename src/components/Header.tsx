import { HiOutlineMoon } from "react-icons/hi";
import React, { useContext } from 'react';
import { ThemeContext } from "../contexts/ThemeContext";

import "../styles/components/header.sass"

const Header = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const themeClassName = `${theme === 'light' ? 'light-theme' : 'dark-theme'}`;

    return (
    <div className={`header-container  ${themeClassName}-header`}>
        <div className="header">
            <h1>
                Where in the world?
            </h1>
            <div className="theme-toggler">
                <span onClick={toggleTheme}>
                    <HiOutlineMoon className="moon"/>
                    <p>
                        Dark Mode
                    </p>
                </span>            
            </div>       
        </div>
    </div>
    )
}

export default Header;