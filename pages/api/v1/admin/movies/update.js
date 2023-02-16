import isAuth from "./../../_isAuth";
import isAdmin from "./../../_isAdmin";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import { db__admin } from "../../../../../lib/firebaseAdmin.config";
import { update } from "../../../../../utils/cloudinaryOperations";

const checkUpdate = async (
	res,
	body,
	docRef,
	prevData,
	movieID,
	categoryID,
	videoPublic_id,
	posterPublic_id,
	isVideo = false,
	isPoster = false
) => {
	try {
		// update movie details from firestore
		const updateDetails = async (
			posterSecure_url,
			newPosterPublic_id,
			newVideoPublic_id
		) => {
			try {
				const { video: v, poster: p, movieID, ...rest } = body;
				const data = {
					...rest,
					backdrop_path: posterSecure_url,
					poster_path: posterSecure_url,
					public_ids: {
						poster: newPosterPublic_id,
						video: newVideoPublic_id,
					},
				};
				await docRef.update(data);
			} catch (error) {
				return apiErrorHandler(res, 500, error);
			}
		};

		// update all
		if (isVideo && isPoster) {
			const result1 = await update(
				isVideo,
				"video",
				"Video",
				`videos/${categoryID}`,
				videoPublic_id
			);

			if (result1.error)
				return apiErrorHandler(
					res,
					result1.error.status,
					result1.error.message
				);

			const result2 = await update(
				isPoster,
				"image",
				"Poster",
				`posters/${categoryID}`,
				posterPublic_id
			);

			if (result2.error)
				return apiErrorHandler(
					res,
					result2.error.status,
					result2.error.message
				);

			await updateDetails(
				result2.secure_url,
				result2.public_id,
				result1.public_id
			);

			return res.status(200).json({
				success: true,
				message: `Movie with ID: ${movieID} has been updated successfully`,
			});
		}

		// update video and details
		else if (isVideo) {
			// update video and poster to cloudinary
			const result1 = await update(
				isVideo,
				"video",
				"Video",
				`videos/${categoryID}`,
				videoPublic_id
			);

			if (result1.error)
				return apiErrorHandler(
					res,
					result1.error.status,
					result1.error.message
				);

			await updateDetails(
				prevData.poster_path || prevData.backdrop_path,
				prevData.poster.public_id,
				result1.public_id
			);

			return res.status(200).json({
				success: true,
				message: `Movie with ID: ${movieID} has been updated successfully`,
			});
		}

		// update poster and details
		else if (isPoster) {
			// update video and poster to cloudinary
			const result1 = await update(
				isPoster,
				"image",
				"Poster",
				`posters/${categoryID}`,
				posterPublic_id
			);

			if (result1.error)
				return apiErrorHandler(
					res,
					result1.error.status,
					result1.error.message
				);

			await updateDetails(
				result1.secure_url,
				result1.public_id,
				prevData.video.public_id
			);

			return res.status(200).json({
				success: true,
				message: `Movie with ID: ${movieID} has been updated successfully`,
			});
		}

		// default
		else {
			const result1 = await update(
				isVideo,
				"video",
				"Video",
				`videos/${categoryID}`,
				videoPublic_id
			);

			if (result1.error)
				return apiErrorHandler(
					res,
					result1.error.status,
					result1.error.message
				);

			const result2 = await update(
				isPoster,
				"image",
				"Poster",
				`posters/${categoryID}`,
				posterPublic_id
			);

			if (result2.error)
				return apiErrorHandler(
					res,
					result2.error.status,
					result2.error.message
				);

			await updateDetails(
				result2.secure_url,
				result2.public_id,
				result1.public_id
			);

			return res.status(200).json({
				success: true,
				message: `Movie with ID: ${movieID} has been updated successfully`,
			});
		}
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

const handler = async (req, res) => {
	if (req.method !== "PATCH")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		// const { displayName } = req.adminInfos;
		const {
			movieID,
			category: { name: categoryName, id: categoryID },
			adult,
			poster = null, // base64
			genre: { name: genreName, id: genreID },
			original_language,
			original_title,
			title,
			overview,
			release_date,
			video = null, // base64
		} = req.body;

		// get video from firestore
		const docRef = db__admin
			.collection("videos")
			.doc(categoryID)
			.collection("movies")
			.doc(movieID);

		const { exists, data: movieData } = await docRef.get();

		if (!exists) return apiErrorHandler(res, 404, "Movie not found");

		const { public_ids, ...rest } = movieData();

		await checkUpdate(
			res,
			req.body,
			docRef,
			rest,
			movieID,
			categoryID,
			public_ids.video,
			public_ids.poster,
			!!poster,
			!!video
		);
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isAdmin(handler));
