import {
  faChevronDown,
  faChevronUp,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function Table({ columns, rows, onSortBy, actions }) {
  const [activePopup, setActivePopup] = useState(null);
  const potalRoot = useRef(null);
  if (!potalRoot.current) {
    potalRoot.current = document.getElementById("portal-root");
  }
  const buttonPosition = useRef({ x: 0, y: 0 });
  const handlePopupClick = (id, event) => {
    const rect = event.target.getBoundingClientRect();
    buttonPosition.current = { x: rect.x, y: rect.y };
    setActivePopup(activePopup === id ? null : id);
  };

  return (
    <div className="w-full overflow-y-hidden rounded-3xl">
      <table className="w-full">
        <thead className="bg-[#1678bd]">
          <tr className="text-white text-xl">
            {columns.map((column) => {
              const directionIcon = column.isUp ? faChevronUp : faChevronDown;
              return (
                <th
                  className="border text-start ps-3 py-2 cursor-pointer"
                  onClick={() => onSortBy(column, columns)}
                  key={column.position}
                >
                  <div className="flex gap-3 items-center">
                    <span>{column.name}</span>
                    <button className={column.isSelected ? "" : "invisible"}>
                      <FontAwesomeIcon icon={directionIcon} />
                    </button>
                  </div>
                </th>
              );
            })}
            <th className="border text-start ps-3 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="odd:[&_>_tr]:bg-neutral-400 even:[&_>_tr]:bg-neutral-200">
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td className="border px-3" key={column.position}>
                  {row[column.name]}
                </td>
              ))}
              <td className="relative px-3">
                <FontAwesomeIcon
                  icon={faEdit}
                  className="cursor-pointer"
                  onClick={(e) => handlePopupClick(row.id, e)}
                />
                {activePopup === row.id &&
                  createPortal(
                    <div
                      style={{
                        position: "fixed",
                        top: buttonPosition.current.y,
                        left: buttonPosition.current.x + 30,
                      }}
                      className="z-50 bg-neutral-300 rounded font-bold border flex flex-col"
                    >
                      {Object.keys(actions).map((action) => {
                        const { url, name } = actions[action];
                        return (
                          <Link
                            key={action}
                            className="hover:underline hover:text-indigo-600 px-5 py-1 border hover:bg-indigo-100"
                            to={url}
                          >
                            {name}
                          </Link>
                        );
                      })}
                    </div>,
                    potalRoot.current,
                  )}
              </td>
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center p-10 bg-neutral-300 font-bold"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSortBy: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
};
