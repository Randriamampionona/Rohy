import { db__admin } from "../../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import isAdmin from "../../_isAdmin";
import isAuth from "./../../_isAuth";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { planID } = req.query;
		const docRef = db__admin.collection("plans").doc(planID);
		const data = await docRef.get();

		if (!data.exists) return apiErrorHandler(res, 404, "Plan not found");

		return res.status(200).json({
			success: true,
			payload: {
				planID: data.id,
				...data.data(),
				dateCreated: data.data().dateCreated.toDate(),
			},
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isAdmin(handler));
