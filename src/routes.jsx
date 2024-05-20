import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "./shared/pages/Login.jsx";
import Signup from "./shared/pages/Signup.jsx";
import Dashboard from "./client-module/dashboard/Dashboard.jsx";
import AdminDashboard from "./admin-module/dasboard/AdminDashboard.jsx";
import PrivateClientRoute, {
  UserValidation,
  validateToken,
} from "./route-guards/PrivateClientRoute.jsx";
import Hotel from "./client-module/hotel/Hotel.jsx";
import Room from "./client-module/room/Room.jsx";

const handleRedirect = async () => {
  const token = localStorage.getItem("token");
  if (!token) return redirect("/login");
  const user = await validateToken(token);
  if (!user) return redirect("/login");

  const isAdmin = user.role === "admin";
  if (isAdmin) return redirect("/admin");

  return redirect("/dashboard");
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
        path: "/dashboard",
        element: <PrivateClientRoute />,
        children: [
          {
            element: <Dashboard />,
            path: "",
          },
        ],
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
        path: "/admin",
        element: <AdminDashboard />,
      },
    ],
  },
]);
