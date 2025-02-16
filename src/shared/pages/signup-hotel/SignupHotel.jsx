import { useEffect, useRef, useState } from "react";
import SignupUser from "./SignupUser.jsx";
import CreateHotel from "../../components/CreateHotel.jsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { postImages } from "../../fetchs/postImages.js";
import { API_URL } from "../../../config.js";
import { useNavigate } from "react-router-dom";
import { login } from "../../fetchs/login.js";
function SignupHotel() {
  const [part, setPart] = useState(1);
  const [images, setImages] = useState([]);
  const userForm = useRef({
    name: "",
    email: "",
    password: "",
  });

  const hotelForm = useRef({
    name: "",
    country: "",
    address: "",
    description: "",
  });
  const [finishLoading, setFinishLoading] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: ({ token }) => {
      localStorage.setItem("token", token);
    },
  });

  const imagesMutation = useMutation({
    mutationKey: ["hotel-images"],
    mutationFn: postImages,
    onSuccess: () => {
      toast("Images uploaded", {
        type: "success",
      });

      // try login
      loginMutation.mutate({
        email: userForm.current.email,
        password: userForm.current.password,
      });
    },
    onError: () => {
      toast("Error uploading images", {
        type: "error",
      });
    },
  });

  const mutationSignup = useMutation({
    mutationKey: ["signup-hotel"],
    mutationFn: async ({ hotel, user }) => {
      const response = await fetch(`${API_URL}/auth/signup/hotel`, {
        method: "POST",
        body: JSON.stringify({
          hotel,
          user,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error((await response.json()).msg);
      }

      return response.json();
    },
    onSuccess: ({ hotel }) => {
      toast("Hotel created", {
        type: "success",
      });

      imagesMutation.mutate({
        images: images.map((img) => {
          return {
            ...img,
            hotel_id: hotel._id,
          };
        }),
      });

      queryClient.invalidateQueries({
        queryKey: ["hotels"],
      });
    },
    onError: () => {
      toast("Error uploading hotel", {
        type: "error",
      });
    },
  });

  useEffect(() => {
    if (!mutationSignup.isError) return;
    setTimeout(() => {
      mutationSignup.reset();
    }, 3000);
  }, [mutationSignup.isError]);

  useEffect(() => {
    if (loginMutation.isSuccess) {
      setFinishLoading(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [loginMutation.isSuccess]);

  return (
    <>
      <div
        className={`transition-[width] duration-700 h-2 bg-blue-300 ${part === 1 && "w-5"} ${part === 2 && "w-1/2"} ${finishLoading && "w-full"}`}
      ></div>
      {part === 1 && (
        <SignupUser
          onSave={(form) => {
            userForm.current = { ...userForm.current, ...form };
            setPart(2);
          }}
        />
      )}{" "}
      {part === 2 && (
        <div className="py-5">
          <CreateHotel
            images={images}
            onModalClose={(imgs) => {
              setImages(imgs);
            }}
            isSuccess={mutationSignup.isSuccess}
            isPending={mutationSignup.isPending}
            isIdle={mutationSignup.isIdle}
            isError={mutationSignup.isError}
            onSubmit={(form) => {
              hotelForm.current = { ...hotelForm.current, ...form };
              mutationSignup.mutate({
                hotel: hotelForm.current,
                user: userForm.current,
              });
            }}
          />
        </div>
      )}
    </>
  );
}

export default SignupHotel;
