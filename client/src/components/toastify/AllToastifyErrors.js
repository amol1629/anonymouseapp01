import toast, { Toaster } from "react-hot-toast";

export const commonErrorToastMessage = (message) => {
  toast.error(`${message}`, {
    position: "top-center",
    duration: 2000,
    style: {
      background: "#f7ebeb",
      color: "#EE0022",
      borderLeft: "6px solid #fd5959",
      // minWidth: "30rem",
    },
    iconTheme: {
      primary: "#EE0022",
      secondary: "#FFFAEE",
    },
  });
};

export const commonSuccessToastMessage = (message) => {
  toast.success(`${message}`, {
    position: "top-center",
    duration: 2000,
    style: {
      background: "#e3fcf7",
      color: "#00684A",
      borderLeft: "6px solid #00a35c",
    },
    icon: <i class="fa-solid fa-circle-check text-[#00a35c]"></i>,
  });
};
