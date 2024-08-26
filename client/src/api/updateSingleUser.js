// api/updateSingleUser.js
import axios from "./axios"; // Importing the Axios library for making HTTP requests

/**
 * Updates a single user by ID.
 * @param {string} id - The ID of the user to update.
 * @param {Object} userData - The new data for the user.
 * @returns The response from the server.
 * @throws An error if the update fails.
 */
export const updateSingleUser = async (id, userData) => {
  try {
    const response = await axios.put(
      `/update/${id}`, // The endpoint to update a user, using the user ID in the URL path
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
