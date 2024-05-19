import { useState } from "react";
import "../index.css";

const PriceRange = () => {
  const [minPrice, setMinPrice] = useState(2500);
  const [maxPrice, setMaxPrice] = useState(7500);

  const handleMinPriceChange = (event) => {
    let value = parseInt(event.target.value);
    if (isNaN(value) || value < 1) {
      value = 1;
    } else if (value > maxPrice) {
      value = maxPrice;
    }
    setMinPrice(value);

    // setTimeout(() => {
    //     console.log(value + " - " + maxPrice);
    // }, 5000);
  };

  const handleMaxPriceChange = (event) => {
    let value = parseInt(event.target.value);
    if (isNaN(value) || value > 10000) {
      value = 10000;
    } else if (value < minPrice) {
      value = minPrice;
    }
    setMaxPrice(value);

    // setTimeout(() => {
    //     console.log(minPrice + " - " + value);
    // }, 5000);
  };
  // const minInputStyle = {
  //   left: `${(minPrice / 10000) * 100}%`,
  // };

  // const maxInputStyle = {
  //   left: `${(maxPrice / 10000) * 100}%`,
  // };

  return (
    <div className="wrapper w-full bg-white  rounded-xl px-6 py-5 pb-10">
      <header>
        <h1 className="font-bold text-xl">Rango de precio</h1>
      </header>
      <div className="price-input rP">
        <div className="field rP">
          <span>Min</span>
          <input
            type="number"
            className="input-min rP"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
        </div>
        <div className="separator rP">-</div>
        <div className="field rP">
          <span>Max</span>
          <input
            type="number"
            className="input-max rP"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>
      <div className="slider rP">
        <div
          className="progress bg-[#1778BD]"
          style={{
            left: `${(minPrice / 10000) * 100}%`,
            right: `${100 - (maxPrice / 10000) * 100}%`,
          }}
        ></div>
      </div>
      <div className="range-input rP">
        <input
          type="range"
          className="range-min"
          min="0"
          max="10000"
          value={minPrice}
          step="100"
          onChange={handleMinPriceChange}
        />
        <input
          type="range"
          className="range-max"
          min="0"
          max="10000"
          value={maxPrice}
          step="100"
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
};

export default PriceRange;
