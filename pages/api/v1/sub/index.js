import { db__admin } from "../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../utils/apiErrorHandler";
import checkActivePlanHandler from "../../../../utils/checkActivePlanHandler";
import isAuth from "../_isAuth";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { uid } = req.currentUser;

		// get active plan
		const docRef__subs = db__admin.collection("subscriptions").doc(uid);
		const getActivePlan = await docRef__subs.get();

		if (!getActivePlan.exists)
			return res.status(200).json({
				success: true,
				payload: {
					active: false,
					details: null,
				},
			});

		const { subscriptionID, planID, start, end } = getActivePlan.data();

		// get saved sub details
		const docRef__sub = db__admin
			.collection("users")
			.doc(uid)
			.collection("subscription")
			.doc(subscriptionID);

		const savedSubDetails = await docRef__sub.get();

		if (!savedSubDetails.exists)
			return apiErrorHandler(
				res,
				402,
				"You don't have an active plan",
				"/offers"
			);

		// check for active plan
		const active = checkActivePlanHandler(start, end);
		const matched =
			savedSubDetails.data().subscriptionID === subscriptionID;
		if (!active || !matched)
			return apiErrorHandler(
				res,
				402,
				"You don't have an active plan",
				"/offers"
			);

		// get plan details
		const docRef__plan = db__admin.collection("plans").doc(planID);
		const getSubscribedPlanDetails = await docRef__plan.get();

		return res.status(200).json({
			success: true,
			payload: {
				active,
				isPaid: matched,
				subscriptionID,
				start,
				end,
				details: getSubscribedPlanDetails.data(), //plan
			},
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(handler);
