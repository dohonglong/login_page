import { useState } from "react";

const useLoginManual = (setUser) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleManualLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.error === "Invalid username or password.") {
          alert("Invalid username or password. Please try again");
        } else if (data.error === "Username and password are required.") {
          alert("Username and password cannot be empty. Please try again");
        } else {
          throw new Error(data.error || "Login failed.");
        }
        window.location.reload();
        return;
      }
      localStorage.setItem("token", data.token);
      setUser(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleManualLogin,
  };
};

export default useLoginManual;
