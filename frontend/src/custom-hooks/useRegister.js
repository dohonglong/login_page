import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useRegister = () => {
  const [formRegistration, setFormRegistration] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
  });

  const navigate = useNavigate();

  const handleInputRegistrationChange = async (event) => {
    const { name, value } = event.target;
    setFormRegistration((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formRegistration),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.error === "Username is already in use.") {
          alert(
            "The username is already in use. Please choose a different one."
          );
        } else if (data.error === "All fields are required.") {
          alert("Please fill in all required fields.");
        } else {
          throw new Error(data.error || "Registration failed.");
        }
        window.location.reload();
        return;
      }
      alert("Registration successful! Congratulations");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return {
    formRegistration,
    handleInputRegistrationChange,
    handleRegister,
  };
};

export default useRegister;
