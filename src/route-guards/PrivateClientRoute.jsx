import { Route, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext.jsx";
import { useContext, useEffect, useState } from "react";

async function validateToken(token) {
  // Llama al servidor con el token para validar y obtener la información del usuario
  // Devuelve la información del usuario si el token es válido, de lo contrario devuelve null
}

function PrivateClientRoute({ children, ...rest }) {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      if (user) return;

      const token = localStorage.getItem("token");
      if (!token) return;

      const userData = await validateToken(token);
      if (userData) setUser(userData);
    }

    checkUser().then(() => setIsLoading(false));
  }, [user]);

  if (isLoading) {
    return null; // O muestra un componente de carga
  }

  return (
    <Route
      {...rest}
      render={() => {
        return user && user.role === "client" ? (
          children
        ) : (
          <Navigate to="/login" />
        );
      }}
    />
  );
}

export default PrivateClientRoute;
