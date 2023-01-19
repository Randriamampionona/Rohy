import admin, { db__admin } from "../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../utils/apiErrorHandler";
import checkActivePlanHandler from "../../../../utils/checkActivePlanHandler";
import isAuth from "./../_isAuth";

const handler = async (req, res) => {
	if (req.method !== "POST")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { uid } = req.currentUser;
		const {
			details: transaction_details,
			data: transaction_data,
			plan: { id, name },
		} = req.body;

		const subscriptionRef = db__admin.collection("subscriptions").doc(uid);

		// check if already subscribed to a plan
		const mySubscription = await subscriptionRef.get();

		if (
			mySubscription.exists &&
			checkActivePlanHandler(mySubscription.data())
		)
			return res.status(200).json({
				success: true,
				message: `You are already subscribed to ${mySubscription
					.data()
					?.plan.name.toUpperCase()} plan`,
			});

		// save transaction details & subscription details
		const subscriptionData = {
			subscription_ID: transaction_data.orderID,
			active: true,
			canceled: false,
			details: transaction_details,
			data: transaction_data,
			plan: { id, name },
			created_date: admin.firestore.FieldValue.serverTimestamp(),
			start: Date.now(),
			end: Date.now() + 3600000, // + 1h for test
		};

		await subscriptionRef.set(subscriptionData);

		return res.status(201).json({
			success: true,
			message: "Subscription done! Enjoy 🤗",
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(handler);
