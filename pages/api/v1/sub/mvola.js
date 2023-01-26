import axios from "axios";
import admin, { db__admin } from "../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "./../../../../utils/apiErrorHandler";
import isAuth from "./../_isAuth";
import checkActivePlanHandler from "./../../../../utils/checkActivePlanHandler";

const handler = async (req, res) => {
	try {
		const { uid } = req.currentUser;
		const { planID } = req.body;

		// get plan infos
		const docRef = db__admin.collection("plans").doc(planID);
		const response = await docRef.get();

		if (!response.exists)
			return apiErrorHandler(res, 404, "Plan not found");

		const { price, name: planName } = response.data();

		const amount = price.promo
			? price.promo.toString()
			: price.regular.toString();

		// INITIATE TRANSACTION
		const merchanrpay_URL =
			"https://rohy-server.vercel.app/api/mvola/merchantpay";

		const merchanrpay_fetch = await axios.post(merchanrpay_URL, { amount });
		const merchanrpay_result = merchanrpay_fetch.data;

		if (!merchanrpay_result.success)
			return apiErrorHandler(res, 412, "Cannot initiate a new payment");

		// TRANSACTION STATUS
		const status_URL =
			"https://rohy-server.vercel.app/api/mvola/transaction-status";
		const status_fetch = await axios.get(status_URL);
		const status_result = status_fetch.data;

		if (
			!status_result.success &&
			status_result.payload.status !== "completed" &&
			status_result.payload.serverCorrelationId !==
				merchanrpay_result.payload.serverCorrelationId
		)
			return apiErrorHandler(res, 412, "Transaction status failed");

		// TRANSACTION DETAILS
		const details_URL =
			"https://rohy-server.vercel.app/api/mvola/transaction-details";
		const details_fetch = await axios.get(details_URL);
		const result_details = details_fetch.data;

		if (!result_details.success)
			return apiErrorHandler(res, 412, "Transaction failed");

		// SAVE TRANSACTION
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
			subscription_ID: status_result.payload.objectReference,
			active: true,
			canceled: false,
			details: result_details.payload,
			data: status_result.payload,
			plan: { id: planID, name: planName },
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
		console.log(error);
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(handler);
