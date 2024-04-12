import React from "react";
import "../index.css"

import FullStar from "../icons/FullStar";
import EmpyStar from "../icons/EmptyStar"


///import hotel from "../assets/perugia1.jpg"


const Card = () => {
    return(
       <div className="bg-white h-40 w-full mt-2 border-2 border-stone-200 rounded-xl flex" >
            <div className="w-60 m-1 rounded-lg overflow-hidden relative">
            <img src="https://picsum.photos/200/300" className="w-full h-full object-cover" alt="" />
            </div>
            <div className="bg-white grow h-full p-5">
                <FullStar/>
                <FullStar/>
                <FullStar/>
                <EmpyStar/>
                <EmpyStar/>
                <h1 className="font-bold text-2xl">Un hotel generico</h1>
                <p className="text-gray-400">Ciudad de Guatemala, Guatemala</p>
            </div>
            <div className="bg-stone-200 grow max-w-60 h-full p-2 rounded-lg relative">
                <h1 className="font-bold text-4xl mt-2 ml-2">100 $</h1>
                <p className="text-gray-400 ml-2">Por noche</p>
                <button className="bg-teal-400 w-full text-white font-bold h-16 rounded-lg absolute inset-x-0 bottom-0">
                    Ver precios
                </button>
            </div>
       </div> 
    )
}

export default Card