import axios from "./axios"; // Importing the Axios library for making HTTP requests

/**
 * Deletes multiple users by their IDs.
 * @param {string[]} ids - The IDs of the users to delete.
 * @returns The response from the server.
 * @throws An error if the deletion fails.
 */
export const deleteMultipleUsers = async (ids) => {
  try {
    const response = await axios.delete(
      `/user/deleteMultiple`, // The endpoint to delete multiple users
      {
        data: { userIds: ids }, // Send the array of user IDs in the request body
        headers: { "Content-Type": "application/json" }, // Set request headers
        withCredentials: true, // Include credentials for cross-origin requests
      }
    );
    return response; // Return the server response
  } catch (error) {
    throw error; // If an error occurs, rethrow it to be handled by the caller
  }
};
