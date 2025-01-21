import { useState, useEffect } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // To decode the token and extract user info
import Greetings from "./components/Greetings";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

const App = () => {
  // const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);
  //const [profile, setProfile] = useState(null);

  // Restore user from token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token); // Decode the token to get user info
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error.message);
        localStorage.removeItem("token"); // Clear invalid token
      }
    }
  }, []);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const response = await axios.post("api/google-login", {
        token: credentialResponse.credential,
      });
      console.log("Backend Login Success:", response.data);
      setUser(response.data.user); // Set the user returned from the backend
    } catch (error) {
      console.error(
        "Google Login Failed:",
        error.response?.data || error.message
      );
    }
  };

  // Handle logout
  const logout = () => {
    googleLogout();
    // setToken(null);
    setUser(null);
    //setProfile(null);
    localStorage.removeItem("token");
  };

  return (
    <div className="App">
      {/* Navbar and logout condition */}
      {user ? (
        <div>
          <h1>WELCOME, {user.username}</h1>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <GoogleLogin
            locale="en"
            onSuccess={handleGoogleLogin}
            onError={(error) => console.error("Login Error:", error)}
          />
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
                <Login setUser={setUser} />
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
