/**
 * Author : Amol Rathod
 */

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

/**
 * A higher-order component that checks if the user is authenticated before rendering the content.
 * If authenticated, it allows rendering child routes using `<Outlet />`.
 * If not authenticated, it redirects the user to the login page and preserves the current location.
 *
 * @component
 * @example
 * // In a protected route:
 * <RequireAuth />
 */
const RequireAuth = () => {
  // Fetch the authentication status using the custom useAuth hook
  const { auth } = useAuth();

  // Get the current location
  const location = useLocation();

  // Retrieve the authentication token from localStorage
  const token = localStorage.getItem("token");

  // If a valid token is present, render child routes using Outlet
  if (token) {
    return <Outlet />;
  } else {
    // If no token is found, redirect the user to the login page
    // and provide the current location as a state to enable redirection back
    return token ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    );
  }
};

// Export the RequireAuth component as the default export
export default RequireAuth;

// Use only one from these
// import { Navigate, Outlet, useLocation } from "react-router-dom";
// import useAuth from "../hooks/useAuth";

// const RequireAuth = () => {
//   const { auth } = useAuth();


//   const location = useLocation();

//   let token = localStorage.getItem('token')

//   return token ? (
//     <Outlet />
//   ) : (
//     <Navigate to="/" state={{ from: location }} replace />
//   );
// };

// export default RequireAuth;
