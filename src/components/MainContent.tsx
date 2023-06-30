import FiltersContainer from "./FiltersContainer"
import CountriesContainer from "./CountriesContainer"

import "../styles/components/MainContent.sass"


const MainContent = () => {
    return <div className="main">
        <FiltersContainer />
        <CountriesContainer />
               
    </div>
}

export default MainContent;