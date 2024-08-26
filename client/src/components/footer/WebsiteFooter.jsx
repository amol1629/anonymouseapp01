import React from "react";
import toast, { Toaster } from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

// Footer component responsible for displaying the footer section of the webpage.
const WebsiteFooter = () => {
  return (
    // Container for the footer section with a gray background and shadow.
    <div className=" px-5 bg-[#0c3b55] shadow-lg py-[12px] align-middle">
      <div>
        {/* Copyright text */}
        <p className="text-white text-[11px] font-semibold">
          © 2023 | Harbinger AI Inc. | Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default WebsiteFooter;
