/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primaryColor: "#b5004d",
				darkColor: "#0f0e13",
				lightDarkColor: "#18171f",
				whiteColor: "#fbfbfb",
				whitesmoke: "#f5f5f5",
			},

			backgroundImage: {
				homeIntroBg: "url('/assets/intro2.jfif')",
			},

			boxShadow: {
				btnShadow: "2px 2px 25px -15px #0e0e13a6",
			},
		},
	},
	plugins: [],
};
