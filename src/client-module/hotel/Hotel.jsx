// CLIENT VIEW
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../../config.js";
import Navbar from "../../shared/componnents/Navbar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import RoomsContainer from "./RoomsContainer.jsx";
import ReviewsContainer from "./ReviewsContainer.jsx";

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
      <section className="sm:h-3/4 h-1/3 flex flex-col relative sm:justify-center sm:items-center text-center">
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
            className="cursor-pointer z-50 "
            icon={faChevronLeft}
          />
          <FontAwesomeIcon
            onClick={() => {
              setImgIndex((prev) => Math.min(prev + 1, hotel.imgs.length - 1));
            }}
            className="cursor-pointer z-40 b"
            icon={faChevronRight}
          />
        </div>
        <div className="w-full h-full absolute bg-black/50"></div>
        <h2 className="text-5xl sm:text-5xl font-bold text-white z-30 mt-[50px] sm:mt-0">
          {hotel.name}
        </h2>
      </section>
      <div className="px-2 sm:px-10 py-10 flex flex-col gap-5">
        <section>
          <h3 className="text-4xl font-bold mb-5">Description</h3>
          <p className="text-lg mb-5">{hotel.description}</p>
        </section>
        <RoomsContainer id={id} />
        <ReviewsContainer id={id} reviews={hotel.reviews} />
      </div>
    </div>
  );
}

export default Hotel;
