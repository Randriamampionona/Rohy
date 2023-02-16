import isAuth from "./../../_isAuth";
import isAdmin from "./../../_isAdmin";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import { db__admin } from "../../../../../lib/firebaseAdmin.config";
import getSubscriptionStatus from "../../../../../utils/getSubscriptionStatus";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		// const {  } = req.adminInfos
		const { sub_id } = req.query;

		// get subscription from subs historique
		const docRef = db__admin.collection("subscriptions").doc(sub_id);

		const getSubscription = await docRef.get();

		if (!getSubscription.exists)
			return apiErrorHandler(res, 404, "Subscription not found");

		// get sub status
		const { status } = getSubscriptionStatus(getSubscription.data());

		// get subscribed plan details
		const planRef = db__admin
			.collection("plans")
			.doc(getSubscription.data()?.plan.id);

		const planData = await planRef.get();

		if (!planData.exists)
			return apiErrorHandler(res, 404, "Plan not found");

		return res.status(200).json({
			success: true,
			payload: {
				...getSubscription.data(),
				status,
				plan_details: planData.data(),
			},
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isAdmin(handler));
