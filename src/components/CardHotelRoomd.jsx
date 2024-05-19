import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../index.css";
import { Link } from "react-router-dom";

function toPriceNumber(num) {
  return [...`${num}`].toReversed().reduce((str, num, i) => {
    if (i % 3 === 0 && i !== 0) return `${num},` + str;
    return num + str;
  }, "");
}

const CardHotelRoom = ({
  description,
  people_capacity,
  night_price,
  room_type,
  hotel,
  img,
  rating,
  quantity_people_rated,
  _id,
}) => {
  let stars = [];

  for (let i = 0; i < 4; i++) {
    if (i + 1 < rating) stars.push(true);
    else stars.push(false);
  }

  if (quantity_people_rated < 3) {
    stars = [true, true, true, false, false];
  }

  console.log({ img }, _id === "6646e1081a53d529acddf58b");

  return (
    <Link
      to={`/hotel/${hotel}`}
      className="bg-white h-flex w-full mt-2 shadow-2xl rounded-xl flex flex-col md:flex-row md:h-40 p-2"
    >
      <div className="w-full h-40 md:max-w-64 md:h-full overflow-hidden relative">
        <img
          src={img}
          className="w-full h-full object-cover rounded-lg"
          alt=""
        />
      </div>
      <div className="bg-white grow h-full p-3">
        {stars.map((isPainted, i) => {
          if (isPainted)
            return (
              <FontAwesomeIcon
                key={i}
                className="text-[#EBB03C] text-2xl"
                icon={faStar}
              />
            );
          return <FontAwesomeIcon key={i} icon={faStar} className="text-2xl" />;
        })}
        <h1 className="font-bold text-2xl">
          Un hotel de {rating || 3} estrellas
        </h1>
        <p className="text-gray-400">{description}</p>
      </div>
      <div className="bg-stone-200 grow h-full rounded-lg w-full md:max-w-[250px] md:w-flex">
        <div className="flex h-2/3 p-2">
          <p className="text-gray-400 m-3 mb-4 ">Desde</p>
          <h1 className="font-bold text-4xl mt-2 mr-2">
            {toPriceNumber(night_price)}Q
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

export default CardHotelRoom;
