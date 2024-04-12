import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import React from "react";
import "../index.css"

const EmptyStar = () => {
    return (
      <FontAwesomeIcon  icon={faStar} size="lg" style={{color: "#A6A6A6",}}/>
    );
};
  
export default EmptyStar;