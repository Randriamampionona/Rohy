import isAuth from "./../../_isAuth";
import isAdmin from "./../../_isAdmin";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import { db__admin } from "../../../../../lib/firebaseAdmin.config";
import { Movie, PaginatedApiResponse } from "../../../../../structures";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		// const {} = req.adminInfos
		const { search_terms = null, search_category = null } = req.query;
		const { table_page = 1 } = req.headers;

		// get all category movies from firestore
		const categoriesCollRef = search_category
			? db__admin
					.collection("videos")
					.where("categoryID", "==", search_category)
			: db__admin.collection("videos");

		const getCategories = await categoriesCollRef.get();

		// check if there is movies at all (no category & no movie) returm empty [] if so
		if (getCategories.empty) {
			const response = new PaginatedApiResponse(1, 0, []).response();

			return res.status(200).json({
				success: true,
				payload: response,
			});
		}

		const categories = getCategories.docs.map((doc) => doc.id);

		// get all movies by its category from firestore
		const moviesArray = categories.map(async (ID) => {
			const collRef = search_terms
				? db__admin
						.collection("videos")
						.doc(ID)
						.collection("movies")
						.where("title", "==", search_terms)
				: db__admin.collection("videos").doc(ID).collection("movies");

			const snapshot = await collRef.get();

			const moviesArray = snapshot.docs.map((doc) => {
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

			return moviesArray;
		});

		const movies = (await moviesArray[0]).map((movie) => movie);

		const response = new PaginatedApiResponse(
			table_page,
			movies.length,
			movies
		).response();

		return res.status(200).json({
			success: true,
			payload: response,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isAdmin(handler));
