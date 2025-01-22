import { Button, TextField, Box } from "@mui/material";
import useLoginManual from "../custom-hooks/useLoginManual";

const LoginManual = ({ setUser }) => {
  const { formLogin, handleInputLoginChange, handleManualLogin } =
    useLoginManual(setUser);

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
          name="username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formLogin.username}
          onChange={handleInputLoginChange}
        />
        <TextField
          label="Password"
          name="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={formLogin.password}
          onChange={handleInputLoginChange}
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

export default LoginManual;
