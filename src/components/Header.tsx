import { Link } from "react-router-dom"

import Mobilenav from "./Mobilenav"
import MainNav from "./MainNav"


const Header=() =>{
return (
    <div className="border-b-2 border-b-orange-500 py-6">
        <div className="container mx-auto flex justify-between items-center">
            <Link to="/"  className="text-3xl font-bold tracking-tight text-orange-500">
                EatBuzz.com
            </Link>
            
            <div className="md:hidden"> 
                <Mobilenav/>
            </div>
            <div className="hidden md:block">
                <MainNav/>
            </div>
        </div>
    </div>
)
}

export default Header 