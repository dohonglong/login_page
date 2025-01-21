import { googleLogout } from "@react-oauth/google";

const useLogout = (setUser) => {
  const logout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("token");
  };

  return logout;
};

export default useLogout;
