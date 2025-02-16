import { API_URL } from "../../config.js";

export const postHotel = async (hotel) => {
  const response = await fetch(`${API_URL}/hotel`, {
    method: "POST",
    body: JSON.stringify(hotel),
    headers: {
      "Content-Type": "application/json",
      "x-token": localStorage.getItem("token"),
    },
  });
  if (!response.ok) {
    throw new Error((await response.json()).msg);
  }

  return response.json();
};
