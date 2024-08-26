import React from "react";
import { css } from "@emotion/react";
import { ScaleLoader } from "react-spinners";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red; // You can change the color here
`;

const LoadingOverlay = () => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center  bg-[#00000080] "
      style={{ backdropFilter: "blur(0px)", zIndex: 1310 }}
    >
      <div className="">
        <ScaleLoader css={override} size={60} color={"#f96900"} />
      </div>
    </div>
  );
};

export default LoadingOverlay;
