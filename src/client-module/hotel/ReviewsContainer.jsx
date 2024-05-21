import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { API_URL } from "../../config.js";
import { UserContext } from "../../contexts/UserContext.jsx";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
// import { comment } from "postcss";

function ReviewsContainer({ reviews, id }) {
  const { user } = useContext(UserContext);
  console.log({ reviews });

  const initials = [user.name.at(0), user.lastname.at(0)].join("");

  const [cleanliness, setCleanliness] = useState(null);
  const [staff, setStaff] = useState(null);
  const [facilities, setFacilities] = useState(null);
  const [comment, setComment] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {

      const response = await fetch(`${API_URL}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token"),
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
        queryKey: ["review"],
      });

      queryClient.invalidateQueries(["review/by-hotel", id]);
      toast("Review submitted successfully", { type: "success" });
    },
    onError: () => {
      toast("Error submitting review", { type: "error" });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync({
        rating_cleanliness: cleanliness + 1,
        rating_staff: staff + 1,
        rating_facilities: facilities + 1,
        comment: comment,
        hotel_id: id,
      });
      setComment("")
    } catch (error) {
      console.error("Mutation error:", error);
    }
  };


  return (
    <div className="">
      <div className="w-full py-5 flex flex-col gap-5">
        <h2 className="ml-5 text-3xl font-bold">Reseñasx ({reviews.length})</h2>
        <h2 className="ml-5 text-xl font-bold">Agrega una reseña...</h2>
        <div className="flex gap-5 items-start px-10 rounded-lg">
          <div className="rounded-full p-10 relative bg-black flex justify-center items-center text-white">
            <span className="absolute text-5xl font-bold">{initials}</span>
          </div>
          <form className="flex flex-col w-full">
            <div className="flex gap-3 py-5">
              <div className="w-1/3 border-none">
                <span>Staff</span>
                <div className="flex gap-1">
                  <StarSelector
                    indexSelected={staff}
                    setIndexSelected={setStaff}
                  />
                </div>
              </div>
              <div className="w-1/3 border-none">
                <span>Inmueble</span>
                <div className="flex gap-1">
                  <StarSelector
                    indexSelected={facilities}
                    setIndexSelected={setFacilities}
                  />
                </div>
              </div>
              <div className="w-1/3 border-none">
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
              className="border-[1.5px] border-stone-200 w-full rounded-lg p-5"
              name="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="3"
            ></textarea>

            <button
              onClick={
                handleSubmit
              }
              className="px-2 py-1 rounded-md bg-black self-end mt-3 w-40 h-12 font-bold text-white hover:bg-red-500 "
            >
              Enviar Reseña
            </button>
          </form>
        </div>
      </div>
      {ReviewsList({ id })}
    </div>
  );
}

function ReviewsList({ id }) {
  const [colors, setColors] = useState([]);

  const {
    data: { review } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["review/by-hotel", id],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/review/by-hotel/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },

  });

  useEffect(() => {
    if (isLoading || error) return; // si la data no esta cargada aun o hubo un error no hacemos nada

    if (colors.length === 0) { // dado que esto es 0 sabemos que es la orimera vez qye actualizamos colors por decir asi
      const generatedColors = review.map(() => generateRandomColor()) // por cada review, genera un color
      setColors(generatedColors); /// calendariza/schedule una re-render, y actualiza el state de colors.
      return;
    }
    const difference = review.length - colors.length

    const restNewColors = [...Array(difference)].map(() => generateRandomColor()); // alfi esra mla con esta linea

    console.log({ restNewColors }, restNewColors.length, review.length);
    setColors((prev) => [...prev, ...restNewColors]);


    // como generamos un color por cada review sabemos que
    // reviews.length === colors.length

  }, [isLoading, error, (review?.length || 0)]) // si uno de estos 3 campos cambia, la funcion correra de nuevo 


  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    console.log({ error });
    return <div>Error</div>
  }
  if (!review) {
    return <div>No reviews available</div>;
  }

  return (
    <div className=" p-5 flex flex-col space-y-4 w-full ">
      {review.map((rev, i) => {
        const averageRating = ((rev.rating_facilities + rev.rating_cleanliness + rev.rating_staff) / 3).toFixed(1);
        return (
          <Link
            to={`/review/${rev._id}`}
            key={rev._id}
            className=" flex-row rounded-xl  overflow-hidden border-[1.5px] border-stone-200 "
          >
            <div className="flex border-none p-2 place-items-center">
              {/* aqui accedemos al color por el id */}
              <div className="rounded-full mr-3 p-5 relative  flex justify-center items-center text-white"
                style={{ backgroundColor: colors[i] }}>

                <span className="absolute text-xl font-bold">{rev.user_id.name.at(0) + rev.user_id.lastname.at(0)}</span>
              </div>
              <h1 className="mr-3 font-bold">{rev.user_id.name + " " + rev.user_id.lastname}</h1>
              <FontAwesomeIcon
                className="text-[#EBB03C] text-2xl mr-2"
                icon={faStarSolid}
              />

              <h1>
                {averageRating}
              </h1>
              <h1></h1>
            </div>
            <div className="flex p-5 w-full max-w-full overflow-hidden border-none">
              <p className="">{rev.comment}</p>
            </div>
          </Link>
        );
      })}
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
function generateRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  const color = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;

  return color;
}

export default ReviewsContainer;

ReviewsList.propTypes = {
  id: PropTypes.string.isRequired,
}

StarSelector.propTypes = {
  indexSelected: PropTypes.number.isRequired,
  setIndexSelected: PropTypes.func.isRequired,
};

StarComponent.propTypes = {
  index: PropTypes.number.isRequired,
  indexHover: PropTypes.number,
  indexSelected: PropTypes.number,
  onHover: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

ReviewsContainer.propTypes = {
  id: PropTypes.string.isRequired,
  reviews: PropTypes.array.isRequired,
};
