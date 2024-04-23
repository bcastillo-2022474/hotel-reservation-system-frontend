import { useState } from "react";
import "../index.css";

import FullStar from "../icons/FullStar";

const Categories = () => {
    const [checkboxes, setCheckboxes] = useState({
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false,
    });

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxes({ ...checkboxes, [name]: checked });
    };

    return (
        <div className="bg-white w-flex p-5 mt-4 rounded-xl flex flex-col ">
            <div className="p-3">
                <h1 className="font-bold text-xl">Categorias</h1>
            </div>
            <div>
                <label className="flex items-center p-1">
                    <input
                        type="checkbox"
                        className="form-checkbox text-teal-500 h-8 w-8"
                        name="option1"
                        checked={checkboxes.option1}
                        onChange={handleCheckboxChange}
                    />
                    <span className="ml-2 font-bold">
                        <FullStar /> 0-1
                    </span>
                </label>
                <label className="flex items-center p-1">
                    <input
                        type="checkbox"
                        className="form-checkbox text-teal-500 h-8 w-8"
                        name="option2"
                        checked={checkboxes.option2}
                        onChange={handleCheckboxChange}
                    />
                    <span className="ml-2 font-bold">
                        <FullStar /> 2
                    </span>
                </label>
                <label className="flex items-center p-1">
                    <input
                        type="checkbox"
                        className="form-checkbox text-teal-500 h-8 w-8 checked:text-black"
                        name="option3"
                        checked={checkboxes.option3}
                        onChange={handleCheckboxChange}
                    />
                    <span className="ml-2 font-bold">
                        <FullStar /> 3
                    </span>
                </label>
                <label className="flex items-center p-1">
                    <input
                        type="checkbox"
                        className="form-checkbox text-teal-500 h-8 w-8"
                        name="option4"
                        checked={checkboxes.option4}
                        onChange={handleCheckboxChange}
                    />
                    <span className="ml-2 font-bold">
                        <FullStar /> 4
                    </span>
                </label>
                <label className="flex items-center p-1">
                    <input
                        type="checkbox"
                        className="form-checkbox text-teal-500 h-8 w-8"
                        name="option5"
                        checked={checkboxes.option5}
                        onChange={handleCheckboxChange}
                    />
                    <span className="ml-2 font-bold">
                        <FullStar /> 5
                    </span>
                </label>
            </div>
        </div>
    )
}

export default Categories