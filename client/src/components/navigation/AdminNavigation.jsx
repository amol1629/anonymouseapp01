import React from "react";
import { useState, useRef } from "react";
import { useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/images/productsTeamLogo.png";

import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import LoadingOverlay from "../overlays/LoadingOverlay";
import CreateUserModal from "../modals/CreateUserModal";
import { getAllUsers } from "../../api/getAllUsers";
import ShowAllUsersModal from "../modals/ShowAllUsersModal";

const AdminNavigation = () => {
  const navigate = useNavigate();

  const isAdmin = sessionStorage.getItem("isAdmin") === "true";

  // State variable to control the open/close state of the create user modal
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  // Show All Users in Tabular Format
  const [isShowAllUsersModalOpen, setIsShowAllUsersModalOpen] = useState(false);

  // State for Dark Mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const [allUsersDetails, setAllUsersDetails] = useState([]);

  let userDetails = "";
  let username;

  if (isAdmin) {
    userDetails = JSON.parse(sessionStorage.getItem("adminDetails"));
    username = `${userDetails?.firstName} ${userDetails?.lastName}`;
  } else {
    userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
    username = `${userDetails?.firstName} ${userDetails?.lastName}`;
  }

  const [showMenu, setShowMenu] = useState(false);

  const [logoutDialog, setLogoutDialog] = useState(false);

  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);

  const [menuAnimation, setMenuAnimation] = useState("");

  // Function to handle clicks outside the dropdown container
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    // Event listener added for clicks outside the dropdown container
    document.addEventListener("click", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const handleShowAllUsersModalOpen = () => {
    setIsShowAllUsersModalOpen(true);
  };

  const handleShowAllUsersModalClose = () => {
    setIsShowAllUsersModalOpen(false);
  };

  // Enhanced toggleMenu function with animation
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setMenuAnimation(showMenu ? "fadeOut" : "fadeIn");
  };

  // Function to toggle the visibility of the dropdown when clicking on "Username"
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Function to navigate
  const handleAccountInfo = () => {
    navigate("/accountinfo");
  };

  // Function to navigate
  const handleLogoClick = () => {
    navigate("/home");
  };

  // Function to handle the logout
  const handleLogout = async () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      navigate("/");
    } catch (error) {
      console.log("Error while logout : ", error);
      setLogoutDialog(true);
    }
  };

  // Function to handle the opening the modal for create user
  const handleCreateUserModalOpen = () => {
    setIsCreateUserModalOpen(true);
  };

  // Function to handle closing the modal for deleting user
  const handleCreateUserModalClose = () => {
    setIsCreateUserModalOpen(false);
  };

  // Newly created user details coming from 'CreateNewUser' page
  const handleSaveNewUser = (newUserData) => {
    console.log("Admin Page : ", newUserData);
    // Implement the logic to save the new user data
  };

  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);

  const toggleHamburgerMenu = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchAllUsersData = async () => {
      try {
        const response = await getAllUsers();
        setAllUsersDetails(response.data);

        console.log("All Users Details : ", response.data);

        // Store the data in session storage as well
        sessionStorage.setItem(
          "allUsersDetails",
          JSON.stringify(response.data)
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchAllUsersData();
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div>
      <div className="animate-fade-slide-down">
        {/* Navigation  bar starts here */}

        {/* <nav className="bg-[#2e718b]  p-4 flex justify-between items-center md:flex sm:grid"> */}
        <nav className="banner-bg  p-4 flex justify-between items-center md:flex sm:grid">
          <div className="flex items-center cursor-pointer">
            {/* Logo */}
            <Tooltip
              title="Go to home"
              arrow
              placement="top"
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 300 }}
            >
              <div className="flex align-middle items-center">
                <img
                  src={logo}
                  alt=""
                  className="login-logo-image rounded-full"
                />
                {isAdmin ? (
                  <p className="products-team-name px-3 text-white text-xl">
                    Products Team Admin
                  </p>
                ) : (
                  <p className="products-team-name px-3 text-white text-xl">
                    Products Team
                  </p>
                )}
              </div>
            </Tooltip>
          </div>

          {/* Hamburger Icon */}
          <div
            className="md:hidden cursor-pointer"
            onClick={toggleHamburgerMenu}
          >
            <i className="fa fa-bars"></i> {/* Using Font Awesome icon here */}
          </div>

          {/* Menu items */}
          <div className={`md:flex ${isHamburgerOpen ? "block" : "hidden"}`}>
            <ul className="md:flex  space-x-4 ">
              {/* Dropdown menu for "Username" starts here */}
              {/* New Project */}
              <li className="nav-item">
                <button className="nav-button">
                  <i class="fa-solid fa-file-circle-plus"></i> New Project
                </button>
              </li>

              {/* <li className="nav-item">
                <button
                  className="nav-button"
                  onClick={handleCreateUserModalOpen}
                >
                  <i class="fa-solid fa-circle-plus"></i> Create User
                </button>
              </li> */}

              {/* Show All Users */}
              {/* {isAdmin ? (
                <li className="nav-item">
                  <button
                    className="nav-button"
                    onClick={handleShowAllUsersModalOpen}
                  >
                    <i class="fa-solid fa-users"></i> All Users
                  </button>
                </li>
              ) : (
                ""
              )} */}

              {/* History */}
              <li className="nav-item">
                <button className="nav-button">
                  <i class="fa-solid fa-clock-rotate-left"></i> History
                </button>
              </li>

              <li className=" relative text-start">
                <div className="relative" ref={dropdownRef}>
                  <button
                    className="dropdown-nav-buttons "
                    onClick={toggleDropdown}
                  >
                    <span className="hover:opacity-80">
                      <i class="me-2 fa-solid fa-user"></i>
                      {username} <i class="ms-1 fa-solid fa-caret-down"></i>
                    </span>
                    {/* Dropdown will appear when you click on "Username" */}
                    {showDropdown && (
                      <div className="absolute dropdown top-12 right-0 w-[170px] bg-white text-black rounded-xl shadow-lg ]">
                        <ul className="py-2 bg-white rounded-xl">
                          {/* Share Your Feedback */}

                          {/* Account Info */}
                          <li
                            className="px-4 py-2 hover:text-[#2f3668]  hover:bg-gray-100 hover:rounded-3xl cursor-pointer"
                            onClick={handleAccountInfo}
                          >
                            Account Info
                          </li>

                          {/* Logout */}
                          <li
                            className="px-4 py-2 hover:text-[#2f3668] hover:bg-gray-100 hover:rounded-3xl cursor-pointer"
                            onClick={handleLogout}
                          >
                            Logout
                          </li>
                        </ul>
                      </div>
                    )}
                    {/* Dropdown menu for "Username" ends here */}
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </nav>

        {/* Navigation bar ends here */}

        {/* Create User Modal */}
        <CreateUserModal
          isOpen={isCreateUserModalOpen}
          onClose={handleCreateUserModalClose}
          onSave={handleSaveNewUser}
          setAllUsersDetails={setAllUsersDetails}
        />

        {/* Create User Modal */}
        <ShowAllUsersModal
          isOpen={isShowAllUsersModalOpen}
          onClose={handleShowAllUsersModalClose}
          // onSave={handleSaveNewUser}
          setAllUsersDetails={setAllUsersDetails}
          users={allUsersDetails}
        />

        {/* Loading overlay */}
        {isLoading && <LoadingOverlay />}
      </div>
    </div>
  );
};

export default AdminNavigation;
