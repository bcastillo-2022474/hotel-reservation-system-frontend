// CLIENT VIEW
import { Link, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../config.js";
import Navbar from "../components/Navbar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../contexts/UserContext.jsx";
import { toast } from "react-toastify";

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
      <div className="px-2 sm:px-10 py-10 flex flex-col gap-5">
        <section>
          <h3 className="text-4xl font-bold">Description</h3>
          <p className="text-lg">{hotel.description}</p>
        </section>
        <RoomsContainer id={id} />
        <ReviewsContainer id={id} reviews={hotel.reviews} />
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

RoomsContainer.propTypes = {
  id: PropTypes.string.isRequired,
};

function ReviewsContainer({ reviews, id }) {
  const { user } = useContext(UserContext);
  console.log({ reviews });
  const initials = [user.name.at(0), user.lastname.at(0)].join("");

  const [cleanliness, setCleanliness] = useState(null);
  const [staff, setStaff] = useState(null);
  const [facilities, setFacilities] = useState(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const response = await fetch(`${API_URL}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["hotel", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["reviews"],
      });

      toast("Review submitted successfully", { type: "success" });
    },
    onError: () => {
      toast("Error submitting review", { type: "error" });
    },
  });

  return (
    <div className="w-full py-5 flex flex-col gap-5">
      <h2 className="text-3xl font-bold">Reviews ({reviews.length})</h2>
      <div className="flex gap-5 items-start px-10 rounded-lg">
        <div className="rounded-full p-5 relative bg-red-800 flex justify-center items-center text-white">
          <span className="absolute text-2xl font-bold">{initials}</span>
        </div>
        <form className="flex flex-col w-full">
          <div className="flex gap-3 py-5">
            <div className="w-1/3 border">
              <span>Staff</span>
              <div className="flex gap-1">
                <StarSelector
                  indexSelected={staff}
                  setIndexSelected={setStaff}
                />
              </div>
            </div>
            <div className="w-1/3 border">
              <span>Inmueble</span>
              <div className="flex gap-1">
                <StarSelector
                  indexSelected={facilities}
                  setIndexSelected={setFacilities}
                />
              </div>
            </div>
            <div className="w-1/3 border">
              <span>Limpieza</span>
              <div className="flex gap-1">
                <StarSelector
                  indexSelected={cleanliness}
                  setIndexSelected={setCleanliness}
                />
              </div>
            </div>
          </div>
          <textarea
            className="border w-full rounded"
            name=""
            rows="3"
          ></textarea>
          <button
            onClick={() => {
              // mutation.mutate({
              //   SEND DATA TO POST REVIEW
              // });
            }}
            className="px-2 py-1 rounded bg-red-700 self-end mt-3"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

function StarComponent({ index, indexHover, indexSelected, onHover, onClick }) {
  const [isPainted, setIsPainted] = useState(false);
  const isBetweenRangeHovered = indexHover !== null && index <= indexHover;
  const isBetweenRangeSelected =
    indexSelected !== null && index <= indexSelected;

  return (
    <FontAwesomeIcon
      onMouseOver={() => {
        setIsPainted(true);
        onHover();
      }}
      onMouseOut={() => setIsPainted(false)}
      className={`text-[#EBB03C] hover:scale-110 text-2xl hover cursor-pointer ${isBetweenRangeHovered && "scale-110"}`}
      icon={
        isPainted ||
        isBetweenRangeHovered ||
        (isBetweenRangeSelected && indexHover === null) ||
        index === 0
          ? faStarSolid
          : faStar
      }
      onClick={onClick}
    />
  );
}

function StarSelector({ indexSelected, setIndexSelected }) {
  const [indexHover, setIndexHover] = useState(null);

  return (
    <div
      className="flex gap-1"
      onMouseOut={() => {
        setIndexHover(null);
      }}
    >
      {[...Array(5)].map((_, i) => {
        return (
          <StarComponent
            indexHover={indexHover}
            indexSelected={indexSelected}
            key={i}
            onHover={() => {
              setIndexHover(i);
            }}
            onClick={() => {
              setIndexSelected(i);
            }}
            index={i}
          />
        );
      })}
    </div>
  );
}

ReviewsContainer.propTypes = {
  reviews: PropTypes.array.isRequired,
};
