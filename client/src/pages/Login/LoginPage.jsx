// Importing necessary modules and components
import React, { useEffect, useState, useRef } from "react";

import { styled } from "@mui/material/styles";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { Tooltip, Zoom } from "@mui/material";

import loginLogoImage from "../../assets/images/productsTeamLogo.png";
import { login, userLogin } from "../../api/userLogin";
import { commonErrorToastMessage } from "../../components/toastify/AllToastifyErrors";
import { adminLogin } from "../../api/adminLogin";
import { getAllUsers } from "../../api/getAllUsers";
import LoadingOverlay from "../../components/overlays/LoadingOverlay";
import UserRegistration from "../Registration/UserRegistration";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

// LoginPage component
const LoginPage = () => {
  // Clear the session storage
  sessionStorage.clear();

  const navigate = useNavigate();

  // State for isSignup
  const [isSignup, setIsSignup] = useState(false);

  // State for Loading Overlay
  const [isLoading, setIsLoading] = useState(false);

  // New state variable for isAdmin
  const [isAdmin, setIsAdmin] = useState(false);

  sessionStorage.setItem("isAdmin", isAdmin);

  // State for user data (email and password)
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // Function to handle isAdmin click
  const handleAdminClick = () => {
    setIsAdmin(true);
    // You can add additional logic here if needed
  };

  // Function to handle isAdmin click
  const handleUserClick = () => {
    setIsAdmin(false);
    // You can add additional logic here if needed
  };

  // Function to handle email input change
  const handleEmailChange = (e) => {
    const { value } = e.target;
    setUserData({ ...userData, email: value });

    // Validate Email and set errors
    // handleEmailValidationAndSetErrors(value, setErrors);
  };

  // Function to handle password input change
  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setUserData({ ...userData, password: value });

    // Validate Password
    // handlePasswordValidationAndSetErrors(value, setErrors);
  };

  // User Login Function
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await userLogin(userData.email, userData.password);

      console.log("User Login Response : ", response);

      // Convert userDetails object to JSON string and store it in session storage
      sessionStorage.setItem(
        "userDetails",
        JSON.stringify(response?.data?.userDetails)
      );

      setIsLoading(false);
      navigate("/home");
    } catch (error) {
      console.log("Error while login : ", error);
      commonErrorToastMessage(
        "Uh oh, access denied. Check your username or password."
      );
      setIsLoading(false);
    }
  };

  // Admin Login Function
  const handleAdminLogin = async () => {
    try {
      setIsLoading(true);

      const response = await adminLogin(userData.email, userData.password);

      console.log("Admin Login Response : ", response);

      // const allUsersDetails = await getAllUsers();

      // // console.log("All Users Details : ", allUsersDetails.data);

      // // Convert allUserDetails object to JSON string and store it in session storage
      // sessionStorage.setItem(
      //   "allUsersDetails",
      //   JSON.stringify(allUsersDetails.data)
      // );

      // Convert userDetails object to JSON string and store it in session storage
      sessionStorage.setItem(
        "adminDetails",
        JSON.stringify(response?.data?.adminDetails)
      );

      setIsLoading(false);

      navigate("/adminhome");
    } catch (error) {
      console.log("Error while login : ", error);
      commonErrorToastMessage(
        "Uh oh, access denied. Check your username or password."
      );
      setIsLoading(false);
    }
  };

  const handleRegesterHere = () => {
    setIsSignup(true);
  };

  // Function to handle login click
  const handleLoginHere = () => {
    setIsSignup(false);
  };

  return (
    <div className={`login-background ${isSignup ? "h-auto" : "h-[100vh]"}`}>
      <div className="  w-full">
        {/* Container for image and text */}
        <div className=" ">
          <div className="p-2 flex align-middle items-center animate-fade-slide-down transition-all ease-in-out duration-500 ">
            <img
              src={loginLogoImage}
              alt=""
              className="login-logo-image rounded-full "
            />
            <p className="products-team-name-logo font-bold px-3 text-xl">
              Products Team
            </p>
          </div>

          {/* https://www.businessmanager.in/wp-content/uploads/2022/04/Effective-Team-Work.jpg */}
          {/* Login text */}
          <div className="my-0    animate-fade-slide-down transition-all ease-in-out duration-500">
            <div className="px-4 my-2 flex align-middle items-center place-content-center justify-center  mx-2 transition-all ease-in-out duration-500">
              <p className="text-center  text-2xl ">
                <span className="pe-2 text-purple-600">
                  <i class="fa-solid fa-quote-left"></i>
                </span>
                <span className="leading-relaxed italic">
                  Documentation is the backbone of project management. It serves
                  as a roadmap, a history book, and a source of truth all in
                  one.
                </span>

                <span className="ps-2 text-purple-600">
                  <i class="fa-solid fa-quote-right "></i>
                </span>
              </p>
            </div>
          </div>

          <div className="flex animate-fade-slide-down transition-all ease-in-out duration-500">
            <div className="w-1/2 rounded-lg hidden md:contents">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/002/737/799/small_2x/online-registration-illustration-concept-free-vector.jpg"
                alt=""
                className="h-[70vh] w-1/3 m-auto rounded-lg"
              />
            </div>

            {isSignup ? (
              <div className="my-8 backdrop-effect py-6 md:py-0 shadow hover:shadow-lg md:w-1/2 w-full my-8  rounded-lg login-details  flex justify-center  animate-fade-slide-down  flex-col align-middle mx-auto  item border-gray-300 transition-all ease-in-out duration-500">
                <UserRegistration
                  isSignup={isSignup}
                  onLoginClick={handleLoginHere}
                />
              </div>
            ) : (
              <div className="backdrop-effect py-6 md:py-0 shadow hover:shadow-lg md:w-1/2 w-full my-8 md:my-0  rounded-lg login-details  flex justify-center  animate-fade-slide-down  flex-col align-middle mx-auto  item border-gray-300 transition-all ease-in-out duration-500">
                {/* For Admin */}
                {isAdmin ? (
                  <div className="login-title text-center mb-6  font-bold ">
                    <p className="   text-4xl h-12">Admin Login</p>
                  </div>
                ) : (
                  <div className="login-title text-center mb-6  font-bold ">
                    <p className="   text-4xl h-12">User Login</p>
                  </div>
                )}

                {/* Login Title */}
                {/* <div className="login-title text-center text-[50px] text-white font-bold  mb-12  ">
                <p className="w-1/2 mx-auto login-title-text italic">
                  "From Concept to Clarity: Documenting Product Journeys"
                </p>
              </div> */}

                <div className="w-3/4 mx-auto  ">
                  <div className="">
                    {/* Email input */}
                    <p className="mb-3">
                      <input
                        className="w-full border border-[#afc1ff] p-2 outline-none  rounded-xl"
                        placeholder={isAdmin ? "Admin username" : "Username"}
                        value={userData.email}
                        onChange={handleEmailChange}
                      />
                    </p>

                    {/* Password input */}
                    <p className="mb-3">
                      <input
                        className="w-full border border-[#afc1ff] p-2 outline-none  rounded-xl"
                        placeholder={isAdmin ? "Admin password" : "Password"}
                        type="password"
                        value={userData.password}
                        onChange={handlePasswordChange}
                      />
                    </p>
                  </div>

                  {isAdmin ? (
                    <div className="mb-3 font-semibold  text-sm flex items-center text-center place-content-end ">
                      <p className="transition-all ease-in-out  duration-500 admin-user-signup-text">
                        <span className=" ">Are you a user? </span>
                        <Tooltip
                          title="Login as User"
                          arrow
                          placement="top"
                          TransitionComponent={Zoom}
                          TransitionProps={{ timeout: 300 }}
                        >
                          <span
                            className="text-purple-700 cursor-pointer  underline hover:no-underline transition-all ease-in-out  duration-500"
                            onClick={handleUserClick}
                          >
                            Login here
                          </span>
                        </Tooltip>
                      </p>
                    </div>
                  ) : (
                    <div className="mb-3 font-semibold  text-sm flex items-center text-center place-content-end ">
                      <p className="transition-all ease-in-out  duration-500">
                        <span className=" ">Are you a admin? </span>
                        <Tooltip
                          title="Login as Admin"
                          arrow
                          placement="top"
                          TransitionComponent={Zoom}
                          TransitionProps={{ timeout: 300 }}
                        >
                          <span
                            className="text-purple-700 cursor-pointer  underline hover:no-underline transition-all ease-in-out  duration-500"
                            onClick={handleAdminClick}
                          >
                            Login here
                          </span>
                        </Tooltip>
                      </p>
                    </div>
                  )}

                  {/* Login button */}
                  <div className=" flex items-center text-center place-content-center">
                    <Tooltip
                      title={isAdmin ? "Admin Login" : "User Login"}
                      arrow
                      placement="top"
                      TransitionComponent={Zoom}
                      TransitionProps={{ timeout: 300 }}
                    >
                      <button
                        className={`rounded-lg  px-2 py-2 hover:opacity-90 font-semibold bg-[#f7e8ff] border  border-purple-800 hover:bg-[#f1dafd] hover:shadow hover:shadow-[#d897f3] transition-all ease-in-out  duration-500 text-purple-800 `}
                        onClick={isAdmin ? handleAdminLogin : handleLogin}
                      >
                        {isAdmin ? (
                          <span className=" font-bold mx-16">ADMIN LOGIN</span>
                        ) : (
                          <span className=" font-bold mx-16">USER LOGIN</span>
                        )}
                      </button>
                    </Tooltip>
                  </div>

                  {/* Sign up link */}
                  {!isAdmin && (
                    <div className="text-center mt-7 text-sm">
                      <p>
                        <span className="font-semibold">
                          Don't have account ?{" "}
                        </span>
                        <button
                          className="text-blue-700 font-semibold"
                          onClick={handleRegesterHere}
                        >
                          Register Here{" "}
                        </button>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading overlay */}
      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default LoginPage;
