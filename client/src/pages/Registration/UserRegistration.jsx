import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createNewUser } from "../../api/createNewUser";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import {
  commonErrorToastMessage,
  commonSuccessToastMessage,
} from "../../components/toastify/AllToastifyErrors";

const UserRegistration = ({ isSignup, onLoginClick }) => {
  // Define the designations array
  const designations = [
    "Software Engineer",
    "Senior Software Engineer",
    "Associate QA Lead",
    "Product Manager",
  ];

  const {
    register,
    handleSubmit,
    setValue, // To programmatically set field values
    formState: { errors },
  } = useForm();
  const [userProfileImage, setUserProfileImage] = useState("");
  const [fileChosenFromLocal, setFileChosenFromLocal] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserProfileImage(reader.result); // Set the image preview
        setValue("userProfileImage", reader.result); // Update the form field value
      };

      setFileChosenFromLocal(true);
      reader.readAsDataURL(file);
    }
  };

  const handleImageURLChange = (e) => {
    const url = e.target.value;
    setUserProfileImage(url); // Set the image preview
    setValue("profilePhoto", url); // Update the form field value
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      // Uncomment this when the API is ready
      const response = await createNewUser(data);
      console.log("New User Created : ", response);
      commonSuccessToastMessage("User created successfully.");
      onLoginClick(); // Navigate to login or perform any action needed
    } catch (error) {
      commonErrorToastMessage(error?.response?.data || "An error occurred");
      console.log("Error while creating user : ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 w-3/4 mx-auto">
      <div className="products-team-name-logo font-bold text-center py-3 text-2xl">
        User Registration
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="First name"
          className={`mt-1 block w-full p-2 border rounded-md ${
            errors.firstName ? "border-red-500" : "border-gray-300"
          }`}
          {...register("firstName", { required: "First Name is required" })}
        />
        {errors.firstName && (
          <div className="text-red-500 text-sm mt-1">
            {errors.firstName.message}
          </div>
        )}
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Last name"
          className={`mt-1 block w-full p-2 border rounded-md ${
            errors.lastName ? "border-red-500" : "border-gray-300"
          }`}
          {...register("lastName", { required: "Last Name is required" })}
        />
        {errors.lastName && (
          <div className="text-red-500 text-sm mt-1">
            {errors.lastName.message}
          </div>
        )}
      </div>

      <div className="mb-4">
        <input
          type="email"
          placeholder="Email"
          className={`mt-1 block w-full p-2 border rounded-md ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && (
          <div className="text-red-500 text-sm mt-1">
            {errors.email.message}
          </div>
        )}
      </div>

      <div className="mb-4">
        <input
          type="password"
          placeholder="Password"
          className={`mt-1 block w-full p-2 border rounded-md ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
          {...register("password", {
            required: "Password is required",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must be at least 8 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character.",
            },
          })}
        />
        {errors.password && (
          <div className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </div>
        )}
      </div>

      <div className="mb-4">
        <select
          className={`mt-1 block w-full p-2 border rounded-md ${
            errors.designation ? "border-red-500" : "border-gray-300"
          }`}
          {...register("designation", { required: "Designation is required" })}
        >
          <option value="" label="Select designation" />
          {designations.map((designation) => (
            <option key={designation} value={designation}>
              {designation}
            </option>
          ))}
        </select>
        {errors.designation && (
          <div className="text-red-500 text-sm mt-1">
            {errors.designation.message}
          </div>
        )}
      </div>

      <div className="my-4">
        <label className="block mb-2">Profile Image</label>
        <input
          type="file"
          accept="image/*"
          className="mb-4 block w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          onChange={handleImageUpload}
        />
        <input
          type="text"
          placeholder="Or paste image URL"
          className="border rounded-lg px-2 py-1 w-full"
          onChange={handleImageURLChange}
          value={userProfileImage}
        />
        {/* Image Preview */}
        {userProfileImage && (
          <div className="mt-4">
            <img
              src={userProfileImage}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full border"
            />
          </div>
        )}
      </div>

      <div className="text-center">
        <button
          //   type="submit"
          className={`rounded-lg px-8 py-2 hover:opacity-90 font-semibold bg-[#f7e8ff] border border-purple-800 hover:bg-[#f1dafd] hover:shadow hover:shadow-[#d897f3] transition-all ease-in-out duration-500 text-purple-800`}
        >
          Register
        </button>
      </div>

      <div className="text-center mt-4 text-sm">
        <p>
          <span className="font-semibold">Already have an account? </span>
          <button
            className="text-blue-700 font-semibold"
            onClick={onLoginClick}
          >
            Login Here{" "}
          </button>
        </p>
      </div>
    </form>
  );
};

export default UserRegistration;
