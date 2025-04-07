import { Outlet } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";

export const AppRouter = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};
