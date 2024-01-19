import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {

     const confirmLogout = window.confirm("Are you sure you want to log out?");
    
     if (confirmLogout) {
     // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
     }
  };

  return { logout };
};
