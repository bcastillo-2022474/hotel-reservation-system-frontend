import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

function CreateHotel({
  onModalClose,
  images,
  onSubmit,
  isIdle,
  isPending,
  isError,
  isSuccess,
}) {
  const [form, setForm] = useState({
    name: "",
    country: "",
    address: "",
    description: "",
  });
  const [showModal, setShowModal] = useState(false);
  const portal = useRef(null);
  if (!portal.current) {
    portal.current = document.getElementById("portal-root");
  }

  return (
    <div className="h-dvh flex flex-col gap-3 items-center">
      {showModal &&
        createPortal(
          <Modal
            onOutsideClick={() => {
              setShowModal(false);
            }}
            onClose={(imgs) => {
              onModalClose(imgs);
              setShowModal(false);
            }}
            images={images || []}
          />,
          portal.current,
        )}
      <div className="max-w-[1000px] w-full grow flex flex-col items-center">
        <h2 className="text-4xl font-bold px-2">Create Hotel Form</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(form);
            // mutate({ ...form, user_admin: user._id });
          }}
          className="flex flex-col gap-3 min-h-[80%] justify-between p-3 w-full max-w-[700px]"
        >
          <div className="flex flex-col gap-3">
            {Object.keys(form).map((key, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  className="px-3 py-2 border rounded"
                  placeholder={key}
                  value={form[key]}
                  onChange={(e) => {
                    setForm({ ...form, [key]: e.target.value });
                  }}
                />
              );
            })}
            <button
              type="button"
              onClick={() => {
                setShowModal(true);
              }}
              className="px-3 py-2 bg-gray-500 text-white rounded flex gap-3 items-center justify-center"
            >
              <span>Agregar imagenes</span>
              {images.length === 0 && <FontAwesomeIcon icon={faPlus} />}
              {images.length > 0 && <span>({images.length})</span>}
            </button>
          </div>
          <button className="bg-black rounded text-white px-3 py-2 outline-none focus:outline-1 focus:outline-black outline-offset-1">
            <span>
              {isIdle && "Crear hotel"}
              {isPending && (
                <>
                  <span>Creating...</span>
                  <span className="animate-spin size-[25px] border-4  border-b-neutral-900 border-t-slate-300 rounded-full" />
                </>
              )}
              {isError && "Error uploading hotel"}
              {isSuccess && (
                <>
                  <span>Hotel created</span>
                  <FontAwesomeIcon icon={faCheck} />
                </>
              )}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateHotel;

CreateHotel.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isIdle: PropTypes.bool.isRequired,
  isPending: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  isSuccess: PropTypes.bool.isRequired,
};
