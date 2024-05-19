import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../config.js";
import CardHotelRoom from "./CardHotelRoomd.jsx";

export default function ContainerHotelRoomList() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["room"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/feed`);
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

  console.log(data);

  return (
    <div className="overflow-y-scroll grow">
      {data.rooms.map(
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
            />
          );
        },
      )}
    </div>
  );
}
