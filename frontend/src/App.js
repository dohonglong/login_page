import { useState } from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import "./App.css";
import Greetings from "./components/Greetings";
import LoginManual from "./components/LoginManual";
import LoginGoogle from "./components/LoginGoogle";
import Register from "./components/Register";
import useLoginGoogle from "./custom-hooks/useLoginGoogle";
import useLogout from "./custom-hooks/useLogout";
import { Button } from "@mui/material";

const App = () => {
  const [user, setUser] = useState(null);

  const handleGoogleLogin = useLoginGoogle(setUser);
  const logout = useLogout(setUser);

  return (
    <div className="App">
      {user ? (
        <div>
          <h1>WELCOME, {user.username}</h1>
          <Button variant="contained" onClick={logout}>
            Logout
          </Button>
        </div>
      ) : (
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          <LoginGoogle handleGoogleLogin={handleGoogleLogin} />
        </nav>
      )}

      <Routes>
        <Route
          path="/"
          element={
            user ? <Navigate to="/greetings" /> : <Navigate to="/login" />
          }
        />
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
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/greetings" />}
        />
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
