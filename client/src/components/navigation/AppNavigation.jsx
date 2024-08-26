import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
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

const navigation = [
  { name: "Dashboard", href: "/adminhome", current: true },
  { name: " New Project", href: "#", current: false },
  { name: "History", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AppNavigation() {
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

  // / Determine user details and image URL
  let userDetails = "";
  let username = "";
  let imageUrl = "";

  // Convert byte array to string
  const byteArrayToString = (byteArray) => {
    return byteArray ? String.fromCharCode(...byteArray) : null;
  };

  if (isAdmin) {
    userDetails = JSON.parse(sessionStorage.getItem("adminDetails"));
  } else {
    userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  }

  username = `${userDetails?.firstName} ${userDetails?.lastName}`;
  imageUrl = byteArrayToString(userDetails?.userProfileImage);

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
    isAdmin ? navigate("/adminhome") : navigate("/home");
  };

  const handleNavigateToUserInfo = () => {
    navigate("/userinfo");
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
    fetchAllUsersData();
  }, []); // Empty dependency array ensures this runs once on mount
  const fetchAllUsersData = async () => {
    try {
      const response = await getAllUsers();
      setAllUsersDetails(response.data);

      console.log("All Users Details : ", response.data);

      // Store the data in session storage as well
      sessionStorage.setItem("allUsersDetails", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="  px-2 sm:px-6 lg:px-6">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-lg p-2 text-gray-400 hover:bg-gray-700 hover:text-white hover:rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white  focus:rounded-full  transition-all ease-in-out duration-300">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div
                  className="flex flex-shrink-0 items-center cursor-pointer"
                  onClick={handleLogoClick}
                >
                  <img
                    className="h-8 sm:mr-6 lg:mr-4 w-auto rounded-full"
                    src={logo}
                    alt="Products Document"
                  />

                  {isAdmin ? (
                    <p className="hidden sm:block products-team-name  text-white text-xl">
                      Products Team Admin
                    </p>
                  ) : (
                    <p className="hidden sm:block products-team-name  text-white text-xl">
                      Products Team
                    </p>
                  )}
                </div>

                <div className="hidden sm:ml-16 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <p
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-lg px-3 py-2 text-sm font-medium cursor-pointer transition-all ease-in-out duration-300"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 ">
                <Tooltip
                  title="View Notification"
                  arrow
                  placement="top"
                  TransitionComponent={Zoom}
                  TransitionProps={{ timeout: 300 }}
                >
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-all ease-in-out duration-300"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </Tooltip>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-8">
                  <div>
                    <Menu.Button className="relative flex items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 transition-all ease-in-out duration-300">
                      <img
                        className="h-8 w-8 rounded-full"
                        src={imageUrl}
                        alt=""
                      />

                      <span className="hidden sm:block text-white px-4 ">
                        {username}
                      </span>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <p
                            className={classNames(
                              active ? "hover:bg-purple-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 cursor-pointer rounded-lg transition-all ease-in-out duration-500"
                            )}
                            onClick={handleNavigateToUserInfo}
                          >
                            Your Profile
                          </p>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <p
                            className={classNames(
                              active ? "hover:bg-purple-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 cursor-pointer rounded-lg transition-all ease-in-out duration-500"
                            )}
                          >
                            Settings
                          </p>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <p
                            className={classNames(
                              active ? "hover:bg-purple-100" : "",
                              "block px-4 py-2 text-sm text-gray-700 cursor-pointer rounded-lg transition-all ease-in-out duration-500"
                            )}
                            onClick={handleLogout}
                          >
                            {/* Logout */}
                            Logout
                          </p>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-lg px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>

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
        </>
      )}
    </Disclosure>
  );
}
