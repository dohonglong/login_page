import { Button, TextField, Box } from "@mui/material";
import useRegister from "../custom-hooks/useRegister";

const Register = () => {
  const { formRegistration, handleInputRegistrationChange, handleRegister } =
    useRegister();

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
          name="first_name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formRegistration.first_name}
          onChange={handleInputRegistrationChange}
        />
        <TextField
          label="Last name"
          name="last_name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formRegistration.last_name}
          onChange={handleInputRegistrationChange}
        />
        <TextField
          label="Username"
          name="username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formRegistration.username}
          onChange={handleInputRegistrationChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formRegistration.password}
          onChange={handleInputRegistrationChange}
        />
        <TextField
          label="Email"
          name="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formRegistration.email}
          onChange={handleInputRegistrationChange}
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
