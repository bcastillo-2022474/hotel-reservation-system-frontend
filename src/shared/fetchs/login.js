import { API_URL } from "../../config.js";

export const login = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error((await response.json()).msg);
  }

  return response.json();
};
