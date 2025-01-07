import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Greetings from "./Greetings";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  if (!token) {
    return (
      <div>
        <Login
          setToken={(token) => {
            setToken(token);
            localStorage.setItem("token", token);
          }}
        />
        <Register />
      </div>
    );
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
      <Greetings token={token} />
    </div>
  );
};

export default App;
