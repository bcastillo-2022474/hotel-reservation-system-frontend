import { useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

function DropwDown({ defaultOption, options, onChange }) {
  const [optionSelected, setOptionSelected] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);
  const [elementFocused, setElementFocused] = useState(null);
  const buttonFocused = useRef(null);

  const handleKeyDown = (event) => {
    if (!isOpen && event.key !== "Tab" && event.key !== "Enter") {
      setIsOpen(true);
      setElementFocused(0);
    }
    const filteredOptions = options.filter(
      (option) => option !== optionSelected,
    );

    if (event.key === "Escape") {
      setIsOpen(false);
    }

    if (event.key === "ArrowDown") {
      setElementFocused((prev) => {
        if (prev === options.length - 2) {
          return 0;
        }
        return prev + 1;
      });
    }

    if (event.key === "ArrowUp") {
      setElementFocused((prev) => {
        if (prev === 0) {
          return options.length - 2;
        }
        return prev - 1;
      });
    }

    if (event.key === "Enter") {
      setOptionSelected(filteredOptions[elementFocused]);
      setIsOpen(false);
      onChange(filteredOptions[elementFocused]);
    }

    if (event.key === "Tab") {
      setIsOpen(false);
    }
  };

  // this will happen after the component is rendered
  useLayoutEffect(() => {
    if (buttonFocused.current) {
      buttonFocused.current.focus();
    }
  });

  return (
    <div
      role="presentation"
      className="bg-indigo-600 text-white relative rounded"
      onKeyDown={handleKeyDown}
    >
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        ref={elementFocused === 0 ? buttonFocused : null}
        data-isopen={isOpen || null}
        className="px-3 py-2 data-[isopen]:hover:bg-indigo-400 data-[isopen]:outline-none data-[isopen]:focus:bg-indigo-400 rounded flex gap-3 items-center w-full"
      >
        <span
          style={{
            minWidth: isOpen
              ? `${Math.max(...options.map(({ length }) => length))}ch`
              : "auto",
          }}
          className="text-center grow"
        >
          {optionSelected}
        </span>
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      {isOpen && (
        <div className="top-[95%] absolute flex flex-col w-full bg-inherit z-10 rounded overflow-none">
          {options
            .filter((option) => option !== optionSelected)
            .map((option, i, arr) =>
              option === optionSelected ? null : (
                <button
                  ref={elementFocused === i ? buttonFocused : null}
                  key={option}
                  onClick={() => {
                    setOptionSelected(option);
                    setIsOpen(false);
                    onChange(option);
                  }}
                  data-islast={i === arr.length - 1 || null}
                  type="button"
                  className="px-3 py-2 hover:bg-indigo-400 focus:bg-indigo-400 outline-none text-center data-[islast]:rounded-b"
                >
                  {option}
                </button>
              ),
            )}
        </div>
      )}
    </div>
  );
}

export default DropwDown;

DropwDown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultOption: PropTypes.string.isRequired,
};
