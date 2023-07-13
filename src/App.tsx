import AppRoutes from "./routes/routes"
import Header from "./components/Header"
import { Helmet } from "react-helmet"
import { useContext } from 'react';
import { ThemeContext } from "./contexts/ThemeContext";

function App() {  
  const { theme } = useContext(ThemeContext);
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
