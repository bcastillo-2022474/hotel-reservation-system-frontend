import React from "react";
import "../index.css";

import FullStar from "../icons/FullStar";
import EmpyStar from "../icons/EmptyStar";

import hotel from "../assets/Jeonju1.jpg";

const Card = () => {
  return (
    <div className="bg-white w-full border-2 border-stone-100 rounded-xl flex p-1 flex-col sm:flex-row">
      <div className="w-60 h-full rounded-lg overflow-hidden">
        <img src={hotel} className="w-full h-full object-cover" alt="" />
      </div>
      <div>
        <div className="bg-white grow h-full p-5">
          <FullStar />
          <FullStar />
          <FullStar />
          <EmpyStar />
          <EmpyStar />
          <h1 className="font-bold text-2xl">Un hotel generico</h1>
          <p className="text-gray-400">Ciudad de Guatemala, Guatemala</p>
        </div>
      </div>
      <div className="bg-blue-50">
        <div className="bg-stone-100 grow max-w-60 h-full p-2 rounded-lg overflow-hidden"></div>
        <h1 className="font-bold text-4xl mt-2 ml-2">100 $</h1>
        <p className="text-gray-400 ml-2">Por noche</p>
      </div>
    </div>
  );
};

export default Card;
