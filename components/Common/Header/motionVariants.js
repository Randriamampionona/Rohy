const motionVariants = {
	growsIn: {
		initial: {
			height: 0,
			opacity: 0,
			top: "3.5rem",
		},
		animate: {
			height: "auto",
			opacity: 1,
			top: "2.5rem",
			transition: {
				type: "tween",
			},
		},
		exit: {
			height: 0,
			opacity: 0,
			top: "3.5rem",
		},
	},
};

export default motionVariants;
