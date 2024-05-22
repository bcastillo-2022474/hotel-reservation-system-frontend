import { API_URL } from "../../config.js";

export const postImages = async ({ images }) => {
  const response = await fetch(`${API_URL}/hotelImg/multiple`, {
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
};
