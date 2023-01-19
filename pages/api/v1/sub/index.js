import { db__admin } from "../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../utils/apiErrorHandler";
import checkActivePlanHandler from "../../../../utils/checkActivePlanHandler";
import isAuth from "../_isAuth";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { uid } = req.currentUser;

		// check if has plan and active
		const subscriptionRef = db__admin.collection("subscriptions").doc(uid);

		const mySubscription = await subscriptionRef.get();

		if (
			!mySubscription.exists ||
			!checkActivePlanHandler(mySubscription.data())
		)
			return res.status(200).json({
				success: true,
				payload: {
					active: false,
					plan_details: null,
				},
			});

		// get subscribed plan details
		const planRef = db__admin
			.collection("plans")
			.doc(mySubscription.data()?.plan.id);

		const planData = await planRef.get();

		req.subscriptionInfos = {};

		return res.status(200).json({
			success: true,
			payload: {
				...mySubscription.data(),
				plan_details: planData.data(),
			},
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(handler);

// {
//     subscription_ID: transaction_data.orderID,
//     active: true,
// 	   canceled: false,
//     details: transaction_details,
//     data: transaction_data,
//     plan: { id, name },
//     created_date: admin.firestore.FieldValue.serverTimestamp(),
//     start: Date.now(),
//     end: Date.now() + 3600000, // + 1h for test
// }

// {
// 	name: "Basic",
// 	desc: "desc",
// 	price: {
// 		regular: 15000,
// 		promo: null,
// 	},
// 	specificity: [
// 		"Full support 24/7",
// 		"Best quality",
// 		"Watch on TV",
// 		"Full HD",
// 		"Cancel at anytime",
// 	],
// 	order: 1,
// }
