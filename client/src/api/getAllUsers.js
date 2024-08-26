import axios from "./axios"; // Importing the Axios library for making HTTP requests

export const getAllUsers = async () => {
  try {
    const response = await axios.get(
      "/allusers", // The endpoint to handle user login

      {
        headers: { "Content-Type": "application/json" }, // Set request headers
        withCredentials: true, // Include credentials for cross-origin requests
      }
    );
    return response; // Return the server response
  } catch (error) {
    throw error; // If an error occurs, rethrow it to be handled by the caller
  }
};
