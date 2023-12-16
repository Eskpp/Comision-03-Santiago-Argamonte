import { createContext, useContext, useEffect, useState } from "react";
import { registerReq, loginReq, verifyToken } from "../api/auth.js";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Error en el contexto del usuario");
  return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [isAuth, setIsAuth] = useState(false);

  const [errors, setErrors] = useState([]);

  const signup = async (user) => {
    try {
      const res = await registerReq(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginReq(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuth(true);
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data);
    }
  };

  const signout = () => {
    Cookies.remove("token");
    setIsAuth(false);
    setUser(null);
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function verifyLogin() {
      const cookies = Cookies.get();
      console.log(cookies);
      if (cookies.token) {
        try {
          const res = await verifyToken(cookies.token);
          if (res.data) {
            setIsAuth(true);
            setUser(res.data);
          } else {
            setIsAuth(false);
          }
        } catch (error) {
          console.log(error);
          setIsAuth(false);
          setUser(null);
        }
      }
    }
    verifyLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        user,
        isAuth,
        errors,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
