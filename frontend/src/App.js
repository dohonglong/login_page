import React, { useState } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import Greetings from "./components/Greetings";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

const App = () => {
  // const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  //const [profile, setProfile] = useState(null);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/google-login",
        {
          token: credentialResponse.credential,
        }
      );
      console.log("Backend Login Success:", response.data);
      setUser(response.data.user); // Set the user returned from the backend
    } catch (error) {
      console.error(
        "Google Login Failed:",
        error.response?.data || error.message
      );
    }
  };

  // Handle Google login
  // const login = useGoogleLogin({
  //   onSuccess: (response) => {
  //     console.log("Login Response:", response);
  //     setUser(response);
  //   },
  //   onError: (error) => console.log("Login Failed:", error),
  // });

  // Fetch user profile once user is logged in
  // useEffect(() => {
  //   if (user?.access_token) {
  //     axios
  //       .get("https://www.googleapis.com/oauth2/v3/userinfo", {
  //         headers: {
  //           Authorization: `Bearer ${user.access_token}`,
  //         },
  //       })
  //       .then((response) => {
  //         console.log("User Profile: ", response.data);
  //         setProfile(response.data);
  //       })
  //       .catch((error) => console.log("Failed to fetch profile:", error));
  //   }
  // }, [user]);

  // Handle logout
  const logout = () => {
    googleLogout();
    // setToken(null);
    setUser(null);
    //setProfile(null);
    // localStorage.removeItem("token");
  };

  // const responseMessage = (response) => {
  //   console.log("Login Success: ", response);
  //   //const userToken = response.credential; // Extract token
  //   setToken(response);
  //   localStorage.setItem("token", response);
  // };
  // const errorMessage = (error) => {
  //   console.log("Error: ", error);
  // };

  return (
    <div className="App">
      {/* Navbar and logout condition */}
      {user ? (
        <div>
          <h1>WELCOME, {user.name}</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      )}

      <Routes>
        {/* Home route, redirect to login if no token */}
        <Route
          path="/"
          element={
            user ? <Navigate to="/greetings" /> : <Navigate to="/login" />
          }
        />
        {/* Login route */}
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/greetings" />
            ) : (
              <div>
                <h1>Login Page</h1>
                <Login />
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={(error) => console.error("Login Error:", error)}
                />
              </div>
            )
          }
        />
        {/* Register route */}
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/greetings" />}
        />
        {/* Greetings route */}
        <Route
          path="/greetings"
          element={
            user ? (
              <Greetings user={user} logout={logout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
