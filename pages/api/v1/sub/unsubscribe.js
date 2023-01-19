import { db__admin } from "../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../utils/apiErrorHandler";
import isAuth from "../_isAuth";
import hasActivePlan from "./../_hasActivePlan";

const handler = async (req, res) => {
	if (req.method !== "PATCH")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { uid } = req.currentUser;

		// update subscription
		const subscriptionRef = db__admin.collection("subscriptions").doc(uid);

		const unsubscriptionData = {
			active: false,
			canceled: true,
			end: Date.now(),
		};

		await subscriptionRef.update(unsubscriptionData);

		return res.status(200).json({
			success: true,
			message: "Unsubscription done",
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(hasActivePlan(handler));

// {
// 	subscription_ID: transaction_data.orderID,
// 	active: true,
// 	canceled: false,
// 	details: transaction_details,
// 	data: transaction_data,
// 	plan: { id, name },
// 	created_date: admin.firestore.FieldValue.serverTimestamp(),
// 	start: Date.now(),
// 	end: Date.now() + 3600000, // + 1h for test
// }
