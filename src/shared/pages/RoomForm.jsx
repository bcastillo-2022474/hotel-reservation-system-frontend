import { useMutation, useQueryClient } from "@tanstack/react-query";
import Navbar from "../components/Navbar.jsx"
import { useContext, useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { createPortal } from "react-dom";
import { API_URL } from "../../config.js";
import { toast } from "react-toastify";
import { UserContext } from "../../contexts/UserContext.jsx";
import Modal from "../components/Modal.jsx";

function RoomForm() {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    description: "",
    people_capacity: "",
    room_type: "",
    night_price: "",
    hotel: "",
  });
  const images = useRef([]);
  const portal = useRef(null);
  if (!portal.current) {
    portal.current = document.getElementById("portal-root");
  }

  const queryClient = useQueryClient();

  const imagesMutation = useMutation({
    mutationKey: ["room-images"],
    mutationFn: async ({ images }) => {
      const response = await fetch(`${API_URL}/roomImg/multiple`, {
        method: "POST",
        body: JSON.stringify({ images }),
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error((await response.json()).msg);
      }

      return response.json();
    },
    onSuccess: () => {
      toast("Images uploaded", {
        type: "success",
      });
    },
    onError: () => {
      toast("Error uploading images", {
        type: "error",
      });
    },
  });

  const mutation = useMutation({
    mutationKey: ["room-post"],
    mutationFn: async (room) => {
      const response = await fetch(`${API_URL}/room`, {
        method: "POST",
        body: JSON.stringify(room),
        headers: {
          "Content-Type": "application/json",
          "x-token": localStorage.getItem("token"),
        },
      });
      if (!response.ok) {
        throw new Error((await response.json()).msg);
      }

      return response.json();
    },
    onSuccess: ({ room }) => {
      imagesMutation.mutate({
        images: images.current.map((img) => {
          return {
            ...img,
            room_id: room._id,
          };
        }),
      });

      queryClient.invalidateQueries({
        queryKey: ["rooms"],
      });

      toast("Room created", {
        type: "success",
      });
    },
    onError: () => {
      toast("Error uploading a room", {
        type: "error",
      });
    },
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      setForm({
        description: "",
        people_capacity: "",
        room_type: "",
        night_price: "",
        hotel: "",
      });
    }

    if (mutation.isSuccess || mutation.isError) {
      setTimeout(() => {
        mutation.reset();
      }, 3000);
    }
  }, [mutation.isSuccess, mutation.isError]);

  useEffect(() => {
    if (imagesMutation.isSuccess) {
      images.current = [];
      setTimeout(() => {
        imagesMutation.reset();
      }, 3000);
    }
  }, [imagesMutation.isSuccess]);

  return (
    <div className="h-dvh flex flex-col gap-3 items-center">
      {showModal &&
        createPortal(
          <Modal
            onOutsideClick={() => {
              setShowModal(false);
            }}
            onClose={(imgs) => {
              images.current = imgs;
              setShowModal(false);
            }}
            images={images.current || []}
          />,
          portal.current,
        )}
      <Navbar />
      <div className="max-w-[1000px] w-full grow flex flex-col items-center">
        <h2 className="text-4xl font-bold px-2">Create Room</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate({ ...form, user_admin: user._id });
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
              {images.current.length === 0 && <FontAwesomeIcon icon={faPlus} />}
              {images.current.length > 0 && (
                <span>({images.current.length})</span>
              )}
            </button>
          </div>
          <button className="bg-black rounded text-white px-3 py-2 outline-none focus:outline-1 focus:outline-black outline-offset-1">
            <span>
              {mutation.isIdle && "Create room"}
              {mutation.isPending && (
                <>
                  <span>Creating...</span>
                  <span className="animate-spin size-[25px] border-4  border-b-neutral-900 border-t-slate-300 rounded-full" />
                </>
              )}
              {mutation.isError && "Error uploading room"}
              {mutation.isSuccess && (
                <>
                  <span>Room created</span>
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

export default RoomForm;
