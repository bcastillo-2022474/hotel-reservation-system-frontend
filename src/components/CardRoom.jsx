import PropTypes from "prop-types";

export default function CardRoom({ room }) {
  const {
    description,
    people_capacity,
    night_price,
    tipo_habitacion,
    updated_at,
    // hotel_id,
    images,
  } = room;
  return (
    <div className="bg-white rounded-3xl shadow-md p-5 w-fit cursor-pointer">
      <div className="flex flex-col gap-1">
        <div>
          <img
            src={images.find((image) => image.is_main_image).url}
            alt={description}
            className="w-full h-48 object-cover rounded-3xl"
          />
        </div>
        <div>
          <h1 className="text-xl font-bold text-neutral-600">{description}</h1>
          <div>
            <p className="text-lg flex gap-2">
              <span className="font-bold">Tipo habitación:</span>
              <span>{tipo_habitacion}</span>
            </p>
            <p className="text-lg flex gap-2">
              <span className="font-bold">Capacidad:</span>
              <span>{people_capacity}</span>
            </p>
          </div>
          <p className="text-2xl flex gap-3">
            <span className="font-bold">Precio por noche:</span>
            <span>{night_price}</span>
          </p>
          <p className="text-neutral-600">{updated_at}</p>
        </div>
        <div className="flex gap-2 font-bold">
          <button className="px-3 py-2 bg-yellow-300 rounded outline-button focus:outline-yellow-300">
            Editar
          </button>
          <button className="px-3 py-2 bg-red-500 rounded outline-button focus:outline-red-500">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

CardRoom.propTypes = {
  room: PropTypes.shape({
    description: PropTypes.string,
    people_capacity: PropTypes.number,
    night_price: PropTypes.number,
    tipo_habitacion: PropTypes.string,
    updated_at: PropTypes.string,
    hotel_id: PropTypes.number,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        is_main_image: PropTypes.bool,
        url: PropTypes.string,
      }),
    ),
  }),
};
