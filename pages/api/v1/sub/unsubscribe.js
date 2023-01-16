import { db__admin } from "../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../utils/apiErrorHandler";
import isAuth from "../_isAuth";
import hasActivePlan from "./../_hasActivePlan";

const handler = async (req, res) => {
	if (req.method !== "PATCH")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { uid } = req.currentUser;
		const { subscriptionID } = req.subscriptionInfos;
		const unsubType = req.headers.type || "expire";

		// cancel sub (canceled: true)
		const docRef__sub = db__admin
			.collection("users")
			.doc(uid)
			.collection("subscription")
			.doc(subscriptionID);

		const DATA = {
			[unsubType === "cancel" ? "canceled" : "expired"]: true,
		};

		await docRef__sub.update(DATA);

		// delete subs
		const docRef__subs = db__admin.collection("subscriptions").doc(uid);
		await docRef__subs.delete();

		return res.status(200).json({
			success: true,
			message: `Subscription ${
				unsubType === "cancel" ? "canceled" : "expired"
			}`,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(hasActivePlan(handler));
