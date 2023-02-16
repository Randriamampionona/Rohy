import axios from "axios";
import admin, { db__admin } from "../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "./../../../../utils/apiErrorHandler";
import isAuth from "./../_isAuth";
import { random } from "./../../../../utils/ID_generators";
import hasNoActivePlan from "../_hasNoActivePlan";

const handler = async (req, res) => {
	if (req.method !== "POST")
		return apiErrorHandler(res, 405, "Method not allowed");

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

		// // INITIATE TRANSACTION
		// const merchanrpay_URL =
		// 	"https://rohy-server.vercel.app/api/mvola/merchantpay";

		// const merchanrpay_fetch = await axios.post(merchanrpay_URL, { amount });
		// const merchanrpay_result = merchanrpay_fetch.data;

		// if (!merchanrpay_result.success)
		// 	return apiErrorHandler(res, 412, "Cannot initiate a new payment");

		// // TRANSACTION STATUS
		// const status_URL =
		// 	"https://rohy-server.vercel.app/api/mvola/transaction-status";
		// const status_fetch = await axios.get(status_URL);
		// const status_result = status_fetch.data;

		// if (
		// 	!status_result.success &&
		// 	status_result.payload.status !== "completed" &&
		// 	status_result.payload.serverCorrelationId !==
		// 		merchanrpay_result.payload.serverCorrelationId
		// )
		// 	return apiErrorHandler(res, 412, "Transaction status failed");

		// // TRANSACTION DETAILS
		// const details_URL =
		// 	"https://rohy-server.vercel.app/api/mvola/transaction-details";
		// const details_fetch = await axios.get(details_URL);
		// const result_details = details_fetch.data;

		// if (!result_details.success)
		// 	return apiErrorHandler(res, 412, "Transaction failed");

		// SAVE subscriptions & current_subscription
		const subscription_ID = random();

		const currentSubRef = db__admin
			.collection("users")
			.doc(uid)
			.collection("current_subscription")
			.doc(subscription_ID);

		const historiqueRef = db__admin
			.collection("subscriptions")
			.doc(subscription_ID);

		const subscriptionData = {
			subscription_ID,
			data: "transaction data goes here",
			details: {
				text: "transaction details goes here",
				amount,
			},
			status: {
				text: "active",
				code: 1,
			},
			owner: uid,
			plan: { id: planID, name: planName },
			created_date: admin.firestore.FieldValue.serverTimestamp(),
			start: Date.now(),
			end:
				process.env.NODE_ENV === "production"
					? Date.now() + Number(process.env.NEXT_SUBSCRIPTION_PERIOD) // + 31 days
					: Date.now() +
					  Number(process.env.NEXT_DEV_SUBSCRIPTION_PERIOD), // + 1h for the test
		};

		const { details, data, owner, ...rest } = subscriptionData;

		await currentSubRef.create(rest);

		await historiqueRef.create(subscriptionData);

		return res.status(201).json({
			success: true,
			message: "Subscription done! Enjoy 🤗",
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(hasNoActivePlan(handler));
