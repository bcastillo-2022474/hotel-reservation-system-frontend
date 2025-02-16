import {
  ADMIN_ROLE,
  validateToken,
} from "../../route-guards/PrivateClientRoute.jsx";
import { redirect } from "react-router-dom";

export const loadHotelIdByUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const user = await validateToken(token);

  if (user.role === ADMIN_ROLE) {
    return { id: user.hotels[0]._id };
  }

  // if user is a PLATFORM admin, it may have more than one hotel
  // so we are gonna redirect to the hotel list page
  return redirect("/hotels");
};
