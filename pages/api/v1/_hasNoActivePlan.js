import { db__admin } from "../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../utils/apiErrorHandler";
import getSubscriptionStatus from "../../../utils/getSubscriptionStatus";

const hasNoActivePlan = (handler) => {
	return async (req, res) => {
		try {
			const { uid } = req.currentUser;

			// get the current subscription infos
			const currentSubRef = db__admin
				.collection("users")
				.doc(uid)
				.collection("current_subscription")
				.orderBy("created_date", "desc")
				.limit(1);

			const getCurrentSub = await currentSubRef.get();

			// go next if has no plan
			if (getCurrentSub?.empty) return handler(req, res);

			const currentSub = getCurrentSub?.docs?.map((doc) => doc.data());

			// verify if existing plan active
			const { active, status } = getSubscriptionStatus(currentSub[0]);

			if (active && status.code === 1) {
				return apiErrorHandler(
					res,
					403,
					`You are already subscribed to a ${currentSub[0]?.plan.name.toUpperCase()} plan`
				);
			}

			// go next if not
			return handler(req, res);
		} catch (error) {
			return apiErrorHandler(
				res,
				403,
				"Seems like you already have an active plan"
			);
		}
	};
};

export default hasNoActivePlan;

// current sub data
// {
//     subscription_ID: "",
//     plan: { id: planID, name: planName },
//     status: {
//         text: "active",
//         code: 1,
//     },
//     start: "",
//     end : "",
//     created_date: ""
// }
