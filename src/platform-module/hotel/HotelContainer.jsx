import PropTypes from "prop-types";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { API_URL } from "../../config.js";
import Navbar from "../../shared/components/Navbar.jsx";
import { Link } from "react-router-dom";

function HotelContainer() {
  const { data, isLoading, error } = useQuery({
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

  return (
    <>
      <Navbar></Navbar>
      <div className=" items-center flex w-full content-center m-7">
        <Link
          to={'/room/form/'}
          className="bg-black rounded-lg text-white font-bold p-3 m-3"
        >
          Add Room
        </Link>

        <Link
          to={'/hotel/create/'}
          className="bg-black rounded-lg text-white font-bold p-3 m-3"
        >
          Add Hotel
        </Link>
        <Link
          to={'/users'}
          className="bg-black rounded-lg text-white font-bold p-3 m-3"
        >
          System users
        </Link>

      </div>
      <div className="flex justify-around pt-2">
        <h2 className="text-4xl font-bold text-center">Hoteles</h2>
        <div className="flex gap-3">
          {/* <button className="bg-black text-white px-3 py-2 rounded outline-none focus:outline-1 outline-offset-1 focus:outline-black">
            Crear hotel
          </button> */}
          {/*<button className="bg-black text-white px-3 py-2 rounded outline-none focus:outline-1 outline-offset-1 focus:outline-black">*/}
          {/*  Ver hotel*/}
          {/*</button>*/}
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <section className="flex flex-wrap justify-center gap-6 max-w-screen-lg">
          {hotels.map((hotel) => {
            let description =
              hotel.description.length > 100
                ? `${hotel.description.slice(0, 100)}...`
                : hotel.description;
            return (
              <div
                key={hotel._id}
                className="bg-white rounded-lg shadow-md p-4 max-w-xs w-full cursor-pointer mb-6 relative border-2 border-gray-300"
              >
                <div className="flex flex-col gap-2 h-full">
                  <div>
                    <ImgHotel id={hotel._id} />
                    {/* Reemplaza con tu componente de imagen */}
                  </div>
                  <div className="grow">
                    <h1 className="text-lg font-semibold text-neutral-600">
                      {hotel.name}
                    </h1>
                    <div>
                      <p className="text-sm flex gap-1">
                        <span className="font-semibold">País:</span>
                        <span>{hotel.country}</span>
                      </p>
                      <p className="text-sm flex gap-1">
                        <span className="font-semibold">Dirección:</span>
                        <span>{hotel.address}</span>
                      </p>
                    </div>
                    <p className="text-sm flex flex-col gap-1">
                      <span className="font-semibold">Descripción:</span>
                      <span
                        className="overflow-hidden"
                        style={{ textOverflow: "ellipsis" }}
                      >
                        {description}
                      </span>
                    </p>
                  </div>
                  <div className="w-full  p-3 pl-0 items-center justify-center ">
                    <Link
                      to={`/admin/bookings/by-hotel/${hotel._id}`}
                      className="bg-black rounded-lg text-white font-bold p-3"
                    >
                      Ver Reservaciones
                    </Link>
                  </div>

                  <div className="shrink-0 w-full">

                    <DeleteHotel hotelId={hotel._id} />
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}

export default HotelContainer;

function DeleteHotel({ hotelId }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/hotel/${hotelId}`, {
        method: "DELETE",
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
    onSuccess: () => {
      toast("Hotel eliminado", { type: "success" });
      queryClient.invalidateQueries(["hotel"]);
    },
    onError: (error) => {
      toast("Error: " + error.message, { type: "error" });
    },
  });

  return (
    <div className="w-full">
      <button
        onClick={() => {
          if (mutation.isError || mutation.isPending) return;
          mutation.mutate();
        }}
        className="w-full bg-black text-white px-3 py-2 rounded outline-none focus:outline-1 outline-offset-1 focus:outline-black"
      >
        <span>
          {mutation.isPending && (
            <>
              <span>Eliminando</span>
              <span className="animate-spin size-[25px] border-4 border-b-black border-t-black rounded-full" />
            </>
          )}
          {mutation.isIdle && <span>Eliminar</span>}
          {mutation.isError && "Error"}
        </span>
      </button>
    </div>
  );
}

DeleteHotel.propTypes = {
  hotelId: PropTypes.string.isRequired,
};

const ImgHotel = ({ id }) => {
  const { data, isLoading, error } = useQuery({
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
    data.images && (
      <img
        src={
          data.images?.find(({ is_main_image }) => is_main_image)?.image_url ||
          ""
        }
        className="h-[200px] w-full"
        alt=""
      />
    )
  );
};
