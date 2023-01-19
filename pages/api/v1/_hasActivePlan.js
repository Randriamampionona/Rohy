import { db__admin } from "../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../utils/apiErrorHandler";
import checkActivePlanHandler from "../../../utils/checkActivePlanHandler";

const hasActivePlan = (handler) => {
	return async (req, res) => {
		try {
			const { uid } = req.currentUser;

			// check if has plan and active
			const subscriptionRef = db__admin
				.collection("subscriptions")
				.doc(uid);

			const mySubscription = await subscriptionRef.get();

			if (
				!mySubscription.exists ||
				!checkActivePlanHandler(mySubscription.data())
			)
				return apiErrorHandler(
					res,
					402,
					"Unsubscribed - (no active plan)"
				);

			// get subscribed plan details
			const planRef = db__admin
				.collection("plans")
				.doc(mySubscription.data()?.plan.id);

			const planData = await planRef.get();

			req.subscriptionInfos = {
				...mySubscription.data(),
				plan_details: planData.data(),
			};

			// next
			return handler(req, res);
		} catch (error) {
			return apiErrorHandler(
				res,
				402,
				"Unsubscribed - (no active plan) "
			);
		}
	};
};

export default hasActivePlan;

// {
//     subscription_ID: transaction_data.orderID,
//     active: true,
//     canceled: false,
//     details: transaction_details,
//     data: transaction_data,
//     plan: { id, name },
//     created_date: admin.firestore.FieldValue.serverTimestamp(),
//     start: Date.now(),
//     end: Date.now() + 3600000, // + 1h for test
// }
