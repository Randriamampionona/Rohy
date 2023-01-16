import admin, { db__admin } from "../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../utils/apiErrorHandler";
import isAuth from "./../_isAuth";

const handler = async (req, res) => {
	if (req.method !== "POST")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { uid } = req.currentUser;
		const { details, data, planID } = req.body;

		// set subscription
		const docRef = db__admin.collection("subscriptions").doc(uid);
		const subs__DATA = {
			subscriptionID: data.orderID,
			details,
			data,
			date: admin.firestore.FieldValue.serverTimestamp(),
			start: Date.now(),
			end: Date.now() + 259200000, // +3days
			planID,
		};

		await docRef.set(subs__DATA, { merge: true });

		// save subscription details
		const docRef2 = db__admin
			.collection("users")
			.doc(uid)
			.collection("subscription")
			.doc(data.orderID);
		const sub__DATA = {
			subscriptionID: data.orderID,
			date: admin.firestore.FieldValue.serverTimestamp(),
			start: Date.now(),
			end: Date.now() + 259200000, // +3days
			planID,
		};

		await docRef2.create(sub__DATA);

		return res.status(200).json({
			success: true,
			message: "Subscription done, Enjoy 🤗",
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(handler);
