import axios from "./axios"; // Importing the Axios library for making HTTP requests

/**
 * Deletes a single user by ID.
 * @param {string} name - The first name or last name of the user to search.
 * @returns The response from the server.
 * @throws An error if the search fails.
 */
export const searchUser = async (name) => {
  try {
    const response = await axios.get(
      `/search/${name}`, // The endpoint to search a user, using the user first name or last name in the URL path
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
