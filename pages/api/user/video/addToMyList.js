import { db__admin } from "../../../../lib/firebaseAdmin.config";
import isAuth from "../../../../middlewares/isAuth";
import apiErrorHandler from "../../../../utils/apiErrorHandler";

const handler = async (req, res) => {
	if (req.method !== "POST")
		return apiErrorHandler?.(res, 405, "Method not allowed");

	try {
		const { uid } = req.currentUser;
		const { videoDetails } = req.body;

		const docRef = db__admin
			.collection("users")
			.doc(uid)
			.collection("myList");

		await docRef.add(videoDetails);

		return res
			.status(201)
			.json({ success: true, message: "Video added to My List" });
	} catch (error) {
		return apiErrorHandler?.(res, 500, error);
	}
};

export default isAuth?.(handler);
