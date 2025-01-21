// useAuth.js
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // To decode the token

const useAuth = (setUser) => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        console.log(decodedUser); // You can remove this later, it's just for debugging
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error.message);
        localStorage.removeItem("token");
      }
    }
  }, [setUser]);
};

export default useAuth;
