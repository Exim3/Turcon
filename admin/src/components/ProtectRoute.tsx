// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../utils/AuthContext";
// // Adjust the path based on your file structure

// interface ProtectedRouteProps {
//   element: JSX.Element;
//   requiredRole?: string; // Optional: specify a required role for additional authorization
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
//   element,
//   requiredRole,
// }) => {
//   const { authToken, user } = useAuth();

//   if (!authToken) {
//     // If no token, redirect to login page
//     return <Navigate to="/login" replace />;
//   }

//   if (requiredRole && user?.role !== requiredRole) {
//     // If a specific role is required and the user does not have it, redirect to unauthorized page
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return element;
// };

// export default ProtectedRoute;
