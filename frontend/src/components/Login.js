import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

const Login = ({ setUser }) => {
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
      if (!response.ok) throw new Error("Login failed");
      const data = await response.json();

      localStorage.setItem("token", data.token);
      setUser(data);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <Box
        component="form"
        onSubmit={handleManualLogin}
        className="login-register-box"
      >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          label="Password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;
