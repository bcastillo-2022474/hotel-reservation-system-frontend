import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../config.js";
import { UserContext } from "../../contexts/UserContext.jsx";
import { toast } from "react-toastify";

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

export default ReviewsContainer;

ReviewsContainer.propTypes = {
  reviews: PropTypes.array.isRequired,
};
