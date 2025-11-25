import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const token = sessionStorage.getItem("token"); // <-- changed here

  if (!token) return <Navigate to="/login" />;

  return children;
};

export default ProtectedRoute;
