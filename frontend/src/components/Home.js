import React from "react";
import Greetings from "./Greetings";
import { Link } from "react-router-dom";

const Home = ({ token, setToken }) => {
  return (
    <div>
      {!token ? (
        <div>
          <Link to="/login">Login</Link>
          {"            "}
          <Link to="/register">Register</Link>
        </div>
      ) : (
        <Greetings token={token} />
      )}
    </div>
  );
};

export default Home;
