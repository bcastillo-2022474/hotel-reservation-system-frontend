import React from "react";
import "../index.css";

import PriceRange from "./PriceRangeContainer.jsx";
import Categories from "./Categories";

const SideMenu =() => {
    return(
        <div className=" min-w-80 lg:w-1/3  bg-stone-200 hidden lg:block p-5 flex items-center justify-center">
               <PriceRange/>
               <Categories/>
        </div>
    )
}
export default SideMenu;