import { useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const useLoginGoogle = (setUser) => {
  // Handle Google login
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await axios.post("/api/google-login", {
        token: credentialResponse.credential,
      });
      setUser(response.data.user);
    } catch (error) {
      console.error(
        "Google Login Failed:",
        error.response?.data || error.message
      );
    }
  };

  // Restore user state from localStorage or token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error.message);
        localStorage.removeItem("token");
      }
    }
  }, [setUser]);

  return handleGoogleLogin;
};

export default useLoginGoogle;
