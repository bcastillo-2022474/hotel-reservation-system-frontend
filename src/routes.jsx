import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./shared/pages/Login.jsx";
import Signup from "./shared/pages/Signup.jsx";
import Dashboard from "./client-module/dashboard/Dashboard.jsx";
import AdminDashboard from "./admin-module/dasboard/AdminDashboard.jsx";
import HotelAdmin from "./admin-module/dasboard/HotelAdmin.jsx"
import {
  PrivateClientRoute,
  PrivateAdminHotelRoute,
  UserValidation,
  validateToken,
  ADMIN_ROLE,
  CLIENT_ROLE,
  ADMIN_PLATFORM_ROLE,
} from "./route-guards/PrivateClientRoute.jsx";
import Hotel from "./client-module/hotel/Hotel.jsx";
import Room from "./client-module/room-by-hotel-id/Room.jsx";
import BookingOfLoggedUser from "./client-module/booking-by-user-id/BookingOfLoggedUser.jsx";
import CreateHotel from "./shared/pages/CreateHotel.jsx";

import RoomForm from "./shared/pages/RoomForm.jsx"

import HotelContainer from "./platform-module/hotel/HotelContainer.jsx";
import User from "./admin-module/users/Users.jsx";
import SignupHotel from "./shared/pages/signup-hotel/SignupHotel.jsx";
import BookingsByHotelId from "./admin-module/dasboard/BookingByHotelId.jsx"

const handleRedirect = async () => {
  const token = localStorage.getItem("token");
  if (!token) return redirect("/login");
  const user = await validateToken(token);
  if (!user) return redirect("/login");

  const isHotelAdmin = user.role === ADMIN_ROLE;
  if (isHotelAdmin) return redirect("/admin");

  const isClient = user.role === CLIENT_ROLE;
  if (isClient) return redirect("/dashboard");

  const isPlatformAdmin = user.role === ADMIN_PLATFORM_ROLE;
  if (isPlatformAdmin) return redirect("/dashboard");
};
export const router = createBrowserRouter([
  {
    path: "",
    // works as a middleware to check if user is authenticated
    element: <UserValidation />,
    children: [
      {
        path: "/",
        loader: handleRedirect,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signup/hotel",
        element: <SignupHotel />,
      },
      {
        path: "",
        element: <PrivateClientRoute />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/hotel/:id",
            element: <Hotel />,
          },
          {
            path: "/room/:id",
            element: <Room />,
          },
          {
            path: "/room/form",
            element: <RoomForm/>,
          },
          {
            path: "/me/bookings",
            element: <BookingOfLoggedUser />,
          },
        ],
      },
      {
        path: "",
        element: <PrivateAdminHotelRoute />,
        children: [
          // {
          //   path: "/admin",
          //   element: <AdminDashboard />,
          // },
          {
            path: "/admin",
            element: <HotelContainer />,
          },
          {
            path: "/admin/bookings/by-hotel/:id",
            element: <BookingsByHotelId />,
          },
        ],
      },
      {
        path: "hotel/create",
        element: <CreateHotel />,
      },
      {
        path: "/admin/hotel",
        element: <HotelContainer />,
      },
      {
        path: "users",
        element: <User />,
      },
      {
        path: "/hotel/by-user/:id",
        elment: <HotelAdmin/>,
      },
    ],
  },
]);
