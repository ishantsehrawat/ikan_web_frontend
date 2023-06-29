/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        saffron: "#FE9D66",
        cgreen: "#128807",
        cblue: "#000088",
        cgrey: "#F9F9F9",
        bluegrey: "#2A2C38",
        lightsaffron: "#FED7B5",
        textblue: "#111C85",
      },
      fontSize: {
        "2xs": "0.6rem",
      },
      backgroundImage: {
        notfound: "url('images/notfound.png')",
        aboutHeader: "url('images/about us.jpg')",
        eventHeader: "url('images/eventsheader.jpg')",
        donateBG: "url('images/donateheader.jpg')",
        eventDetail: "url('images/eventdeets.jpg')",
        profileHeader: "url('images/profile.jpg')",
        donateHeader: "url('images/support.jpg')",
        skillupHeader: "url('images/skill.jpg')",
        comingSoon: "url('images/comingSoon.png')",
        verifyEmail: "url('images/verifyEmail.png')",
        exploreCounterBG: "url('images/ExploreCounterBG.jpg')",
      },
    },
  },
  plugins: [],
};
