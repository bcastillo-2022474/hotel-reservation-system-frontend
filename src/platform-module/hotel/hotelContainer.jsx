import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { API_URL } from "../../config.js";

function HotelContainer() {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hotel"],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/hotel`);
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

  const { hotels } = data;
  console.log(data)

  return (
    <section className="flex flex-wrap gap-3">
      {hotels.map((hotel) => {
        return (
          <Link
            to={`/hotel/${hotel._id}`}
            key={hotel._id}
            className="flex-1 min-w-[300px] h-[500px] rounded overflow-hidden"
          >
            <ImgHotel id={hotel._id}></ImgHotel>
            <div className="border px-3 py-5">
              <p>{hotel.name}</p>
              <div className="flex justify-between gap-3 py-1">
                <p className="flex gap-3">
                  <span className="font-bold">Pais:</span>
                  <span>{hotel.country}</span>
                </p>
                <p className="flex gap-3">
                  <span className="font-bold">Direccion:</span>
                  <span>{hotel.address}</span>
                </p>
              </div>
              <p className="flex flex-col">
                <span className="font-bold text-sm">Descripcion:</span>
                <span className="text-2xl">{hotel.description}</span>
              </p>
            </div>
          </Link>
        );
      })}
    </section>
  );
}

export default HotelContainer;

HotelContainer.propTypes = {
  id: PropTypes.string.isRequired,
};

const ImgHotel = ({ id }) => {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hotelImg/by-hotel", id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/hotelImg/by-hotel/${id}`, {
        headers: {
          "Content-Type": "application/json",
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

  if (error) {
    console.log({ error });
    return <div>Error</div>;
  }
  
  return (
    data.images && 
    <img
      src={
        data.images?.find(({ is_main_image }) => is_main_image)
          ?.image_url || ""
      }
      className="h-[200px] w-full"
      alt=""
    />
  )
}