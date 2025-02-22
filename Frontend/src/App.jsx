import React, { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import FloatingShapes from "./Components/FloatingShapes";
import Navbar from "./Components/Navbar";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Help from "./Components/Help"; // ✅ Ensure this exists
import Home from "./Components/Home";
import EmailVerification from "./Components/EmailVerification";
import axios from "axios";

const RedirectAuthenticatedUser = ({ children }) => {
  const [isAuthen, setIsAuthen] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          "http://localhost:4000/api/auth/check-auth"
        );

        if (response.data.success) {
          setIsAuthen(true);
        } else {
          setIsAuthen(false);
        }
      } catch (error) {
        console.error("Auth Check Failed:", error);
        setIsAuthen(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthen === null) {
    return <div>Loading...</div>; // Show loading while checking auth
  }

  return isAuthen ? <Navigate to="/home" replace /> : children;
};

const ProtectedRoutes = ({ children }) => {
  const [isAuth, setisAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          "http://localhost:4000/api/auth/check-auth"
        );

        if (response.data.success) {
          setisAuth(true);
        } else {
          setisAuth(false);
        }
      } catch (error) {
        console.log("error in auth at protectedRoute");
        setisAuth(false);
      }
    };

    checkAuth();
  });

  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return isAuth ? children : <Navigate to="/login" replace />;
};

const Layout = () => {
  return (
    <div className="min-h-screen  overflow-hidden">
      <Outlet />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>Page not found</div>,
    children: [
      {
        path: "/",
        element: (
          <RedirectAuthenticatedUser>
            <Signup />
          </RedirectAuthenticatedUser>
        ),
      },
      {
        path: "/login",
        element: (
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>
        ),
      },
      {
        path: "/home",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      { path: "/verify-Email", element: <EmailVerification /> },
      { path: "/help", element: <Help /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
