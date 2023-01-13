import admin, { db__admin } from "../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../utils/apiErrorHandler";
import isAuth from "./../_isAuth";

const handler = async (req, res) => {
	if (req.method !== "POST" && req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	if (req.method === "POST") {
		try {
			const { uid } = req.currentUser;
			const { details, data, planID } = req.body;

			const docRef = db__admin.collection("subscriptions").doc(uid);
			const DATA = {
				subscriptionID: data.orderID,
				details,
				data,
				date: admin.firestore.FieldValue.serverTimestamp(),
				start: Date.now(),
				end: Date.now() + 259200000, // +3days
				active: true,
				planID,
			};

			await docRef.set(DATA, { merge: true });

			return res.status(200).json({
				success: true,
				message: "Subscription done, Enjoy 🤗",
			});
		} catch (error) {
			return apiErrorHandler(res, 500, error);
		}
	}

	if (req.method === "GET") {
		try {
			const { uid } = req.currentUser;

			// get active plan
			const docRef__sub = db__admin.collection("subscriptions").doc(uid);
			const getActivePlan = await docRef__sub.get();

			if (!getActivePlan.exists)
				return res.status(200).json({
					success: true,
					payload: {
						active: false,
						details: null,
					},
				});

			const { planID, active } = getActivePlan.data();

			// get plan details
			const docRef__plan = db__admin.collection("plans").doc(planID);
			const getActivePlanDetails = await docRef__plan.get();

			return res.status(200).json({
				success: true,
				payload: {
					active,
					details: active ? getActivePlanDetails.data() : null,
				},
			});
		} catch (error) {
			return apiErrorHandler(res, 500, error);
		}
	}
};

export default isAuth(handler);
