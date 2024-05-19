import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { API_URL } from "../config.js";
import Navbar from "../components/Navbar.jsx";
import CheckInForm from "../components/CheckInForm.jsx";
import PropTypes from "prop-types";

function Room() {
  const { id } = useParams();

  const {
    data: { room } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/room/${id}`);
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

  // sort so image with is_main_image true is first
  const imagesSorted = room.images.toSorted((a, b) => {
    if (a.is_main_image) return -1;
    if (b.is_main_image) return 1;
    return 0;
  });

  console.log({ room });
  return (
    <>
      <main className="flex flex-col h-dvh overflow-y-hidden">
        <Navbar />
        <section className="flex flex-col px-2 md:px-20 py-10 items-center grow overflow-y-scroll">
          <ImageCollage images={imagesSorted} />
          <section className="flex flex-col md:flex-row gap-5 w-full py-5 justify-between">
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold">{room.hotel.address}</h1>
              <h1 className="text-2xl font-bold">{room.title}</h1>
              <p className="text-lg">{room.description}</p>
              <p className="text-lg">{room.night_price} kr</p>
            </div>
            <CheckInForm room={id} bookings={room.bookings} />
          </section>
        </section>
      </main>
    </>
  );
}

export default Room;

function ImageCollage({ images }) {
  return (
    <div className="grid grid-rows-4 grid-cols-2 gap-3 sm:grid-cols-4 sm:grid-rows-2 sm:gap-5 rounded-2xl overflow-hidden w-full h-full shrink-0 max-w-[1200px]">
      {images.length === 1 && (
        <div className="col-span-4 row-span-2 w-full h-full object-cover">
          <img
            src={images[0].image_url}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      )}
      {images.length === 2 && (
        <>
          <div className="col-span-2 row-span-2 border">
            <img
              src={images[0].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-2 row-span-2 border">
            <img
              src={images[1].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </>
      )}
      {images.length === 3 && (
        <>
          <div className="col-span-2 row-span-2 border ">
            <img
              src={images[0].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-2 row-span-1 border">
            <img
              src={images[1].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-2 row-span-1 border">
            <img
              src={images[2].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </>
      )}
      {images.length === 4 && (
        <>
          <div className="col-span-2 row-span-2 border">
            <img
              src={images[0].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-1 row-span-1 border">
            <img
              src={images[1].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-1 row-span-1 border">
            <img
              src={images[2].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-2 row-span-1 border">
            <img
              src={images[3].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </>
      )}
      {images.length >= 5 && (
        <>
          <div className="col-span-2 row-span-2 border">
            <img
              src={images[0].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-1 row-span-1 border">
            <img
              src={images[1].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-1 row-span-1 border">
            <img
              src={images[2].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-1 row-span-1 border">
            <img
              src={images[3].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
          <div className="col-span-1 row-span-1 border1">
            <img
              src={images[4].image_url}
              className="w-full h-full object-cover"
              alt=""
            />
          </div>
        </>
      )}
    </div>
  );
}

ImageCollage.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image_url: PropTypes.string.isRequired,
    }),
  ),
};
