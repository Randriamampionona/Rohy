const generateLink = (categoryID, movieID) => {
	const combined = `${categoryID}__${movieID}`;

	return combined.toString();
};

const getQueries = (link = "") => {
	const decodedInfos = link.split("__");
	const categoryID = decodedInfos[0];
	const movieID = decodedInfos[1];

	return { categoryID, movieID };
};

export { generateLink, getQueries };
