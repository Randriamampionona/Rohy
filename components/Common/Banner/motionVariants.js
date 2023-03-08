const motionVariants = {
	showsUp: {
		initial: {
			bottom: "-5rem",
		},
		animate: {
			bottom: 0,
			transition: {
				type: "tween",
			},
		},
		exit: {
			bottom: "-5rem",
		},
	},
};

export default motionVariants;
