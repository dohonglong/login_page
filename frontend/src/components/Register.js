import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

const Register = () => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name,
          last_name,
          username,
          password,
          email,
        }),
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
      window.location.reload();
      alert("Registration successful! Congratulations");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>REGISTER</h1>
      <Box
        component="form"
        onSubmit={handleRegister}
        className="login-register-box"
      >
        <TextField
          label="First name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={first_name}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <TextField
          label="Last name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={last_name}
          onChange={(event) => setLastName(event.target.value)}
        />
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
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: 2 }}
        >
          Register
        </Button>
      </Box>
    </div>
  );
};

export default Register;
