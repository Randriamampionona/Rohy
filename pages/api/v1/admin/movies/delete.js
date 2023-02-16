import isAuth from "./../../_isAuth";
import isAdmin from "./../../_isAdmin";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import { db__admin } from "../../../../../lib/firebaseAdmin.config";
import { deleteOne } from "../../../../../utils/cloudinaryOperations";

const handler = async (req, res) => {
	if (req.method !== "DELETE")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		// const { displayName } = req.adminInfos;
		const { categoryID, movieID } = req.headers;

		// get video from firestore
		const docRef = db__admin
			.collection("videos")
			.doc(categoryID)
			.collection("movies")
			.doc(movieID);

		const { exists, data: movieData } = await docRef.get();

		if (!exists) return apiErrorHandler(res, 404, "Movie not found");

		const { public_ids } = movieData();

		// delete video and poster from cloudinary
		const result1 = await deleteOne(
			"Video",
			`videos/${categoryID}}`,
			public_ids.video
		);

		if (result1.error)
			return apiErrorHandler(
				res,
				result1.error.status,
				result1.error.message
			);

		const result2 = await deleteOne(
			"Poster image",
			`posters/${categoryID}}`,
			public_ids.poster
		);

		if (result2.error)
			return apiErrorHandler(
				res,
				result2.error.status,
				result2.error.message
			);

		// delete video and poster from firestore
		await docRef.delete();

		return res.status(200).json({
			success: true,
			message: `Movie with ID: ${movieID} has been deleted successfully`,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isAdmin(handler));
