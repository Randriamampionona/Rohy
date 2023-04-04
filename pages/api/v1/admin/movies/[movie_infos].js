import { db__admin } from "../../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import isAuth from "../../_isAuth";
import isAdmin from "../../_isAdmin";
import { getOne } from "../../../../../utils/cloudinaryOperations";
import { Movie } from "../../../../../structures";
import { getQueries } from "../../../../../utils/movieInfosLink";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		// const {} = req.adminInfos
		const { movie_infos } = req.query;

		if (!movie_infos) return apiErrorHandler(res, 404, "Movie not found");

		const { categoryID, movieID } = getQueries(movie_infos);

		// get movie from firestore
		const docRef = db__admin
			.collection("videos")
			.doc(categoryID)
			.collection("movies")
			.doc(movieID);

		const getMovie = await docRef.get();

		if (!getMovie.exists)
			return apiErrorHandler(res, 404, "Movie not found");

		// get video URL from cloudinary
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
			public_ids,
			release_date,
			postBy,
			createdAt,
		} = getMovie.data();

		const result = await getOne(
			"Video",
			`videos/${categoryID}`,
			public_ids.video
		);

		if (result.error)
			return apiErrorHandler(
				res,
				result.error.status,
				result.error.message
			);

		const movie = new Movie(
			getMovie.id,
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
			result.data?.secure_url || result.data,
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

export default isAuth(isAdmin(handler));
