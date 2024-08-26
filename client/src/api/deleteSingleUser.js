import axios from "./axios"; // Importing the Axios library for making HTTP requests

/**
 * Deletes a single user by ID.
 * @param {string} id - The ID of the user to delete.
 * @returns The response from the server.
 * @throws An error if the deletion fails.
 */
export const deleteSingleUser = async (id) => {
  try {
    const response = await axios.delete(
      `/user/${id}`, // The endpoint to delete a user, using the user ID in the URL path
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
