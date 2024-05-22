import { useRef, useState } from "react";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

function Modal({ onOutsideClick, onClose, images: imagesDefault }) {
  const [images, setImages] = useState(imagesDefault);
  const [mainInput, setMainInput] = useState("");
  const mainInputRef = useRef(null);

  return (
    <div className="h-dvh w-full absolute top-0 z-50 flex flex-col justify-center items-center">
      <div
        onClick={() => {
          onOutsideClick(images);
        }}
        className="absolute h-full w-full bg-black/50"
      ></div>
      <div className="p-5 z-10 h-[80%]">
        <div className="border p-5 bg-white flex h-full flex-col gap-4">
          <h2 className="text-4xl">Agregar Imagenes</h2>
          <div
            className="flex flex-col gap-3 overflow-y-scroll h-full"
            style={{
              scrollbarWidth: "none",
            }}
          >
            {images.map((image, index) => {
              return (
                <form
                  key={index}
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!e.target[0].value) return;
                    setImages(
                      images.map((img, i) => {
                        if (i === index) {
                          return {
                            ...img,
                            image_url: e.target[0].value,
                          };
                        }
                        return img;
                      }),
                    );
                    mainInputRef.current.focus();
                  }}
                  className="flex gap-5"
                >
                  <input
                    type="text"
                    className="px-3 py-2 border rounded bg-gray-400 text-white placeholder:text-slate-200 col-span-4"
                    placeholder="Agrega tu imagen url aqui"
                    defaultValue={image.image_url}
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 border rounded bg-gray-400 text-white shrink-0"
                  >
                    Editar
                  </button>
                  <button
                    className="px-3 py-2 border rounded bg-red-400 text-white shrink-0"
                    onClick={() => {
                      setImages(images.filter((_, i) => i !== index));
                    }}
                  >
                    <FontAwesomeIcon icon={faRemove} />
                  </button>
                </form>
              );
            })}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!e.target[0].value) return;
                setImages([
                  ...images,
                  {
                    image_url: e.target[0].value,
                    // first image is always the main image
                    is_main_image: images.length === 0,
                  },
                ]);
                setMainInput("");
                mainInputRef.current.focus();
              }}
              className="flex gap-5"
            >
              <input
                ref={mainInputRef}
                type="text"
                className="px-3 py-2 border rounded bg-gray-400 text-white placeholder:text-slate-200 col-span-4"
                placeholder="Agrega tu imagen url aqui"
                value={mainInput}
                onChange={(e) => {
                  setMainInput(e.target.value);
                }}
                autoFocus
              />
              <button
                type="submit"
                className="px-3 py-2 border rounded bg-gray-400 text-white shrink-0"
              >
                Agregar
              </button>
            </form>
          </div>
          <button
            onClick={() => {
              onClose(images);
            }}
            type="button"
            className="px-3 py-2 bg-black outline-none text-white"
          >
            Subir imagenes
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;

Modal.propTypes = {
  onOutsideClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image_url: PropTypes.string.isRequired,
      is_main_image: PropTypes.bool.isRequired,
    }),
  ),
};
