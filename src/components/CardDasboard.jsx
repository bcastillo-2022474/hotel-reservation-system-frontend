import "../index.css";

import FullStar from "../icons/FullStar";
import EmpyStar from "../icons/EmptyStar";

import hotel from "../assets/Jeonju1.jpg";

const Card = () => {
  return(
    <div className="bg-white h-flex w-full mt-2 shadow-2xl rounded-xl flex flex-col md:flex-row md:h-40 p-2" >
         <div className="w-full h-40 md:max-w-64 md:h-full overflow-hidden relative">
            <img src={hotel} className="w-full h-full object-cover rounded-lg" alt="" />
         </div>
         <div className="bg-white grow h-full p-3">
             <FullStar/>
             <FullStar/>
             <FullStar/>
             <EmpyStar/>
             <EmpyStar/>
             <h1 className="font-bold text-2xl">Un hotel de 5 estrellas</h1>
             <p className="text-gray-400">Ciudad de Guatemala, Paises bajos</p>
         </div>
         <div className="bg-stone-200 grow h-full rounded-lg w-full md:max-w-[250px] md:w-flex">
             <div className="flex h-2/3 p-2">
                <p className="text-gray-400 m-3 mb-4 ">Desde</p>
                <h1 className="font-bold text-4xl mt-2 mr-2">10,000Q</h1>
             </div>
             <div className="w-full h-12 md:h-1/3">
                <button className="bg-teal-400 w-full text-white font-bold h-full rounded-lg hover:bg-stone-900">
                    Ver precios
                </button>
             </div>
         </div>
    </div> 
 )
};

export default Card;
