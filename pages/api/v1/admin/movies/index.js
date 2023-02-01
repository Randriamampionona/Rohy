import isAuth from "./../../_isAuth";
import isAdmin from "./../../_isAdmin";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import { db__admin } from "../../../../../lib/firebaseAdmin.config";
import { combined } from "../../../../../utils/ID_generators";
import videos from "../../../../../mockdata.json";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		// const {} = req.adminInfos
		const { table_page = 1 } = req.headers;

		// get All movies in DB
		// let movies = []
		// const categoriesCollRef = db__admin.collection("videos")
		// const getCategories = await categoriesCollRef.get()

		// getCategories.forEach(async category => {
		// 	try {
		// 		const moviesCollRef = db__admin
		// 			.collection("videos")
		// 			.doc(category.id)
		// 			.collection("movies")

		// 		const getMovies = await moviesCollRef.get()

		// 		getMovies.forEach(movie => {
		// 			movies.push(movie.data())
		// 		})

		// 	} catch (error) {
		// 		return apiErrorHandler(res, 500, error);
		// 	}
		// })

		let movies = Array(75)
			.fill(undefined)
			.map((_) => {
				const { video, ...rest } = videos;
				return rest;
			});

		// getMovies.forEach((movie) => {
		// 	movies.push(movie.data());
		// });

		// 10 movies per request
		const splicedMovies = () => {
			const start = table_page == 1 ? 0 : table_page * 10;
			const end = table_page == 1 ? 10 : start + 10;
			return movies.slice(start, end);
		};

		return res.status(200).json({
			success: true,
			payload: {
				page: table_page || 1,
				total_movies: movies.length,
				total_page: Math.floor(movies.length / 10),
				results: splicedMovies(),
			},
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

// export default isAuth(isAdmin(handler));
export default handler;
