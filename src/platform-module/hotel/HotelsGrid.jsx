import PropTypes from "prop-types";
import CardHotel from "./CardHotel";

export default function HotelsGrid({ rows }) {
  return (
    <div className="w-full grid  grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
      {rows.map((hotel) => {
        return <CardHotel key={hotel.id} hotel={hotel} />;
      })}
    </div>
  );
}

CardHotel.propTypes = {
    hotel: PropTypes.shape({
      name: PropTypes.string,
      country: PropTypes.string,
      address: PropTypes.string,
      description: PropTypes.string,
      updated_at: PropTypes.string,
      images: PropTypes.arrayOf(
        PropTypes.shape({
          is_main_image: PropTypes.bool,
          url: PropTypes.string,
        }),
      ),
    }),
  };