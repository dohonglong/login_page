import { Button, TextField, Box } from "@mui/material";
import LoginGoogle from "./LoginGoogle";
import useLoginManual from "../custom-hooks/useLoginManual";
import useLoginGoogle from "../custom-hooks/useLoginGoogle";

const LoginManual = ({ setUser }) => {
  const { formLogin, handleInputLoginChange, handleManualLogin } =
    useLoginManual(setUser);

  const handleGoogleLogin = useLoginGoogle(setUser);

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
          type="password"
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
        <LoginGoogle handleGoogleLogin={handleGoogleLogin} />
      </Box>
    </div>
  );
};

export default LoginManual;
