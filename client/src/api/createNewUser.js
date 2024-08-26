// api/updateSingleUser.js
import axios from "./axios"; // Importing the Axios library for making HTTP requests

/**
 * Create New User.
 * @param {Object} userData - The new data for the user.
 * @returns The response from the server.
 * @throws An error if the update fails.
 */
export const createNewUser = async (userData) => {
  try {
    const response = await axios.post(
      `/register`, // The endpoint to update a user, using the user ID in the URL path
      userData, // The new data for the user
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
