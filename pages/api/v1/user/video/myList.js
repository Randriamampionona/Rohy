import apiErrorHandler from "./../../../../../utils/apiErrorHandler";
import { db__admin } from "../../../../../lib/firebaseAdmin.config";
import isAuth from "../../auth/_isAuth";

const handler = async (req, res) => {
	if (req.method !== "POST" && req.method !== "DELETE")
		return apiErrorHandler?.(res, 405, "Method not allowed");

	if (req.method === "POST") {
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
				.json({ success: true, message: "Video Saved to MyList" });
		} catch (error) {
			return apiErrorHandler?.(res, 500, error);
		}
	}

	if (req.method === "DELETE") {
		try {
			const { uid } = req.currentUser;
			const docID = req.headers.doc_id;

			const docRef = db__admin
				.collection("users")
				.doc(uid)
				.collection("myList")
				.doc(docID);

			await docRef.delete(docRef);

			return res
				.status(201)
				.json({ success: true, message: "Video deleted from MyList" });
		} catch (error) {
			return apiErrorHandler?.(res, 500, error);
		}
	}
};

export default isAuth?.(handler);
