const motionVariants = {
	showsIn: {
		initial: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
			transition: {
				type: "tween",
				when: "beforeChildren",
				delayChildren: 0.25,
				staggerChildren: 0.25,
			},
		},
		exit: {
			opacity: 0,
		},
	},

	slidesIn: {
		initial: {
			x: "20rem",
		},
		animate: {
			x: 0,
			transition: {
				type: "tween",
			},
		},
		exit: {
			x: "20rem",
		},
	},
};

export default motionVariants;
