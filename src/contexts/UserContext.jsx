import { createContext, useState } from "react";
import PropTypes from "prop-types";

// Step 1: Create a new context
export const UserContext = createContext();

// Step 2: Create a provider component
export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);

  // The value that will be shared with other shared
  const value = {
    user,
    setUser,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook that will be used by other shared to access the context
