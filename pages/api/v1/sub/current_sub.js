import { db__admin } from "../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../utils/apiErrorHandler";
import getSubscriptionStatus from "../../../../utils/getSubscriptionStatus";
import isAuth from "../_isAuth";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { uid } = req.currentUser;

		// get the current subscription infos
		const currentSubRef = db__admin
			.collection("users")
			.doc(uid)
			.collection("current_subscription")
			.orderBy("created_date", "desc")
			.limit(1);

		const getCurrentSub = await currentSubRef.get();

		if (getCurrentSub?.empty) {
			return res.status(200).json({
				success: true,
				payload: {
					status: null,
					plan_details: null,
				},
			});
		}

		const currentSub = getCurrentSub?.docs?.map((doc) => doc.data());

		// verify subscribed validity plan
		const { active, status } = getSubscriptionStatus(currentSub?.[0]);

		if (!active && status.code !== 1) {
			return res.status(200).json({
				success: true,
				payload: {
					status,
					plan_details: null,
				},
			});
		}

		// get subscribed plan details and additional subscription details
		const planRef = db__admin
			.collection("plans")
			.doc(currentSub?.[0]?.plan.id);

		const subscriptionRef = db__admin
			.collection("subscriptions")
			.doc(currentSub?.[0]?.subscription_ID);

		const planData = await planRef.get();
		const mySubscription = await subscriptionRef.get();

		return res.status(200).json({
			success: true,
			payload: {
				...mySubscription.data(),
				created_date: mySubscription.data().created_date.toDate(),
				plan_details: planData.data(),
			},
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(handler);
