import AppRoutes from "./pages/routes"
import Header from "./components/Header"
import { Helmet } from "react-helmet"
import React, { useContext } from 'react';
import { ThemeContext } from "./contexts/ThemeContext";

function App() {  
  const { theme, toggleTheme } = useContext(ThemeContext);
  const themeClassName = `${theme === 'light' ? 'light-theme' : 'dark-theme'}`;   
   
  return (
    <>
    <Helmet 
      bodyAttributes={{class: `${themeClassName}`}}
    />
    <Header />
    <AppRoutes />
    </>
  )
}

export default App
