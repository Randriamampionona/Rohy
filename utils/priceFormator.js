const priceFomator = (amount) => {
	let formatter = Intl.NumberFormat("en", {
		notation: "standard",
	});

	return formatter.format(amount).toString().replace(",", ".");
};

export default priceFomator;
