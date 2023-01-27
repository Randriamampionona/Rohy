import isAuth from "./../../_isAuth";
import isAdmin from "./../../_isAdmin";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import { db__admin } from "../../../../../lib/firebaseAdmin.config";

const handler = async (req, res) => {
	try {
		// const {} = req.adminInfos;
		const {
			id: movieID,
			category: { name: categoryName, id: categoryID },
			adult,
			backdrop_path,
			poster_path,
			genre: { name: genreName, id: genreID },
			original_language,
			original_title,
			title,
			overview,
			release_date,
			video: { url },
		} = req.body;

		const docRef = db__admin
			.collection("all_movies")
			.doc(categoryID)
			.collection("movies")
			.doc(movieID);

		const movie = await docRef.get();

		// check if movie already exist
		if (movie.exists)
			return apiErrorHandler(res, 400, "Movie already exist");

		// add movie
		await docRef.set(req.body);

		return res.status(201).json({
			success: true,
			message: `New movie added (ID: ${movieID})`,
			payload: req.body,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isAdmin(handler));
