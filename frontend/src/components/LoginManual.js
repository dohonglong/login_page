import { Button, TextField, Box } from "@mui/material";
import useLoginManual from "../custom-hooks/useLoginManual";

const LoginManual = ({ setUser }) => {
  const { username, setUsername, password, setPassword, handleManualLogin } =
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

export default LoginManual;
