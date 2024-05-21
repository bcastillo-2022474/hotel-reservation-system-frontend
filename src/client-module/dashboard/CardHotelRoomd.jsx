import { faHeart, faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartSolid,
  faStar as faStarSolid,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../index.css";
import { Link } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { API_URL } from "../../config.js";
import { UserContext } from "../../contexts/UserContext.jsx";
import { useContext } from "react";
import PropTypes from "prop-types";

function toPriceNumber(num) {
  return [...`${num}`].toReversed().reduce((str, num, i) => {
    if (i % 3 === 0 && i !== 0) return `${num},` + str;
    return num + str;
  }, "");
}

function getText(text, highlightedText) {
  if (!text.toLowerCase().includes(highlightedText?.toLowerCase() ?? ""))
    return text;
  if (!highlightedText) return text;
  // text before the highlighted text
  const beforeText = text.slice(
    0,
    text.toLowerCase().indexOf(highlightedText.toLowerCase()),
  );
  // text highlighted
  const textHighlighted = text.slice(
    text.toLowerCase().indexOf(highlightedText.toLowerCase()),
    text.toLowerCase().indexOf(highlightedText.toLowerCase()) +
      highlightedText.length,
  );
  // text after the highlighted text
  const afterText = text.slice(
    text.toLowerCase().indexOf(highlightedText.toLowerCase()) +
      highlightedText.length,
  );

  return (
    <>
      <span>{beforeText}</span>
      <span className="dark:bg-teal-300 bg-violet-500 text-black">
        {textHighlighted}
      </span>
      <span>{afterText}</span>
    </>
  );
}

const CardHotelRoom = ({
  description,
  night_price,
  hotel,
  img,
  rating,
  quantity_people_rated,
  _id,
  favorite,
  inputSearch,
}) => {
  let stars = [];

  for (let i = 0; i < 4; i++) {
    if (i + 1 < rating) stars.push(true);
    else stars.push(false);
  }

  if (quantity_people_rated < 3) {
    stars = [true, true, true, false, false];
  }

  console.log({ favorite });
  const { user } = useContext(UserContext);
  const queryClient = useQueryClient();

  const postMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/favorite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ hotel, user: user._id }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });

      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_URL}/favorite`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ hotel, user: user._id }),
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["feed"],
      });

      queryClient.invalidateQueries({
        queryKey: ["favorites"],
      });
    },
  });

  return (
    <Link
      to={`/hotel/${hotel}`}
      className="bg-white h-flex w-full mt-2 shadow-2xl rounded-xl flex flex-col md:flex-row md:h-40 p-2"
    >
      <div className=" w-full h-40 md:max-w-64 md:h-full overflow-hidden relative">
        <FontAwesomeIcon
          onClick={(e) => {
            e.preventDefault();
            if (favorite) {
              deleteMutation.mutate();
            } else postMutation.mutate();
          }}
          className="absolute top-5 left-5 text-2xl text-red-600"
          icon={favorite ? faHeartSolid : faHeart}
        />
        <img
          src={img}
          className="w-full h-full object-cover rounded-lg"
          alt=""
        />
      </div>
      <div className="bg-white grow h-full p-3">
        {stars.map((isPainted, i) => {
          return (
            <FontAwesomeIcon
              key={i}
              className="text-[#EBB03C] text-2xl"
              icon={isPainted ? faStarSolid : faStar}
            />
          );
        })}
        <h1 className="font-bold text-2xl">
          Un hotel de {rating || 3} estrellas
        </h1>
        <p className="text-gray-400">{getText(description, inputSearch)}</p>
      </div>
      <div className="bg-stone-200 grow h-full rounded-lg w-full md:max-w-[250px] md:w-flex">
        <div className="flex h-2/3 p-2">
          <p className="text-gray-400 m-3 mb-4 ">Desde</p>
          <h1 className="font-bold text-4xl mt-2 mr-2">
            {getText(toPriceNumber(night_price), inputSearch)}Q
          </h1>
        </div>
        <div className="w-full h-12 md:h-1/3 flex flex-col">
          <Link
            to={`/room/${_id}`}
            className="bg-teal-400 w-full flex justify-center items-center text-white font-bold h-full rounded-lg hover:bg-stone-900"
          >
            Ver precios
          </Link>
        </div>
      </div>
    </Link>
  );
};

CardHotelRoom.propTypes = {
  description: PropTypes.string.isRequired,
  people_capacity: PropTypes.number.isRequired,
  night_price: PropTypes.number.isRequired,
  room_type: PropTypes.string.isRequired,
  hotel: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  quantity_people_rated: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  inputSearch: PropTypes.string.isRequired,
};

export default CardHotelRoom;
