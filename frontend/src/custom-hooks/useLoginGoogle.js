import { useState } from "react";
import axios from "axios";

const useLoginGoogle = () => {
  const [user, setUser] = useState(null);

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

  return { user, setUser, handleGoogleLogin };
};

export default useLoginGoogle;
