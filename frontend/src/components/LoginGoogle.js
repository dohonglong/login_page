import { GoogleLogin } from "@react-oauth/google";

const LoginGoogle = ({ handleGoogleLogin }) => {
  return (
    <GoogleLogin
      locale="en"
      onSuccess={handleGoogleLogin}
      onError={(error) => console.error("Login Error:", error)}
    />
  );
};

export default LoginGoogle;
