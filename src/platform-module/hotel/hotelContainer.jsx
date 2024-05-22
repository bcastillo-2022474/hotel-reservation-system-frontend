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
    <div className="flex justify-center mt-8">
      <section className="flex flex-wrap justify-center gap-6 max-w-screen-lg">
        {hotels.map((hotel) => {
          // Limitar la longitud de la descripción y agregar "..." si es necesario
          let description =
            hotel.description.length > 100
              ? `${hotel.description.slice(0, 100)}...`
              : hotel.description;

          return (
            <div
              key={hotel._id}
              className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-6"
            >
              <Link
                to={`/hotel/${hotel._id}`}
                className="block rounded-lg overflow-hidden border border-gray-300 transform hover:scale-105 transition duration-300"
              >
                <ImgHotel id={hotel._id}></ImgHotel>
                <div className="bg-white p-6 rounded-lg shadow-xl hover:shadow-2xl flex flex-col h-full">
                  <div>
                    <p className="text-xl font-semibold mb-2">{hotel.name}</p>
                    <div className="mb-4">
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold">País:</span> {hotel.country}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Dirección:</span>{" "}
                        {hotel.address}
                      </p>
                    </div>
                    <p className="text-gray-700 mb-4">{description}</p>
                  </div>
                  <div className="mt-auto">
                    <button className="px-4 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300">
                      Eliminar
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </section>
    </div>
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