import PropTypes from "prop-types";
import CardRoom from "./CardRoom.jsx";

export default function RoomsGrid({ rows }) {
  return (
    <div className="w-full grid  grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
      {rows.map((room) => {
        return <CardRoom key={room.id} room={room} />;
      })}
    </div>
  );
}

RoomsGrid.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      description: PropTypes.string,
      people_capacity: PropTypes.number,
      night_price: PropTypes.number,
      tipo_habitacion: PropTypes.string,
      updated_at: PropTypes.string,
      hotel_id: PropTypes.number,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          url: PropTypes.string,
          is_main_image: PropTypes.bool,
        }),
      ),
    }),
  ),
};
