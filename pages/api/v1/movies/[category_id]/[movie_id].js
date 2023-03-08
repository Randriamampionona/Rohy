import { db__admin } from "../../../../../lib/firebaseAdmin.config";
import { Movie } from "../../../../../structures";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import isAuth from "../../_isAuth";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { category_id, movie_id } = req.headers;

		// get movie
		const docRef = db__admin
			.collection("videos")
			.doc(category_id)
			.collection("movies")
			.doc(movie_id);

		const snapshot = await docRef.get();

		if (!snapshot.exists)
			return apiErrorHandler(res, 404, "Movie not found");

		const {
			category,
			adult,
			genre,
			backdrop_path,
			poster_path,
			original_language,
			original_title,
			title,
			overview,
			release_date,
			postBy,
			createdAt,
		} = snapshot.data();

		const movie = new Movie(
			snapshot.id,
			category.name,
			category.id,
			adult,
			backdrop_path,
			poster_path,
			genre.name,
			genre.id,
			original_language,
			original_title,
			title,
			overview,
			release_date,
			"",
			postBy,
			createdAt
		).movie();

		return res.status(200).json({
			success: true,
			payload: movie,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(handler);
