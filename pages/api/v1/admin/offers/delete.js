import { db__admin } from "../../../../../lib/firebaseAdmin.config";
import isAuth from "./../../_isAuth";
import isAdmin from "./../../_isAdmin";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { planID } = req.header();

		const docRef = db__admin.collection("plans").doc(planID);

		// check if plan exist
		const { exists, id } = await docRef.get();

		if (!exists) return apiErrorHandler(res, 404, "Plan not found");

		// delete plan from db
		await docRef.delete();

		return res.status(200).json({
			success: true,
			message: `The plan with ID: ${id} has been deleted`,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isAdmin(handler));
