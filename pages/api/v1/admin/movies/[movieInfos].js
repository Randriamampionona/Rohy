import { db__admin } from "../../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import isAuth from "./../../_isAuth";
import isAdmin from "./../../_isAdmin";
import video from "../../../../../mockdata.json";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		// const {} = req.adminInfos
		const { movieInfos } = req.query;

		if (!movieInfos) return apiErrorHandler(res, 404, "Movie not found");

		const decodedInfos = movieInfos.split("__");
		const categoryID = decodedInfos[0];
		const movieID = decodedInfos[1];

		// const docRef = db__admin
		//     .collection("videos")
		//     .doc(categoryID)
		//     .collection("videos")
		//     .doc(movieID)

		// const getMovieInfos = await docRef.get()

		// if (!getMovieInfos.exists) return apiErrorHandler(res, 404, "Movie not found")

		const movie = video;

		return res.status(200).json({
			success: true,
			// payload: getMovieInfos.data()
			categoryID,
			movieID,
			payload: movie,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isAdmin(handler));
// export default handler;
