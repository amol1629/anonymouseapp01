import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import { createNewUser } from "../../api/createNewUser";
import LoadingOverlay from "../overlays/LoadingOverlay";
import {
  commonErrorToastMessage,
  commonSuccessToastMessage,
} from "../toastify/AllToastifyErrors";
import { getAllUsers } from "../../api/getAllUsers";

const CreateUserModal = ({ isOpen, onClose, onSave, setAllUsersDetails }) => {
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    designation: "",
    userProfileImage: "", // Store the image or URL here
  });

  const [fileChosenFromLocal, setFileChosenFromLocal] = useState(false);

  const [imagePreview, setImagePreview] = useState(null); // To preview the image
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const designations = [
    "Software Engineer",
    "Senior Software Engineer",
    "Associate QA Lead",
    "Product Manager",
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const validateEmail = (email) => {
    if (email === "") return ""; // No validation for empty field
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? "" : "Invalid email format.";
  };

  const validatePassword = (password) => {
    if (password === "") return ""; // No validation for empty field

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    return passwordRegex.test(password)
      ? ""
      : "Password must be at least 10 characters and include uppercase, lowercase, a number, and a symbol.";
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });

    if (e.target.name === "email") {
      setValidationErrors({
        ...validationErrors,
        email: validateEmail(e.target.value),
      });
    }
    if (e.target.name === "password") {
      setValidationErrors({
        ...validationErrors,
        password: validatePassword(e.target.value),
      });
    }
  };

  const handleDropdownSelect = (designation) => {
    setNewUser({ ...newUser, designation });
    setDropdownOpen(false);
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  // Handle image file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview
        setNewUser({ ...newUser, userProfileImage: reader.result }); // Store the image as base64
      };

      setFileChosenFromLocal(true);
      reader.readAsDataURL(file);
    }
  };

  // Handle image URL input
  const handleImageURLChange = (e) => {
    const url = e.target.value;
    setImagePreview(url); // Set the image preview
    setNewUser({ ...newUser, userProfileImage: url }); // Store the image URL
  };

  const handleSave = async () => {
    try {
      if (
        !newUser.firstName &&
        !newUser.lastName &&
        !newUser.email &&
        !newUser.password &&
        !newUser.designation
      ) {
        commonErrorToastMessage("Please enter user information");
        return;
      }

      if (!newUser.firstName) {
        commonErrorToastMessage("Please enter user's first name");
        return;
      }

      if (!newUser.lastName) {
        commonErrorToastMessage("Please enter user's last name");
        return;
      }

      if (!newUser.email) {
        commonErrorToastMessage("Please enter user's email");
        return;
      }

      if (!newUser.password) {
        commonErrorToastMessage("Please enter user's password");
        return;
      }

      if (!newUser.designation) {
        commonErrorToastMessage("Please select user's designation");
        return;
      }

      setIsLoading(true);
      const response = await createNewUser(newUser);

      console.log("New User Created : ", response);

      const getAllUsersResponse = await getAllUsers();

      console.log("All Users Details : ", getAllUsersResponse.data);

      setAllUsersDetails(getAllUsersResponse.data);

      sessionStorage.setItem(
        "allUsersDetails",
        JSON.stringify(getAllUsersResponse.data)
      );

      onSave(newUser);
      onClose();

      navigate("/adminhome");

      setIsLoading(false);
      setDropdownOpen(false);
      setIsPasswordVisible(false);
      setNewUser({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        designation: "",
        userProfileImage: "",
      });
      setImagePreview(null);

      commonSuccessToastMessage("User created successfully.");
    } catch (error) {
      setIsLoading(false);
      commonErrorToastMessage(error?.response?.data);
      console.log("Error while creating user : ", error);
    }
  };

  const handleClose = () => {
    setDropdownOpen(false);
    setIsPasswordVisible(false);
    setNewUser({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      designation: "",
      userProfileImage: "",
    });
    setImagePreview(null);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="createUser-modal-title"
      className="flex place-content-center items-center fixed  outline-none  animate-fadeSlideDown transition-all ease-in-out duration-500"
      // Disable clicking on the backdrop and Escape key
      BackdropProps={{
        style: { pointerEvents: "none" },
      }}
      disableEscapeKeyDown
    >
      <div className="bg-white shadow-lg text-[#212529]  rounded-lg animate-fadeSlideDown  transition-all ease-in-out duration-1000  w-4/5 md:w-1/3 p-6">
        <h2 className=" font-bold mb-4 text-2xl text-center">
          Create New User
        </h2>
        <div className="flex flex-col mb-4">
          {/* First Name */}
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="border rounded-lg px-2 py-1 mb-6"
            value={newUser.firstName}
            onChange={handleInputChange}
          />

          {/* Last Name */}
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="border rounded-lg px-2 py-1 mb-6"
            value={newUser.lastName}
            onChange={handleInputChange}
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={`border rounded-lg px-2 py-1 flex-grow  ${
              validationErrors.email ? "" : "mb-6"
            } `}
            value={newUser.email}
            onChange={handleInputChange}
          />
          {/* Add error message display for email */}
          {validationErrors.email && (
            <p className="text-red-400 mb-6 text-sm  animate-fade-slide-down transition-all ease-in-out duration-500">
              <span>
                <i className="fa-solid fa-circle-exclamation"></i>
              </span>
              <span className="ps-2">{validationErrors.email}</span>
            </p>
          )}

          {/* Password */}
          <div className="flex ">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              placeholder="Password"
              className={`border rounded-lg px-2 py-1 flex-grow ${
                validationErrors.password ? "" : "mb-6"
              }`}
              value={newUser.password}
              onChange={handleInputChange}
            />
            {newUser?.password?.length >= 1 ? (
              <Tooltip
                key={isPasswordVisible ? "visible" : "hidden"}
                title={isPasswordVisible ? "Hide Password" : "Show Password"}
                arrow
                placement="top"
                TransitionComponent={Zoom}
                TransitionProps={{ timeout: 300 }}
              >
                <span
                  className="ml-[-40px] mr-[0px] mt-[5px] px-3 cursor-pointer text-slate-700 animate-fade-slide-down hover:opacity-60 transition-all ease-in-out duration-500"
                  onClick={togglePasswordVisibility}
                  key={isPasswordVisible ? "visible" : "hidden"}
                >
                  {isPasswordVisible ? (
                    <i className="fa-solid fa-eye cursor-pointer "></i>
                  ) : (
                    <i className="fa-solid fa-eye-slash cursor-pointer "></i>
                  )}
                </span>
              </Tooltip>
            ) : (
              ""
            )}
          </div>
          {/* Display error message for password */}
          {validationErrors.password && (
            <p className="text-red-400 mb-6 text-sm pt-1 animate-fade-slide-down transition-all ease-in-out duration-500">
              <span>
                <i className="fa-solid fa-circle-exclamation"></i>
              </span>
              <span className="ps-2">{validationErrors.password}</span>
            </p>
          )}

          {/* Designation */}
          {/* Add Designation Dropdown similar to your implementation in AdminHomePage */}
          <div className="relative col-span-2" ref={dropdownRef}>
            <div
              className="cursor-pointer border rounded-lg px-2 py-1 flex justify-between hover:bg-purple-50"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <p>{newUser.designation || "Select Designation"}</p>
              <p>
                <i className="fa-solid fa-sort-down pb-1"></i>
              </p>
            </div>
            {dropdownOpen && (
              <div className="absolute border rounded-lg bg-white z-10 w-full animate-fadeSlideDown transition-all ease-in-out  duration-1000">
                {designations.map((designation, index) => (
                  <div
                    key={index}
                    className="px-2 py-1 hover:bg-purple-100 hover:rounded-lg cursor-pointer transition-all ease-in-out  duration-500"
                    onClick={() => handleDropdownSelect(designation)}
                  >
                    {designation}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="my-4">
            <label className="block text-gray-700 mb-2">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              className="mb-4"
              onChange={handleImageUpload}
            />

            <input
              type="text"
              placeholder="Or paste image URL"
              className="border rounded-lg px-2 py-1 w-full"
              onChange={handleImageURLChange}
              value={newUser.userProfileImage}
            />
            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-24 h-24 object-cover rounded-full border"
                />
              </div>
            )}
          </div>
        </div>

        <div className="flex place-content-center gap-12">
          <Tooltip
            title="Cancel"
            arrow
            placement="top"
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 300 }}
          >
            <button
              className="mt-4 px-6 py-1 bg-[#ffe3e3]   text-[#D33A2C] font-semibold rounded-lg  transition-all ease-in-out duration-500 hover:shadow hover:shadow-[#fcaba0]  border border-red-400 "
              onClick={handleClose}
            >
              Cancel
            </button>
          </Tooltip>

          <Tooltip
            title="Save"
            arrow
            placement="top"
            TransitionComponent={Zoom}
            TransitionProps={{ timeout: 300 }}
          >
            {validationErrors.email || validationErrors.password ? (
              <button
                disabled
                className={` cursor-not-allowed opacity-60 rounded-lg mt-4 px-6 py-1  font-semibold bg-[#c2fbd7]  transition-all ease-in-out  duration-500 text-[#1a582a]`}
                onClick={handleSave}
              >
                Save
              </button>
            ) : (
              <button
                className={`rounded-lg mt-4 px-6 py-1 hover:opacity-90 font-semibold bg-[#c2fbd7] hover:bg-[#b0fccd] hover:shadow hover:shadow-[#79b992] transition-all ease-in-out  duration-500 text-[#1a582a]  border border-green-500`}
                onClick={handleSave}
              >
                Save
              </button>
            )}
          </Tooltip>
        </div>
        {/* Loading overlay */}
        {isLoading && <LoadingOverlay />}
      </div>
    </Modal>
  );
};

export default CreateUserModal;
