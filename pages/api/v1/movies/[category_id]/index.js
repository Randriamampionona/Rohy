import { db__admin } from "../../../../../lib/firebaseAdmin.config";
import { Movie, PaginatedApiResponse } from "../../../../../structures";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import isAuth from "../../_isAuth";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { table_page = 1, category_id } = req.headers;

		// get all movies by the given category_id
		const docRef = db__admin.collection("videos").doc(category_id);

		const getCategory = await docRef.get();

		// check if category exist, return [] if so
		if (!getCategory.exists) {
			const response = new PaginatedApiResponse(1, 0, [], 20).response();

			return res.status(200).json({
				success: true,
				payload: response,
			});
		}

		// get movies
		const collectionRef = docRef.collection("movies");

		const moviesSnapshot = await collectionRef.get();

		if (moviesSnapshot.empty) {
			const response = new PaginatedApiResponse(1, 0, [], 20).response();

			return res.status(200).json({
				success: true,
				payload: response,
			});
		}

		const movies = moviesSnapshot.docs.map((doc) => {
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
			} = doc.data();

			return new Movie(
				doc.id,
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
		});

		const response = new PaginatedApiResponse(
			table_page,
			movies.length,
			movies,
			20
		).response();

		return res.status(200).json({
			success: true,
			payload: response,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(handler);
