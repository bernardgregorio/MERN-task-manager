import PropTypes from "prop-types";
import { createContext, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useLocalStorage("auth", false);
  const [pageTitle, setPageTitle] = useLocalStorage("pageTitle", "Dashboard");
  const [pageData, setPageData] = useState({});

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, pageTitle, setPageTitle, pageData, setPageData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
