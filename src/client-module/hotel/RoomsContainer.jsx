import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { API_URL } from "../../config.js";

function RoomsContainer({ id }) {
  const {
    data: { rooms } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["room-by-hotel-id/by-hotel", id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/room/by-hotel/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log({ error });
    return <div>Error</div>;
  }

  return (
    <section className="flex flex-wrap gap-3">
      {rooms.map((room) => {
        return (
          <Link
            to={`/room/${room._id}`}
            key={room._id}
            className="flex-1 min-w-[300px] rounded overflow-hidden"
          >
            <img
              src={
                room.images.find(({ is_main_image }) => is_main_image)
                  ?.image_url || ""
              }
              className="h-[200px] w-full"
              alt=""
            />
            <div className="border px-3 py-5">
              <p>{room.description}</p>
              <div className="flex justify-between gap-3 py-1">
                <p className="flex gap-3">
                  <span className="font-bold">Tipo:</span>
                  <span>{room.room_type}</span>
                </p>
                <p className="flex gap-3">
                  <span className="font-bold">People capacity:</span>
                  <span>{room.people_capacity}</span>
                </p>
              </div>
              <p className="flex flex-col">
                <span className="font-bold text-sm">Current Price:</span>
                <span className="text-2xl">{room.night_price}</span>
              </p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

export default RoomsContainer;

RoomsContainer.propTypes = {
  id: PropTypes.string.isRequired,
};
