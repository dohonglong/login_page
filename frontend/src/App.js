import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Greetings from "./components/Greetings";
import LoginManual from "./components/LoginManual";
import Register from "./components/Register";
import HotelBooking from "./components/HotelBooking";
import NavBar from "./components/NavBar/NavBar";

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />

      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="/hotels" /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/hotels" />
            ) : (
              <div>
                <LoginManual setUser={setUser} />
              </div>
            )
          }
        />
        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/hotels" />}
        />
        <Route
          path="/hotels"
          element={
            user ? <HotelBooking user={user} /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/greetings"
          element={user ? <Greetings /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
};

export default App;
