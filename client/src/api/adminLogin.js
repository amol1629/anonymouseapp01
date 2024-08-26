/**
 * Author : Amol Rathod
 */

// Description: This function handles the user login process by sending a POST request to the server.
// It takes the user's email and password as parameters, sends the data to the "/user_login" endpoint,
// and returns the server response.

import axios from "../api/axios"; // Importing the Axios library for making HTTP requests

/**
 * Handles user login by sending a POST request to the server.
 * @param {string} Email - The user's email address.
 * @param {string} Password - The user's password.
 * @returns {Promise} - A promise that resolves with the server response or rejects with an error.
 */
export const adminLogin = async (email, password) => {
  try {
    // Send a POST request to the server with the user's email and password
    const response = await axios.post(
      "/adminlogin", // The endpoint to handle user login
      {
        email: email, // User's email
        password, // User's password
      },
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
