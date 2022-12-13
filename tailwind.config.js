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
			},

			backgroundImage: {
				homeIntroBg: "url('/assets/intro2.jfif')",
			},
		},
	},
	plugins: [],
};
