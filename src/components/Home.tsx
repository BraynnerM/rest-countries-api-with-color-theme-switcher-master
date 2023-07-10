import MainContent from "./MainContent.tsx"
import React, { useContext } from 'react';
import { ThemeContext } from "../contexts/ThemeContext";

import "../styles/components/home.sass"

function HomeComponent() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const themeClassName = `countries-api  ${theme === 'light' ? 'light-theme' : 'dark-theme'}`;

  return (
    <div className={themeClassName}>
      <MainContent />
    </div>
  )
}

export default HomeComponent