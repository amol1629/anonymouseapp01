/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        myShadow1: "4.1px 5px 0 0 rgb(17,24,39)",
        myShadow2: "4px 5px 15px 10px rgba(0,0,0,0.2)",
      },
      keyframes: {
        "fade-slide-down": {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        fadeOut: {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        bounce: {
          "0%, 100%": {
            transform: "translateY(-5%)",
            animationTimingFunction: "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0,0,0.2,1)",
          },
        },
        scaleUp: {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        gentleRotate: {
          "0%": { transform: "rotate(-3deg)" },
          "100%": { transform: "rotate(3deg)" },
        },
        fadeSlideUp: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeSlideDown: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-slide-down": "fade-slide-down 0.3s ease-out",
        fadeIn: "fadeIn 0.5s ease-in forwards",
        fadeOut: "fadeOut 0.5s ease-out forwards",
        slideIn: "slideIn 0.5s ease-out",
        bounce: "bounce 1s infinite",
        scaleUp: "scaleUp 0.3s ease-in-out",
        gentleRotate: "gentleRotate 3s infinite alternate",
        fadeSlideUp: "fadeSlideUp 0.5s ease-out",
        fadeSlideDown: "fadeSlideDown 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
