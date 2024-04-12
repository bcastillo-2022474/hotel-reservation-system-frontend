import React from "react";
import "../index.css"

import logo from "../assets/logo1.png"
import user from "../assets/userImg.png"

const Navbar = () => {
    return(
        <nav className="bg-white w-full h-14 border-b-2 border-stone-200 flex sticky top-0 z-50">
            <div className="bg-white p-1 h-full">
                
            </div>
            <div className="flex-none w-flex h-full flex items-center justify-center p-2">
                <img className="h-full object-contain" src={logo} alt="" />
            </div>
            <div className="bg-white grow h-full">
            </div>
            <div className="bg-white w-flex h-full p-1 pr-3">
                <img className="h-full object-contain " src={user} alt=""/>
            </div>
        </nav>
    )

}

export default Navbar;