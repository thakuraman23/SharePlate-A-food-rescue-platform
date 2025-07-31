import { Navigate } from "react-router";

const ProtectedRoute = ({ children, allowedType }) => {
  const userType = localStorage.getItem("type");

  if (!userType || userType !== allowedType) {
    return <Navigate to={`/${allowedType}/login`} replace />;
  }

  return children;
};

export default ProtectedRoute;
