import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableCells, faTableList } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import RoomsGrid from "./RoomsGrid.jsx";
import Table from "./Table.jsx";

export default function RoomsContainer() {
  const columnsRef = useRef([
    {
      name: "id",
      position: 0,
      isSelected: false,
      isUp: true,
      type: "number",
    },
    {
      name: "description",
      position: 1,
      isSelected: false,
      isUp: true,
      type: "string",
    },
    {
      name: "people_capacity",
      position: 2,
      isSelected: false,
      isUp: true,
      type: "number",
    },
    {
      name: "night_price",
      position: 3,
      isSelected: false,
      isUp: true,
      type: "number",
    },
    {
      name: "tipo_habitacion",
      position: 4,
      isSelected: false,
      isUp: true,
      type: "string",
    },
    {
      name: "updated_at",
      position: 5,
      isSelected: false,
      isUp: true,
      type: "string",
    },
    {
      name: "hotel_id",
      position: 6,
      isSelected: false,
      isUp: true,
      type: "number",
    },
  ]);
  const [rows, setRows] = useState([
    {
      id: 1,
      description: "Room 1",
      people_capacity: 2,
      night_price: 100,
      tipo_habitacion: "Suite",
      updated_at: "2022-01-01",
      hotel_id: 1,
      images: [{ is_main_image: true, url: "https://picsum.photos/200/300" }],
    },
    {
      id: 2,
      description: "Room 2",
      people_capacity: 2,
      night_price: 100,
      tipo_habitacion: "Suite",
      updated_at: "2022-01-01",
      hotel_id: 1,
      images: [{ is_main_image: true, url: "https://picsum.photos/200/300" }],
    },
    {
      id: 3,
      description: "Room 3",
      people_capacity: 2,
      night_price: 100,
      tipo_habitacion: "Suite",
      updated_at: "2022-01-01",
      hotel_id: 1,
      images: [{ is_main_image: true, url: "https://picsum.photos/200/300" }],
    },
    {
      id: 4,
      description: "Room 4",
      people_capacity: 2,
      night_price: 100,
      tipo_habitacion: "Suite",
      updated_at: "2022-01-01",
      hotel_id: 1,
      images: [{ is_main_image: true, url: "https://picsum.photos/200/300" }],
    },
  ]);
  const [mode, setMode] = useState("table");

  const onSortBy = (column, columns) => {
    const columnAlreadySelected = column.isSelected;
    columns.forEach((column) => {
      column.isSelected = false;
    });

    column.isSelected = true;

    if (columnAlreadySelected) column.isUp = !column.isUp;
    columnsRef.current = [...columns];
    setRows(
      rows.toSorted((rowA, rowB) => {
        console.log({ column });
        if (column.type === "string") {
          console.log({ rowA, rowB });
          if (column.isUp) {
            return rowA[column.name].localeCompare(rowB[column.name]);
          }
          return rowB[column.name].localeCompare(rowA[column.name]);
        }

        // if type is number
        if (column.isUp) {
          return rowA[column.name] - rowB[column.name];
        }
        return rowB[column.name] - rowA[column.name];
      }),
    );
  };

  return (
    <div className="flex flex-col gap-3">
      <Link to={"/dashboard"}>Dashboard Link</Link>
      <div className="flex gao-2">
        <button
          onClick={() => {
            if (mode === "list") setMode("table");
          }}
          className="text-2xl p-2 border"
        >
          <FontAwesomeIcon icon={faTableCells} />
        </button>
        <button
          onClick={() => {
            if (mode === "table") setMode("list");
          }}
          className="text-2xl p-2 border"
        >
          <FontAwesomeIcon icon={faTableList} />
        </button>
      </div>
      {mode === "table" && (
        <Table
          columns={columnsRef.current}
          rows={rows}
          onSortBy={onSortBy}
          actions={{
            edit: {
              url: "/admin/rooms/edit",
              name: "Editar",
            },
            delete: {
              url: "/admin/rooms/delete",
              name: "Eliminar",
            },
          }}
        />
      )}
      {mode === "list" && <RoomsGrid rows={rows} />}
    </div>
  );
}
