import { createContext, useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL_V1;

const AuthContext = createContext();

export const UseAuthContext = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));

    if (auth?.user && auth?.accessToken) {
      setUser(auth.user);
      setAccessToken(auth.accessToken);
    }

    setLoading(false);
  }, []);

  const login = async (payload) => {
    try {
      const { data: res } = await axios.post(apiUrl + "/auth/signin", payload);

      localStorage.setItem(
        "auth",
        JSON.stringify({
          accessToken: res?.data.token,
          user: res?.data.user,
        })
      );

      setUser(res?.data?.user);
      setAccessToken(res?.data?.token);

      return res;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("auth");

    setUser("");
    setAccessToken("");
  };

  const values = {
    login,
    logout,
    user,
    accessToken,
  };

  return (
    <AuthContext.Provider value={values}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

AuthProvider.propTypes = {
  children: PropTypes.node,
};
