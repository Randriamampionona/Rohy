import isAuth from "./../../_isAuth";
import isAdmin from "./../../_isAdmin";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import { db__admin } from "../../../../../lib/firebaseAdmin.config";
import { upload } from "../../../../../utils/cloudinaryOperations";
import { random, combined } from "../../../../../utils/ID_generators";

// for deblocking 413 Body exceeded 1mb limit
export const config = { api: { bodyParser: { sizeLimit: "999999999mb" } } };

const handler = async (req, res) => {
	if (req.method !== "POST")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { displayName } = req.adminInfos;

		const {
			category: { name: categoryName },
			adult,
			poster, // base64
			genre: { name: genreName },
			original_language,
			original_title,
			title,
			overview,
			release_date,
			video, // base64
		} = req.body;

		const categoryID = combined(categoryName, categoryName);
		const genreID = combined(genreName, genreName);

		// upload video and poster to cloudinary
		const result1 = await upload(video, "video", `videos/${categoryID}`, [
			"mp4",
			"mkv",
			"webm",
		]);

		if (result1.error)
			return apiErrorHandler(
				res,
				result1.error.status,
				result1.error.message
			);

		const result2 = await upload(poster, "image", `posters/${categoryID}`, [
			"png",
			"jpeg",
			"jpg",
			"webp",
		]);

		if (result2.error)
			return apiErrorHandler(
				res,
				result2.error.status,
				result2.error.message
			);

		// create category if not exit or update total_movies if already exist
		const categoryRef = db__admin.collection("videos").doc(categoryID);

		const isCategoryExist = await categoryRef.get();

		if (!isCategoryExist.exists) {
			await categoryRef.set({
				categoryID,
				total_movies: 1,
				createdAt: new Date().toISOString(),
			});
		}

		await categoryRef.update({
			total_movies: +isCategoryExist.data()?.total_movies + 1,
		});

		// save video details into firestore
		const movieID = random();

		const docRef = categoryRef.collection("movies").doc(movieID);

		const movie = await docRef.get();

		// check if movie already exist
		if (movie.exists)
			return apiErrorHandler(res, 400, "Movie already exist");

		// add movie
		const { video: v, poster: p, ...rest } = req.body;
		const data = {
			...rest,
			category: {
				...rest.category,
				id: categoryID,
			},
			genre: {
				...rest.genre,
				id: genreID,
			},
			backdrop_path: result2.secure_url,
			poster_path: result2.secure_url,
			public_ids: {
				poster: result2.public_id,
				video: result1.public_id,
			},
			postBy: displayName,
			createdAt: new Date().toISOString(),
		};
		await docRef.set(data);

		return res.status(201).json({
			success: true,
			message: `New movie has been created (ID: ${movieID})`,
			payload: data,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isAdmin(handler));
