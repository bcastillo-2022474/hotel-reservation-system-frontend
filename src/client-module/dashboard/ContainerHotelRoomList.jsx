import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../config.js";
import CardHotelRoom from "./CardHotelRoomd.jsx";
import PropTypes from "prop-types";

export default function ContainerHotelRoomList({ inputSearch }) {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["feed"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/feed`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error}</div>;
  }

  const filteredRooms = data.rooms.filter((room) => {
    return (
      room.description.toLowerCase().includes(inputSearch.toLowerCase()) ||
      `${room.night_price}`.includes(inputSearch)
    );
  });

  console.log(data);

  return (
    <div className="overflow-y-scroll grow">
      {filteredRooms.length === 0 && (
        <div className="text-center text-5xl py-10">No rooms found</div>
      )}
      {filteredRooms.map(
        ({
          description,
          people_capacity,
          night_price,
          room_type,
          hotel,
          rating,
          img,
          quantity_people_rated,
          _id,
          favorite,
        }) => {
          console.log({ img }, "tf");

          return (
            <CardHotelRoom
              key={_id}
              description={description}
              img={img}
              rating={rating}
              quantity_people_rated={quantity_people_rated}
              hotel={hotel}
              room_type={room_type}
              people_capacity={people_capacity}
              night_price={night_price}
              _id={_id}
              favorite={favorite}
              inputSearch={inputSearch}
            />
          );
        },
      )}
    </div>
  );
}

ContainerHotelRoomList.propTypes = {
  inputSearch: PropTypes.string,
};
