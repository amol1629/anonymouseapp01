import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";
import Modal from "@mui/material/Modal";

const DeleteUserModal = (
  isDeleteUserModalOpen,
  handleDeleteUserModalClose,
  selectedUser,
  handleDeleteSingleUser
) => {
  return (
    <div>
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
                  ? `${selectedUser?.firstName} ${selectedUser?.lastName}`
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
    </div>
  );
};

export default DeleteUserModal;
