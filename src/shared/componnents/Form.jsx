import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { API_URL } from "../../config.js"
import Navbar from "./Navbar.jsx";


function formCreate({ /*id*/ }) {
  const [form, setForm] = useState({
    description: "",
    people_capacity: "",
    night_price: "",
    room_type: "",
    hotel: "",
  });


  const mutation = useMutation({
    mutationKey: ["createRoom"],
    mutationFn: async (room) => {
      const response = await fetch(`${API_URL}/room`, {
        method: "POST",
        body: JSON.stringify(room),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error((await response.json()).msg);
      }

      return response.json();
    },
  });

  return (
    <div className="h-dvh flex flex-col gap-3 items-center">
      <Navbar />
      <div className="bg-sky-200 max-w-[1000px] w-full grow flex flex-col items-center">
        <h2 className="text-4xl font-bold px-2 m-3">Room form</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="flex bg-red-200 flex-col gap-3 min-h-[80%] justify-between p-3 w-full max-w-[1000px]"
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
          </div>
          <button className="bg-black rounded text-white px-3 py-2 outline-none focus:outline-1 focus:outline-black outline-offset-1">
            Crear form 
          </button>
        </form>
      </div>
    </div>
  );
}

export default formCreate;