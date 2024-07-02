import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import { useAuth } from "../context/authContext";
import "./Header.css";

const Header = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, isAdmin, logout } = useAuth();
  const navigateTo = useNavigate();

  const handleLogoutStudent = async () => {
    try {
      const response = await axios.get(
        "https://projectmanagerbackend-mern.onrender.com/api/v1/student/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      logout();
      navigateTo("/student/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleLogoutAdmin = async () => {
    try {
      const response = await axios.get(
        "https://projectmanagerbackend-mern.onrender.com/api/v1/admin/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      logout();
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container pr-10 flex items-center justify-between">
        <div className="logo">
          <img src="/spmlogo1.png" alt="logo" />
        </div>
        <ul className={!show ? "menu hidden md:flex" : "show-menu menu flex flex-col md:flex-row"}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-white"
              }
              onClick={() => setShow(false)}
            >
              HOME
            </NavLink>
          </li>
          {!isAuthorized && (
            <>
              <li>
                <NavLink
                  to="/student/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-400 hover:text-white"
                  }
                  onClick={() => setShow(false)}
                >
                  STUDENT LOGIN
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-400 hover:text-white"
                  }
                  onClick={() => setShow(false)}
                >
                  SIGNUP
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 border-b-2 border-blue-500"
                      : "text-gray-400 hover:text-white"
                  }
                  onClick={() => setShow(false)}
                >
                  ADMIN
                </NavLink>
              </li>
            </>
          )}
          {isAuthorized && (
            <>
              {isAdmin && (
                <li>
                  <NavLink
                    to="/project/all"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-400 hover:text-white"
                    }
                    onClick={() => setShow(false)}
                  >
                    ALL PROJECT
                  </NavLink>
                </li>
              )}
              {isAuthorized && (
                <li>
                  <NavLink
                    to="/notice/all"
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 border-b-2 border-blue-500"
                        : "text-gray-400 hover:text-white"
                    }
                    onClick={() => setShow(false)}
                  >
                    NOTICE
                  </NavLink>
                </li>
              )}
              {!isAdmin && (
                <>
                  <li>
                    <NavLink
                      to="/project/my"
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-500 border-b-2 border-blue-500"
                          : "text-gray-400 hover:text-white"
                      }
                      onClick={() => setShow(false)}
                    >
                      MY PROJECT
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-500 border-b-2 border-blue-500"
                          : "text-gray-400 hover:text-white"
                      }
                      onClick={() => setShow(false)}
                    >
                      DASHBOARD
                    </NavLink>
                  </li>
                </>
              )}
              {!isAdmin && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={handleLogoutStudent}
                >
                  LOGOUT
                </button>
              )}
              {isAuthorized && isAdmin && (
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-md"
                  onClick={handleLogoutAdmin}
                >
                  LOGOUT
                </button>
              )}
            </>
          )}
        </ul>
        <div className="hamburger md:hidden">
          <GiHamburgerMenu onClick={() => setShow(!show)} className="text-white cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Header;
