import admin, { db__admin } from "../../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import isAdmin from "../../_isAdmin";
import isAuth from "../../_isAuth";

const handler = async (req, res) => {
	if (req.method !== "PATCH")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { planID } = req.headers;
		const {
			name,
			desc,
			regularPrice,
			promoPrice = null,
			specificity = [],
			order = 0,
		} = req.body;

		const docRef = db__admin.collection("plans").doc(planID);

		// check if plan exist
		const { exists } = await docRef.get();

		if (!exists) return apiErrorHandler(res, 404, "Plan not found");

		// update plan
		const data = {
			name,
			desc,
			"price.regular": regularPrice,
			"price.promo": promoPrice,
			specificity: admin.firestore.FieldValue.arrayUnion(...specificity),
			order,
		};

		await docRef.update(data);

		return res.status(200).json({
			success: true,
			message: "Plan updated",
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isAdmin(handler));
