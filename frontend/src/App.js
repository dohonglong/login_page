//import { useEffect } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
//import { jwtDecode } from "jwt-decode"; // To decode the token and extract user info
import Greetings from "./components/Greetings";
import LoginManual from "./components/LoginManual";
import Register from "./components/Register";
import "./App.css";
import useLoginGoogle from "./custom-hooks/useLoginGoogle";
import useLogout from "./custom-hooks/useLogout";
import useAuth from "./custom-hooks/useAuth";

const App = () => {
  const { user, setUser, handleGoogleLogin } = useLoginGoogle();
  const logout = useLogout(setUser);

  useAuth(setUser);

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
                <LoginManual setUser={setUser} />
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
