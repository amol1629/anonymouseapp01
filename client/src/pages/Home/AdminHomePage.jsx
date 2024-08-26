import React, { useEffect, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import AppNavigation from "../../components/navigation/AppNavigation";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Modal from "@mui/material/Modal";
import { getAllUsers } from "../../api/getAllUsers";
import { deleteSingleUser } from "../../api/deleteSingleUser";
import LoadingOverlay from "../../components/overlays/LoadingOverlay";
import { commonSuccessToastMessage } from "../../components/toastify/AllToastifyErrors";
import { updateSingleUser } from "../../api/updateSingleUser";
import CreateUserModal from "../../components/modals/CreateUserModal";
import ShowAllUsersModal from "../../components/modals/ShowAllUsersModal";

import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

import faqsData from "../../data/faqs.json";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "20px",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#f0fbff",
  flexDirection: "row-reverse",
  borderRadius: "20px",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: "2px solid #dbcafe",
  borderRadius: "20px",
}));

const AdminHomePage = () => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const [allUsersDetails, setAllUsersDetails] = useState([]);

  // State variable to select the userId
  const [selectedUserId, setSelectedUserId] = useState("");

  // State variable to control the open/close state of the delete user modal
  const [isDeleteUserModalOpen, setIsDeleteUserModalOpen] = useState(false);

  // State variable to control the open/close state of the create user modal
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  // State for Loading Overlay
  const [isLoading, setIsLoading] = useState(false);

  // State for current page
  const [currentPage, setCurrentPage] = useState(0);

  // State variable for editing the user
  const [isEditMode, setIsEditMode] = useState(false);
  const [editableUser, setEditableUser] = useState({});

  // State variable for designation dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Create a ref for the dropdown

  // Close designation dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Designations dropdown options
  const designations = [
    "Software Engineer",
    "Senior Software Engineer",
    "Associate QA Lead",
    "Product Manager",
  ];

  // Function to handle dropdown selection
  const handleDropdownSelect = (designation) => {
    setEditableUser({ ...editableUser, designation });
    setDropdownOpen(false); // Close the dropdown after selection
  };

  // Edit User function
  const handleEditClick = (userId) => {
    const userToEdit = allUsersDetails.find((user) => user.id === userId);
    setEditableUser({ ...userToEdit });
    setIsEditMode(true);
  };

  // Function to save the edited user details
  const handleSaveClick = async () => {
    try {
      console.log("ID : ", editableUser);
      const response = await updateSingleUser(editableUser.id, editableUser);

      console.log("Updated User : ", response);
      // Update the allUsersDetails state to reflect the changes
      const updatedUsers = allUsersDetails.map((user) =>
        user.id === editableUser.id ? editableUser : user
      );

      const response1 = await getAllUsers();
      setAllUsersDetails(response.data);

      console.log("All Users Details : ", response1.data);

      // Store the data in session storage as well
      sessionStorage.setItem("allUsersDetails", JSON.stringify(response1.data));
      setAllUsersDetails(updatedUsers);
      setIsEditMode(false);
      setEditableUser({});
      commonSuccessToastMessage("User updated successfully.");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Function to handle 'Cancel' Edit
  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditableUser({});
  };

  // Function to handle the input change for user edit
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableUser({ ...editableUser, [name]: value });
  };

  // Total users
  const totalUsers = allUsersDetails.length;

  // Fetch all users when the component mounts
  useEffect(() => {
    const fetchAllUsersData = async () => {
      try {
        const response = await getAllUsers();
        setAllUsersDetails(response.data);

        console.log("All Users Details : ", response.data);

        // Store the data in session storage as well
        sessionStorage.setItem(
          "allUsersDetails",
          JSON.stringify(response.data)
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchAllUsersData();
  }, []); // Empty dependency array ensures this runs once on mount

  // Function to delete a particular user using 'id'
  const handleDeleteSingleUser = async () => {
    if (selectedUserId) {
      try {
        setIsLoading(true);
        const response = await deleteSingleUser(selectedUserId);

        console.log("User Deletion : ", response);

        setIsDeleteUserModalOpen(false); // Close the modal

        const updatedUsers = allUsersDetails.filter(
          (user) => user.id !== selectedUserId
        );
        setAllUsersDetails(updatedUsers);
        console.log("Updated Users after Deletion: ", updatedUsers);

        if (currentPage >= updatedUsers.length && currentPage > 0) {
          setCurrentPage(currentPage - 1);
        }

        setSelectedUserId(null);
        setIsDeleteUserModalOpen(false);
        setIsLoading(false);
        commonSuccessToastMessage("User deleted successfully.");
      } catch (error) {
        setIsLoading(false);

        console.error("Error deleting user:", error);
        setIsDeleteUserModalOpen(false); // Close the modal
      }
    }
  };

  // Variable to set the username for selected user
  const selectedUser = allUsersDetails?.find(
    (user) => user?.id === selectedUserId
  );

  // Go to next user
  const goToNextUser = () => {
    setCurrentPage((currentPage) =>
      currentPage < totalUsers - 1 ? currentPage + 1 : currentPage
    );
  };

  // Go to the previous user
  const goToPreviousUser = () => {
    setCurrentPage((currentPage) =>
      currentPage > 0 ? currentPage - 1 : currentPage
    );
  };

  // Uncomment swipe code when you need it.
  const handlers = useSwipeable({
    onSwipedLeft: goToNextUser,
    onSwipedRight: goToPreviousUser,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  // Function to handle the opening the modal for delete user
  const handleDeleteUserModalOpen = (userId) => {
    setSelectedUserId(userId);
    setIsDeleteUserModalOpen(true);
  };

  // Function to handle closing the modal for deleting user
  const handleDeleteUserModalClose = () => {
    setIsDeleteUserModalOpen(false); // Close the modal
    // Do any other logic you need before redirecting to "/"
  };

  // Function to handle the opening the modal for create user
  const handleCreateUserModalOpen = () => {
    setIsCreateUserModalOpen(true);
  };

  // Function to handle closing the modal for deleting user
  const handleCreateUserModalClose = () => {
    setIsCreateUserModalOpen(false);
  };

  // Newly created user details coming from 'CreateNewUser' page
  const handleSaveNewUser = (newUserData) => {
    console.log("Admin Page : ", newUserData);
    // Implement the logic to save the new user data
  };

  // Show All Users in Tabular Format
  const [isShowAllUsersModalOpen, setIsShowAllUsersModalOpen] = useState(false);

  const handleShowAllUsersModalOpen = () => {
    setIsShowAllUsersModalOpen(true);
  };

  const handleShowAllUsersModalClose = () => {
    setIsShowAllUsersModalOpen(false);
  };

  const handleShowAllUsers = async () => {
    try {
      const response = await getAllUsers();
      setAllUsersDetails(response.data);

      console.log("Show All Users : ", response.data);

      // Store the data in session storage as well
      sessionStorage.setItem("allUsersDetails", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const byteArrayToString = (byteArray) => {
    return byteArray ? String.fromCharCode(...byteArray) : null;
  };

  const imageUrl = byteArrayToString(
    allUsersDetails[currentPage]?.userProfileImage?.data
  );

  console.log("allUsersDetails : ", allUsersDetails);
  return (
    <div {...handlers} className="">
      {/* App Navigation */}
      <AppNavigation />

      {/* Documentation is the backbone of project management. It serves as a
            roadmap, a history book, and a source of truth all in
            one.Documentation sets the stage for a project's vision, goals, and
            scope, ensuring every team member is on the same page.A
            well-documented project simplifies communication, enabling team
            members to work cohesively, regardless of geographical
            boundaries.Documentation acts as a repository of knowledge, making
            onboarding new team members seamless and preserving the project
            legacy. */}
      {/* For Users Only */}
      {/* <div className="my-8 bg-[#fdfdfd]  animate-fade-slide-down transition-all ease-in-out duration-500">
        <div className="p-4 shadow hover:shadow-lg rounded-lg flex align-middle items-center place-content-center justify-center h-[40vh] mx-2 border transition-all ease-in-out duration-500">
          <p className="text-center text-gradient-color text-4xl ">
            <span className="pe-2 text-purple-600">
              <i class="fa-solid fa-quote-left"></i>
            </span>
            <span className="leading-relaxed">
              {" "}
              Documentation is the backbone of project management. It serves as
              a roadmap, a history book, and a source of truth all in one.
            </span>

            <span className="ps-2 text-purple-600">
              <i class="fa-solid fa-quote-right "></i>
            </span>
          </p>
        </div>
      </div> */}

      <div className="">
        <div
          className="border animate-fade-slide-down transition-all ease-in-out duration-500 shadow hover:shadow-lg  p-4"
          data-aos="zoom-in"
          data-aos-offset="180"
          // data-aos-delay="50"
        >
          <div className="border-b pb-4 w-4/5 m-auto  md:flex  place-content-between justify-between items-center">
            <div className="all-users-text text-2xl md:text-4xl text-center font-bold">
              All Users
            </div>

            <div className=" flex gap-8">
              <Tooltip
                title="Create new user"
                arrow
                placement="top"
                TransitionComponent={Zoom}
                TransitionProps={{ timeout: 300 }}
              >
                <button
                  className={`border border-purple-800 rounded-lg  px-4 py-1 hover:opacity-90 font-semibold bg-[#fbf4ff] hover:bg-[#f1dafd] hover:shadow hover:shadow-[#e1a6fb] transition-all ease-in-out  duration-500 text-purple-800`}
                  onClick={handleCreateUserModalOpen}
                >
                  <i class="fa-solid fa-circle-plus"></i>
                  <span className="ps-2">Create User</span>
                </button>
              </Tooltip>

              <Tooltip
                title="Show all users"
                arrow
                placement="top"
                TransitionComponent={Zoom}
                TransitionProps={{ timeout: 300 }}
              >
                <button
                  className={`border border-purple-800 rounded-lg  px-4 py-1 hover:opacity-90 font-semibold bg-[#fbf4ff] hover:bg-[#f1dafd] hover:shadow hover:shadow-[#e1a6fb] transition-all ease-in-out  duration-500 text-purple-800`}
                  onClick={handleShowAllUsersModalOpen}
                >
                  <i class="fa-solid fa-table-list"></i>
                  <span className="ps-2">Show All Users</span>
                </button>
              </Tooltip>
            </div>
          </div>

          <div className="mt-6 mb-6 flex items-center place-content-evenly">
            <Tooltip
              title="Show all users"
              arrow
              placement="top"
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 300 }}
            >
              <div
                className="flex items-center place-content-between gap-4 border px-4 py-2 rounded-xl bg-[#f1fffa] cursor-pointer shadow-[#d9fcee] shadow-md hover:shadow-[#aaffde] transition-all duration-500 ease-in-out"
                onClick={handleShowAllUsersModalOpen}
              >
                <div className="">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/9255/9255647.png"
                    alt=""
                    className="w-12 h-12 mix-blend-multiply"
                  />
                </div>

                <div>
                  <div>Total Users</div>
                  <div className="mt-2 text-center rounded-full w-8 mx-auto h-8 leading-8 bg-[#afffd6]">
                    {totalUsers}
                  </div>
                </div>
              </div>
            </Tooltip>

            <div className="flex items-center place-content-between gap-4 border px-4 py-2 rounded-xl bg-[#f1fffa] shadow-[#d9fcee] shadow-md hover:shadow-[#aaffde] transition-all duration-500 ease-in-out">
              <div className="">
                <img
                  src="https://cdn-icons-png.freepik.com/512/8162/8162325.png"
                  alt=""
                  className="w-12 h-12"
                />
              </div>

              <div>
                <div>Total Project</div>
                <div className="mt-2 text-center rounded-full w-8 mx-auto h-8 leading-8 bg-[#afffd6]">
                  {totalUsers}
                </div>
              </div>
            </div>
          </div>

          <div className="md:flex md:gap-8 justify-normal align-middle place-content-center  items-center">
            <div className="main-div  sm:w-full md:w-2/3  m-auto mt-4 shadow rounded-lg p-3">
              {allUsersDetails.length > 0 && (
                <div className="  m-2">
                  <div className="text-end p-2">
                    {/* Counting of users */}
                    <p className="text-sm italic ">
                      <span className="bg-[#fefefe] border shadow px-4 py-1 rounded-xl">
                        {currentPage + 1} of {allUsersDetails.length}
                      </span>
                    </p>
                  </div>

                  <div className=" text-center flex items-center place-content-end">
                    <div>
                      {isEditMode ? (
                        ""
                      ) : (
                        <Tooltip
                          title="Delete User"
                          arrow
                          placement="top"
                          TransitionComponent={Zoom}
                          TransitionProps={{ timeout: 300 }}
                        >
                          <span
                            onClick={() =>
                              handleDeleteUserModalOpen(
                                allUsersDetails[currentPage].id
                              )
                            }
                            className="delete-icon text-sm ms-6 float-right mt-2 transform-gpu text-red-500 cursor-pointer"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </span>
                        </Tooltip>
                      )}
                      {isEditMode ? (
                        ""
                      ) : (
                        <Tooltip
                          title="Edit User"
                          arrow
                          placement="top"
                          TransitionComponent={Zoom}
                          TransitionProps={{ timeout: 300 }}
                        >
                          <span
                            onClick={() =>
                              handleEditClick(allUsersDetails[currentPage].id)
                            }
                            className="edit-icon text-sm float-right mt-2 transform-gpu text-green-600 cursor-pointer"
                          >
                            <i class="fa-regular fa-pen-to-square"></i>
                          </span>
                        </Tooltip>
                      )}
                    </div>
                  </div>

                  <div className="px-4  ">
                    <div className=" text-2xl font-bold p-2 rounded ">
                      {/* Username with edit and delete icons */}

                      <div className="text-center flex items-center place-content-center gap-8">
                        <div>
                          {imageUrl ? (
                            <img
                              src={imageUrl}
                              alt="User Profile"
                              className="w-24 h-24 object-cover rounded-full border text-center"
                            />
                          ) : (
                            <img
                              src="https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                              alt="User Profile"
                              className="w-24 h-24 object-cover rounded-full border"
                            />
                          )}
                        </div>
                        <div>
                          {allUsersDetails[currentPage]?.firstName}{" "}
                          {allUsersDetails[currentPage]?.lastName}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3  user-info">
                    <div className="grid grid-cols-2 gap-2  m-auto  sm:shadow-none md:shadow  rounded-lg p-3">
                      {/* First Name */}
                      <div className="font-bold py-3">FirstName:</div>
                      <div className="py-2">
                        {isEditMode ? (
                          <input
                            className="border rounded-lg px-2 py-1 w-full"
                            name="firstName"
                            value={editableUser.firstName}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <span className="px-2 py-1 ">
                            {allUsersDetails[currentPage].firstName}
                          </span>
                        )}
                      </div>

                      {/* Last Name */}
                      <div className="font-bold py-3">LastName:</div>
                      <div className="py-2">
                        {isEditMode ? (
                          <input
                            className="border rounded-lg px-2 py-1 w-full"
                            name="lastName"
                            value={editableUser.lastName}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <span className="px-2 py-1 ">
                            {allUsersDetails[currentPage].lastName}
                          </span>
                        )}
                      </div>

                      {/* Email */}
                      <div className="font-bold py-3">Email:</div>
                      <div className="py-2 ">
                        {isEditMode ? (
                          <Tooltip
                            title="Not allowed"
                            arrow
                            placement="top"
                            TransitionComponent={Zoom}
                            TransitionProps={{ timeout: 300 }}
                          >
                            <input
                              disabled
                              className="border rounded-lg px-2 py-1 w-full cursor-not-allowed"
                              name="email"
                              value={editableUser.email}
                              onChange={handleInputChange}
                            />
                          </Tooltip>
                        ) : (
                          <span className="px-2 py-1 ">
                            {allUsersDetails[currentPage].email}
                          </span>
                        )}
                      </div>

                      {/* Designation */}
                      <div className="font-bold py-3">Designation:</div>
                      <div className="py-2">
                        {isEditMode ? (
                          <div className="relative " ref={dropdownRef}>
                            <div
                              className="cursor-pointer border rounded-lg px-2 py-1 flex justify-between hover:bg-purple-50 "
                              onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                              <p>
                                {editableUser.designation ||
                                  "Select Designation"}
                              </p>
                              <p>
                                <i class="fa-solid fa-sort-down pb-1"></i>
                              </p>
                            </div>
                            {dropdownOpen && (
                              <div className="absolute border rounded-lg bg-white z-10 w-full animate-fadeSlideDown transition-all ease-in-out duration-500">
                                {designations.map((designation, index) => (
                                  <div
                                    key={index}
                                    className="px-2 py-1 hover:bg-purple-100 hover:rounded-lg cursor-pointer transition-all ease-in-out duration-400 "
                                    onClick={() =>
                                      handleDropdownSelect(designation)
                                    }
                                  >
                                    {designation}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="px-2 py-1 ">
                            {allUsersDetails[currentPage].designation}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {allUsersDetails.length === 0 ? (
                // Show error message when there are no users in database
                <div className="text-center ">
                  <div
                    className={` text-center px-2 py-1 rounded-lg  transition-all ease-in-out duration-500  `}
                  >
                    <p>
                      <i className="text-[70px] text-red-400 fa-regular fa-face-frown py-7"></i>
                    </p>
                    <p className="text-red-400 font-semibold italic ">
                      Whoops! No users here. Let's create some user profiles.
                    </p>

                    <p className="text-red-400 py-4 font-semibold  ">
                      <span className="italic">Click here to </span>
                      <Tooltip
                        title="Create a new user"
                        arrow
                        placement="top"
                        TransitionComponent={Zoom}
                        TransitionProps={{ timeout: 300 }}
                      >
                        <span
                          className="text-blue-600 hover:opacity-70 underline hover:no-underline transition-all ease-in-out duration-500 cursor-pointer"
                          onClick={handleCreateUserModalOpen}
                        >
                          create a new user.
                        </span>
                      </Tooltip>
                    </p>
                  </div>
                </div>
              ) : isEditMode ? (
                <div className="text-center">
                  {/* Cancel Icon */}
                  <Tooltip
                    title="Cancel"
                    arrow
                    placement="top"
                    TransitionComponent={Zoom}
                    TransitionProps={{ timeout: 300 }}
                  >
                    <button
                      className={`bg-[#ffcdc7] text-[#ba4400] px-8 py-1 rounded-lg mx-4  border border-red-400 transition-all ease-in-out duration-500 hover:shadow hover:shadow-[#fcaba0] `}
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </Tooltip>

                  {/* Save Icon */}
                  <Tooltip
                    title="Update"
                    arrow
                    placement="top"
                    TransitionComponent={Zoom}
                    TransitionProps={{ timeout: 300 }}
                  >
                    <button
                      className={`bg-[#c0fad7] hover:bg-[#b0fccd] text-[#113b29] hover:shadow hover:shadow-[#79b992] transition-all ease-in-out duration-500 px-8 py-1 rounded-lg mx-4  border border-green-500 `}
                      onClick={handleSaveClick}
                    >
                      Update
                    </button>
                  </Tooltip>
                </div>
              ) : (
                <div className="text-center">
                  {/* Go to previous user */}
                  <button
                    className={`bg-[#ffe0dc] px-8 py-1 rounded-lg mx-4  transition-all ease-in-out duration-500 hover:shadow hover:shadow-[#fcaba0]  border border-red-400 ${
                      currentPage === 0 ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    onClick={goToPreviousUser}
                  >
                    Previous
                  </button>

                  {/* Go to next user */}
                  <button
                    className={`bg-[#c2fbd7] hover:bg-[#b0fccd] hover:shadow hover:shadow-[#79b992] transition-all ease-in-out duration-500 px-8 py-1 rounded-lg mx-4 border border-green-600 ${
                      currentPage === totalUsers - 1
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    onClick={goToNextUser}
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

            {/* <div className="sm:w-full mt-8 md:w-1/3 md:m-auto">
              <div className="all-data-div shadow rounded-lg">
                <p className="text-center text-2xl font-bold p-4 border-b">
                  All Data
                </p>
                <div className="p-4 w-2/3 m-auto">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Total Users:</span>
                    <span className="font-semibold bg-purple-100 text-center rounded-full w-10 h-10 leading-10 border border-purple-700">
                      {totalUsers}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">
                      Total Projects Created:
                    </span>
                    <span className="font-semibold bg-purple-100 text-center rounded-full w-10 h-10 leading-10 border border-purple-700">
                      111
                    </span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Delete User Modal */}
      <Modal
        open={isDeleteUserModalOpen}
        onClose={handleDeleteUserModalClose}
        aria-labelledby="deleteUser-modal-title"
        // Apply the style to the modal container
        className="flex place-content-center items-center fixed animate-fadeSlideDown outline-none"
        // Disable clicking on the backdrop and Escape key
        BackdropProps={{
          style: { pointerEvents: "none" },
        }}
        disableEscapeKeyDown
      >
        <div
          className={`bg-white handleDeleteUserModalOpen  shadow-lg text-[#212529] pb-6 px-6 rounded-lg   animate-fadeSlideDown w-max`}
        >
          <div className="text-[70px] text-center   ">
            <p>
              <span>
                <i className=" text-red-400 fa-solid fa-triangle-exclamation"></i>
              </span>
            </p>
          </div>

          <div className="mb-4">
            <p className="">
              Are you sure you want to delete the user "
              <span className="text-[#e76251] underline">
                {selectedUser
                  ? `${selectedUser.firstName} ${selectedUser.lastName}`
                  : ""}
              </span>
              " ?
            </p>
          </div>

          <div className="flex place-content-center gap-12">
            <Tooltip
              title="Delete this user"
              arrow
              placement="top"
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 300 }}
            >
              <button
                className="mt-4 px-6 py-1 bg-[#ffe3e3] text-[#D33A2C] font-semibold rounded-lg  transition-all ease-in-out duration-500 hover:shadow hover:shadow-[#fcaba0]  border border-red-400"
                onClick={handleDeleteSingleUser}
              >
                Yes
              </button>
            </Tooltip>

            <Tooltip
              title="Keep this user"
              arrow
              placement="top"
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 300 }}
            >
              <button
                className={`rounded-lg mt-4 px-6 py-1 hover:opacity-90 font-semibold bg-[#c2fbd7] hover:bg-[#b0fccd] hover:shadow hover:shadow-[#79b992] transition-all ease-in-out  duration-500 text-[#1a582a]  border border-green-500`}
                onClick={handleDeleteUserModalClose}
              >
                No
              </button>
            </Tooltip>
          </div>
        </div>
      </Modal>

      {/* Create User Modal */}
      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={handleCreateUserModalClose}
        onSave={handleSaveNewUser}
        setAllUsersDetails={setAllUsersDetails}
      />

      {/* Create User Modal */}
      <ShowAllUsersModal
        isOpen={isShowAllUsersModalOpen}
        onClose={handleShowAllUsersModalClose}
        // onSave={handleSaveNewUser}
        setAllUsersDetails={setAllUsersDetails}
        users={allUsersDetails}
      />

      {/* FAQs Section */}
      <div className="mx-4 border rounded-lg p-4 shadow-lg my-8">
        <div>
          <p className="pt-4 pb-6 all-users-text text-2xl md:text-4xl  font-bold text-center">
            FAQs
          </p>
        </div>
        <div>
          {faqsData.faqs.map((faq, index) => (
            <Accordion
              className="mb-4"
              key={index}
              expanded={expanded === `panel${index + 1}`}
              onChange={handleChange(`panel${index + 1}`)}
            >
              <AccordionSummary
                aria-controls={`panel${index + 1}d-content`}
                id={`panel${index + 1}d-header`}
              >
                <Typography>{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </div>

      {/* Loading overlay */}
      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default AdminHomePage;
