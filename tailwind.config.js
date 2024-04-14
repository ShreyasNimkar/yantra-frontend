/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      width: {
        90: "360px",
        108: "32rem",
        sidebar_open: "280px",
        sidebar_close: "100px",
        base_open: "calc(100vw - 560px)",
        base_close: "calc(100vw - 380px)",
        no_side_base_open: "calc(100vw - 280px)",
        no_side_base_close: "calc(100vw - 100px)",
        taskbar: "720px",
        taskbar_md: "90%",
        bottomBar: "100px",
      },
      height: {
        90: "360px",
        108: "32rem",
        navbar: "64px",
        base: "calc(100vh - 64px)",
        taskbar: "48px",
        base_md: "calc(100vh - 64px - 48px)",
      },
      minHeight: {
        base_md: "calc(100vh - 64px - 48px)",
      },
      spacing: {
        navbar: "64px",
        base_padding: "24px",
        bottomBar: "100px",
        base_md: "calc(100vh - 64px - 48px)",
      },

      boxShadow: {
        outer: "0 0 15px 2px #262626a1;",
        inner: "0px 0px 10px 1px #262626a1 inset;",
      },
      backgroundImage: {
        onboarding: "url('/assets/onboarding.webp')",
        new_post: "url('/assets/new_post.webp')",
      },
      colors: {
        primary_text: "#478EE1",
        dark_primary_gradient_start: "#633267",
        dark_primary_gradient_end: "#5b406b",
        dark_secondary_gradient_start: "#be76bf",
        dark_secondary_gradient_end: "#607ee7",
        primary_btn: "#9ca3af",
        dark_primary_btn: "#9275b9ba",
        primary_comp: "#478eeb18",
        dark_primary_comp: "#c578bf1b",
        primary_comp_hover: "#478eeb38",
        dark_primary_comp_hover: "#c578bf36",
        primary_comp_active: "#478eeb86",
        dark_primary_comp_active: "#c578bf5d",
        primary_danger: "#ea333e",
        primary_black: "#2e2c2c",
        heart_filled: "#fe251baa",
        priority_high: "#fbbebe",
        priority_mid: "#fbf9be",
        priority_low: "#bffbbe",
        deep_sea: "#26192b",
        midnight_blue: "#51588c",
        lavender_blush: "#c46fb2",
        kinda_lilac: "#F7DBF0",

        pale_lilac: "#e1c2eb",
        mint: "#CDF0EA",
        blue_bell: "#CAE9F5",
        kinda_purple: "#E0DCF9",
      },
      backgroundColor: {
        backdrop: "#0000003f",
        navbar: "#ffffff",
        dark_navbar: "#070615be",
        main: "#e5e7eb",
        dark_main: "#070615be",
        sidebar: "#ffffff",
        dark_sidebar: "#43434385",
      },
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
      backgroundImage: {
        // 'gradient-bg': "url('/background.svg')",
        // "landing-bg": "url(/landing-background.png)",
        // "events-bg": "url(/events-background.png)",
        "left-pencil-stroke-bg": "url(/svg-icons/LeftPencilStroke.png)",
        "peopleBox-bg": "url(/peopleBox.png)",
        "threePeople-bg": "url(/threePeople.svg)",
        "singlePerson-bg": "url(/singlePerson.svg)",
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
  plugins: [require("@tailwindcss/line-clamp")],
};
