import { Navigate, Outlet } from "react-router-dom";
import { UserContext } from "../contexts/UserContext.jsx";
import { useContext, useEffect, useState } from "react";
import { API_URL } from "../config.js";
import { PropTypes } from "prop-types";

export const [CLIENT_ROLE, ADMIN_ROLE, ADMIN_PLATFORM_ROLE] = [
  "CLIENT_ROLE",
  "ADMIN_HOTEL_ROLE",
  "ADMIN_PLATFORM_ROLE",
];
export async function validateToken(token) {
  const response = await fetch(`${API_URL}/auth/token`, {
    headers: {
      "x-token": `${token}`,
    },
  });

  if (!response.ok) return null;

  return (await response.json()).data;
}

export async function getAdminHotelInfo(token) {
  const response = await fetch(`${API_URL}/auth/token/admin`, {
    headers: {
      "x-token": `${token}`,
    },
  });

  if (!response.ok) return null;

  return (await response.json()).data;
}

// THIS COMPONENT MUST BE THE PARENT CONTAINER
// OF EVERYTHING THAT REQUIRES USER AUTHENTICATION
export function UserValidation() {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      if (user) return;

      const token = localStorage.getItem("token");
      if (!token) return;

      const userData = await validateToken(token);
      console.log({ userData });
      if (userData) setUser(userData);
    }

    checkUser().then(() => setIsLoading(false));
  }, [user]);

  if (isLoading) return null; // O muestra un componente de carga

  return <Outlet />;
}

UserValidation.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export function PrivateClientRoute() {
  const { user } = useContext(UserContext);
  if (!user) return <Navigate to="/login" />;

  const isAuthorized =
    user && (user.role === CLIENT_ROLE || user.role === ADMIN_PLATFORM_ROLE);

  if (!isAuthorized && user) return <Navigate to="/admin" />;

  return isAuthorized ? <Outlet /> : <Navigate to="/signup" />;
}

PrivateClientRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export function PrivateAdminHotelRoute() {
  const { user } = useContext(UserContext);
  if (!user) return <Navigate to="/login" />;

  const isAuthorized =
    user && (user.role === ADMIN_ROLE || user.role === ADMIN_PLATFORM_ROLE);

  if (!isAuthorized && user) return <Navigate to="/admin" />;

  return isAuthorized ? <Outlet /> : <Navigate to="/signup" />;
}

PrivateAdminHotelRoute.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
