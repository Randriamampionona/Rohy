export const random = (length = 5) => {
	return require("crypto").randomBytes(length).toString("hex");
};

export const combined = (first = "", second = "", separator = "__") => {
	return first + separator + second;
};
