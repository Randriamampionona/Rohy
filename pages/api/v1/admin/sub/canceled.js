import isAuth from "./../../_isAuth";
import isAdmin from "./../../_isAdmin";

const handler = async (req, res) => {
	if (req.method !== "PATCH")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { sub_id } = req.headers;

		// update current subscription and subscriptions historique
		const currentSubscriptionRef = db__admin
			.collection("users")
			.doc(uid)
			.collection("current_subscription")
			.doc(sub_id);

		const subscriptionsRef = db__admin
			.collection("subscriptions")
			.doc(sub_id);

		const data = {
			"status.text": "canceled",
			"status.code": 2,
		};

		const promise1 = currentSubscriptionRef.update(data);
		const promise2 = subscriptionsRef.update(data);

		await Promise.all([promise1, promise2]);

		return res.status(200).json({
			success: true,
			message: `Subscription canceled (sub_id: ${sub_id})`,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isAdmin(handler));
