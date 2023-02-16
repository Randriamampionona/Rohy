export const random = (length = 5) => {
	return require("crypto").randomBytes(length).toString("hex");
};

export const combined = (
	firstPart,
	secondePart = "",
	separator = "--",
	length = 5
) => {
	const hash = !!secondePart.trim()
		? btoa(secondePart).replaceAll("=", "0").replaceAll("/", "0")
		: require("crypto").randomBytes(length).toString("hex");

	return firstPart.toLowerCase().replaceAll(" ", "-") + separator + hash;
};
