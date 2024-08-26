// CreateUserModal.js
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Pagination from "@mui/material/Pagination";

import { createNewUser } from "../../api/createNewUser";
import LoadingOverlay from "../overlays/LoadingOverlay";

import {
  commonErrorToastMessage,
  commonSuccessToastMessage,
} from "../toastify/AllToastifyErrors";
import { getAllUsers } from "../../api/getAllUsers";
import { deleteMultipleUsers } from "../../api/deleteMultipleUsers";
import { searchUser } from "../../api/searchUser";

const ShowAllUsersModal = ({ isOpen, onClose, users, setAllUsersDetails }) => {
  const navigate = useNavigate();

  // State to keep track of selected users as an array of IDs
  const [selectedUsers, setSelectedUsers] = useState([]);

  // console.log("Users : ", users);

  // State for Loading Overlay
  const [isLoading, setIsLoading] = useState(false);

  // State for search query and search results
  const [searchQuery, setSearchQuery] = useState("");

  // State for search results
  const [searchResults, setSearchResults] = useState([]);

  // State for displayed users
  const [displayedUsers, setDisplayedUsers] = useState(users);

  //  New state variables to manage pagination.
  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 10; // Adjust the number as needed
  const pageCount = Math.ceil(displayedUsers.length / usersPerPage);

  const handleCheckboxChange = (id, event) => {
    event.stopPropagation();

    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(id)) {
        // Remove ID from the array if it's already there (unselect)
        return prevSelectedUsers.filter((userId) => userId !== id);
      } else {
        // Add ID to the array if it's not there (select)
        return [...prevSelectedUsers, id];
      }
    });
  };

  const handleRowClick = (id) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(id)) {
        // Remove ID from the array if it's already there (unselect)
        return prevSelectedUsers.filter((userId) => userId !== id);
      } else {
        // Add ID to the array if it's not there (select)
        return [...prevSelectedUsers, id];
      }
    });
  };

  const handleSelectAllChange = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
  };

  const handleCloseShowAllUsersModal = () => {
    onClose();
    setSelectedUsers([]);
    setSearchQuery("");
    setCurrentPage(0);
  };
  // console.log("Selected Users : ", selectedUsers);

  const formatDate = (dateString) => {
    const options = {
      //   weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Handle Delete Multiple Users
  const handleDeleteMultipleUsers = async () => {
    try {
      setIsLoading(true);
      const response = await deleteMultipleUsers(selectedUsers);

      // Assuming the response contains the IDs of successfully deleted users
      const deletedUserIds = response.data.map(
        (deletedUser) => deletedUser.userId
      );

      // Filter out the deleted IDs from selectedUsers
      setSelectedUsers((prevSelectedUsers) =>
        prevSelectedUsers.filter((userId) => !deletedUserIds.includes(userId))
      );

      // console.log("Id : ", selectedUsers);

      const fetchAllUsers = await getAllUsers();
      setAllUsersDetails(fetchAllUsers.data);

      // Store the updated data in session storage as well
      sessionStorage.setItem(
        "allUsersDetails",
        JSON.stringify(fetchAllUsers.data)
      );

      setSearchQuery("");

      commonSuccessToastMessage("Selected users deleted successfully");
      setIsLoading(false);
    } catch (error) {
      console.log("Error while deleting multiple users : ", error);
      setIsLoading(false);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  // Function to perform local search on the users array
  const handleSearch = () => {
    if (searchQuery.length > 0) {
      const searchWords = searchQuery.toLowerCase().split(/\s+/); // Split the search query into words
      const filteredUsers = users.filter((user) => {
        return searchWords.every(
          (
            word // Check every word in the search query
          ) =>
            user.firstName.toLowerCase().includes(word) ||
            user.lastName.toLowerCase().includes(word) ||
            user.email.toLowerCase().includes(word) ||
            user.designation.toLowerCase().includes(word)
        );
      });
      setDisplayedUsers(filteredUsers);
    } else {
      setDisplayedUsers(users); // Set to all users if search query is empty
    }
  };

  // Call handleSearch when searchQuery changes
  useEffect(() => {
    handleSearch();
  }, [searchQuery, users]);

  // Handle Pagination :
  const currentUsers = displayedUsers.slice(
    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage
  );

    const [animatePageTurn, setAnimatePageTurn] = useState(false);

    const handlePageChange = (event, page) => {
      setCurrentPage(page - 1); // Change the page immediately
      setAnimatePageTurn(true); // Start the animation

      // Stop the animation after it finishes
      setTimeout(() => {
        setAnimatePageTurn(false);
      }, 1000); // This duration should match the CSS animation duration
    };

  // console.log("Current Page : ", currentPage);


  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="createUser-modal-title"
      className="flex place-content-center items-center fixed  outline-none  animate-fadeSlideDown transition-all ease-in-out duration-500 "
      // Disable clicking on the backdrop and Escape key
      BackdropProps={{
        style: { pointerEvents: "none" },
      }}
      disableEscapeKeyDown
    >
      <div className="bg-white shadow-lg text-[#212529]  rounded-lg animate-fadeSlideDown  transition-all ease-in-out duration-1000  p-6">
        <div className="modal-content h-[90vh] md:w-[80vw] sm:w-fit">
          <div>
            <div className="flex place-content-between gap-8 border-b pb-5">
              <div>
                <h2 className=" text-2xl font-bold ">All Users Details</h2>
              </div>

              <div>
                {/* Search Bar */}
                <div className="w-[30vw] bg-white hover:opacity-100 opacity-80 flex items-center rounded-xl border border-green-300">
                  <i className="fa-solid fa-magnifying-glass text-gray-400 px-4"></i>
                  <input
                    className="w-full py-2 outline-none rounded-xl"
                    placeholder="Search user"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  <Tooltip
                    title="Delete Search"
                    arrow
                    placement="top"
                    TransitionComponent={Zoom}
                    TransitionProps={{ timeout: 300 }}
                  >
                    <button
                      className={`border-gray-500 border-l`}
                      onClick={handleClearSearch}
                    >
                      <i class="fa-solid fa-circle-xmark px-3 cursor-pointer text-red-400"></i>

                      {""}
                    </button>
                  </Tooltip>
                </div>

                {/* Display Search Results */}
                {/* <div className="w-[30vw] bg-white shadow-md p-2 rounded-lg">
                  {searchResults.map((user, index) => (
                    <div
                      key={index}
                      className="p-2 my-1 cursor-pointer  hover:opacity-100 opacity-80 flex items-center rounded-xl border border-purple-300"
                    >
                      {user.firstName} {user.lastName}
                    </div>
                  ))}
                </div> */}
              </div>

              <div>
                {selectedUsers.length >= 1 ? (
                  <Tooltip
                    title="Delete Selected Users"
                    arrow
                    placement="top"
                    TransitionComponent={Zoom}
                    TransitionProps={{ timeout: 300 }}
                  >
                    <button
                      className="text-red-500 text-lg hover:bg-[#fef1f1] font-semibold  text-center rounded-full w-10 h-10 leading-10 hover:animate-pulse transition-all ease-in-out duration-500"
                      onClick={handleDeleteMultipleUsers}
                    >
                      <i class="fa-solid fa-trash"></i>{" "}
                    </button>
                  </Tooltip>
                ) : (
                  ""
                )}

                <Tooltip
                  title="Close"
                  arrow
                  placement="top"
                  TransitionComponent={Zoom}
                  TransitionProps={{ timeout: 300 }}
                >
                  <button
                    className="text-[#6c757d] text-lg hover:bg-[#edeeef] font-semibold t text-center rounded-full w-10 h-10 leading-10 transition-all ease-in-out duration-500"
                    onClick={handleCloseShowAllUsersModal}
                  >
                    <i className="fa-solid fa-xmark"></i>{" "}
                  </button>
                </Tooltip>
              </div>
            </div>
          </div>

          {/* Modal content goes here, including the table to display users */}
          <div
            className={`h-[80vh]  ${
              animatePageTurn ? "flip-effect" : ""
            } resize-none bg-transparent border-none overflow-auto  outline-none custom-scrollbar`}
          >
            <table className="user-table ">
              <thead>
                <tr className="text-center">
                  <th>
                    {selectedUsers.length >= 1 ? (
                      <p
                        className="flex align-middle justify-center gap-1 cursor-pointer"
                        onClick={handleSelectAllChange}
                      >
                        <input
                          className="all-checked-box cursor-pointer"
                          type="checkbox"
                          onChange={handleSelectAllChange}
                          checked={selectedUsers.length === users.length}
                          disabled={users.length === 0}
                        />{" "}
                        <span>Selected ({selectedUsers?.length})</span>
                      </p>
                    ) : (
                      ""
                    )}
                  </th>
                  <th>Sr No</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Designation</th>
                  <th>Created Date</th>
                </tr>
              </thead>

              <tbody>
                {currentUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`text-center rounded-full ${
                      selectedUsers?.includes(user?.id)
                        ? "opacity-80 user-selected"
                        : ""
                    }`}
                    onClick={() => handleRowClick(user.id)}
                  >
                    <td>
                      <input
                        className=" cursor-pointer"
                        type="checkbox"
                        checked={selectedUsers?.includes(user.id)}
                        onChange={(e) => handleCheckboxChange(user.id, e)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                    <td>{index + 1 + currentPage * usersPerPage}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.designation}</td>
                    <td>{formatDate(user.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* <div className="mt-6">
              <ReactPaginate
                className="flex place-content-between justify-center"
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={({ selected }) => setCurrentPage(selected)}
                containerClassName={"pagination"}
                previousLinkClassName={"pagination__link"}
                nextLinkClassName={"pagination__link"}
                disabledClassName={"pagination__link--disabled"}
                activeClassName={"pagination__link--active"}
                pageClassName={"page-item"}
              />
            </div> */}

            <div className={`mt-6 text-center flex place-content-center `}>
              <Pagination
                count={pageCount}
                page={currentPage + 1} // MUI Pagination is 1-indexed
                onChange={handlePageChange}
                variant="outlined"
                color="secondary"
                boundaryCount={1}
                siblingCount={1}
              />
            </div>
          </div>
        </div>
        {/* Loading overlay */}
        {isLoading && <LoadingOverlay />}
      </div>
    </Modal>
  );
};

export default ShowAllUsersModal;
