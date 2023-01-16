import { db__admin } from "../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../utils/apiErrorHandler";
import checkActivePlanHandler from "../../../utils/checkActivePlanHandler";

const hasActivePlan = (handler) => {
	return async (req, res) => {
		try {
			const { uid } = req.currentUser;

			// get active plan
			const docRef__subs = db__admin.collection("subscriptions").doc(uid);
			const getActivePlan = await docRef__subs.get();

			if (!getActivePlan.exists)
				return apiErrorHandler(
					res,
					402,
					"Unsubscribed - (no active plan)",
					`/offers`
				);

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
					"Unsubscribed - (no active plan)",
					`/offers`
				);

			// check for active plan
			const active = checkActivePlanHandler(start, end);
			const matched =
				savedSubDetails.data().subscriptionID === subscriptionID;

			if (!active || !matched)
				return apiErrorHandler(
					res,
					402,
					"Unsubscribed - (no active plan)",
					`/offers`
				);

			// get plan details
			const docRef__plan = db__admin.collection("plans").doc(planID);
			const getSubscribedPlanDetails = await docRef__plan.get();

			req.subscriptionInfos = {
				active,
				isPaid: matched,
				subscriptionID,
				start,
				end,
				plan: getSubscribedPlanDetails.data(),
			};

			return handler(req, res);
		} catch (error) {
			return apiErrorHandler(res, 402, "Unsubscribe", `/offers`);
		}
	};
};

export default hasActivePlan;
