/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--poppins-font)"],
        dmSans: ["var(--dmSans-font)"],
      },
      animation: {
        fade_third: "fade 0.3s ease-in-out",
        fade_third_delay: "fade 0.3s ease-in-out 0.5s",
        fade_half: "fade 0.5s ease-in-out",
        fade_1: "fade 1s ease-in-out",
        fade_2: "fade 2s ease-in-out",
        fade_3: "fade 3s ease-in-out",
        shrink: "shrink 0.1s ease-in-out 0.4s forwards",
        reveal: "reveal 0.3s ease-in-out",
        reveal_reverse: "reveal_reverse 0.3s ease-in-out",
        onboarding_dummy_user_card:
          "onboarding_dummy_user_card 3s ease-in-out 0.4s infinite",
        onboarding_dummy_user_card_backwards:
          "onboarding_dummy_user_card_backwards 3s ease-in-out 0.4s infinite",
      },
      keyframes: {
        shrink: {
          "0%": { scale: "100%" },
          "100%": { scale: "0%" },
        },
        fade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        reveal: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
        reveal_reverse: {
          "0%": { transform: "translateY(0px)", opacity: "1" },
          "100%": { transform: "translateY(20px)", opacity: "0" },
        },
        onboarding_dummy_user_card: {
          "0%": { transform: "translateX(316px)" },
          "100%": { transform: "translateX(0px)" },
        },
        onboarding_dummy_user_card_backwards: {
          "0%": { transform: "translateX(0px)" },
          "100%": { transform: "translateX(316px)" },
        },
      },
    },
  },
  plugins: [],
};
