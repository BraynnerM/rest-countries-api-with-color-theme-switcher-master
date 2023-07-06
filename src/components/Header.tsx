import { HiOutlineMoon } from "../../public/react-icons/hi";

import "../styles/components/header.sass"

const Header = () => {
    return (
    <div className="header-container">
        <div className="header">
            <h1>
                Where in the world?
            </h1>
            <div className="theme-toggler">
                <span>
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