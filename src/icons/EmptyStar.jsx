import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import React from "react";
import "../index.css"

const EmptyStar = () => {
    return (
      <FontAwesomeIcon  icon={faStar} size="md" style={{color: "#D9D9D9",}}/>
    );
};
  
export default EmptyStar;