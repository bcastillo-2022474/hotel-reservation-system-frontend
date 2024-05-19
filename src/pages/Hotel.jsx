// CLIENT VIEW
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../config.js";
import Navbar from "../components/Navbar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function Hotel() {
  const { id } = useParams();
  const [imgIndex, setImgIndex] = useState(null);
  const {
    data: hotel,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["hotel", id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/hotel/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
  });

  useEffect(() => {
    if (!isLoading && !error) {
      const index = hotel.imgs.findIndex((img) => img.is_main_image);
      setImgIndex(index);
    }
  }, [isLoading, error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log({ error });
    return <div>Error</div>;
  }

  console.log({ hotel });
  return (
    <div className="h-dvh overflow-y-scroll">
      <Navbar />
      <section className="h-3/4 flex flex-col relative justify-center items-center">
        <div className="w-full h-full absolute flex justify-between items-center text-5xl text-white px-2 sm:px-20">
          {imgIndex !== null &&
            hotel.imgs.map((img, i) => {
              return (
                <img
                  key={img._id}
                  className={`w-full h-full object-cover absolute left-0 ${imgIndex !== i && "hidden"}`}
                  src={img.image_url}
                  alt={hotel.name}
                />
              );
            })}
          <FontAwesomeIcon
            onClick={() => {
              setImgIndex((prev) => Math.max(prev - 1, 0));
            }}
            className="cursor-pointer z-40"
            icon={faChevronLeft}
          />
          <FontAwesomeIcon
            onClick={() => {
              setImgIndex((prev) => Math.min(prev + 1, hotel.imgs.length - 1));
            }}
            className="cursor-pointer z-40"
            icon={faChevronRight}
          />
        </div>
        <div className="w-full h-full absolute bg-black/50"></div>
        <h2 className="text-5xl sm:text-7xl font-bold text-white z-40">
          {hotel.name}
        </h2>
      </section>
      <div className="px-2 sm:px-10 py-10">
        <section>
          <h3 className="text-4xl font-bold">Description</h3>
          <p className="text-lg">{hotel.description}</p>
        </section>
        <RoomsContainer id={id} />
        <ReviewsContainer reviews={hotel.reviews} />
      </div>
    </div>
  );
}

export default Hotel;

function RoomsContainer({ id }) {
  const {
    data: { rooms } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["rooms/by-hotel", id],
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

function ReviewsContainer({ reviews }) {
  console.log({ reviews });

  return <div>Hello its me</div>;
}
