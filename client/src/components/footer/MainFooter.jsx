import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

// Footer component responsible for displaying the footer section of the webpage.
const MainFooter = () => {
  return (
    // Container for the footer section with a gray background and shadow.
    <div>
      <div>
        <div className="flex justify-between  items-center px-5 bg-[#eeeeee] h-[7vh] shadow-lg py-[8px]">
          <div>
            {/* Copyright text */}
            <p className="text-[#777e8d] text-[12px]">
              © 2018-2023 Harbinger AI Inc. All rights reserved.
            </p>
          </div>

          <div className="flex space-x-2 ">
            <Tooltip
              title="Facebook"
              arrow
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 300 }}
            >
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                <i className="fa-brands fa-facebook hover:opacity-80 text-[#2660c5]"></i>
                {""}
              </a>
            </Tooltip>

            <Tooltip
              title="Twitter"
              arrow
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 300 }}
            >
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                {/* <i className="fa-brands fa-twitter hover:opacity-80 text-[#4683ec]"></i> */}
                <i class="fa-brands fa-square-x-twitter"></i>
                {""}
              </a>
            </Tooltip>

            <Tooltip
              title="Linkedin"
              arrow
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 300 }}
            >
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                <i
                  class="fa-brands fa-linkedin hover:opacity-80 text-[#275bb4]"
                  aria-hidden="true"
                ></i>
                {""}
              </a>
            </Tooltip>

            <Tooltip
              title="Pinterest"
              arrow
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 300 }}
            >
              <a
                href="https://www.pinterest.com"
                target="_blank"
                rel="noreferrer noopener"
              >
                <i class="fa-brands fa-pinterest hover:opacity-80 text-[#f02d2d]"></i>
                {""}
              </a>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainFooter;
