import isAuth from "./../../_isAuth";
import isAdmin from "./../../_isAdmin";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import {
	auth__admin,
	db__admin,
} from "../../../../../lib/firebaseAdmin.config";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { uid } = req.query;

		// check if user not exist
		const user = await auth__admin.getUser(uid);

		if (!user) return apiErrorHandler(res, 404, "User not found");

		// get addition data
		const docRef = db__admin.collection("users").doc(user.uid);

		const getUser = await docRef.get();

		return res.status(200).json({
			success: true,
			payload: {
				...getUser.data(),
				...user,
				role: getUser.data()?.role?.name || "user",
				joinedOn: getUser.data().joinedOn.toDate(),
			},
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isAdmin(handler));
