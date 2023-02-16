import { db__admin } from "../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../utils/apiErrorHandler";
import getSubscriptionStatus from "../../../utils/getSubscriptionStatus";

const hasActivePlan = (handler) => {
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

			// error out if no active plan
			if (getCurrentSub?.empty) {
				return apiErrorHandler(
					res,
					402,
					"Unsubscribed - (no active plan)"
				);
			}

			const currentSub = getCurrentSub?.docs?.map((doc) => doc.data());

			// verify subscribed validity plan
			const { active, status } = getSubscriptionStatus(currentSub?.[0]);

			if (!active && status.code !== 1) {
				return apiErrorHandler(
					res,
					402,
					`You don't apear to have an active plan or the current plan has been ${status.text} (code: ${status.code})`
				);
			}

			// get subscribed plan details and additional subscription details
			const planRef = db__admin
				.collection("plans")
				.doc(currentSub?.[0]?.plan.id);

			const subscriptionRef = db__admin
				.collection("subscriptions")
				.doc(currentSub?.[0]?.subscription_ID);

			const planData = await planRef.get();
			const mySubscription = await subscriptionRef.get();

			req.subscriptionInfos = {
				...mySubscription.data(),
				plan_details: planData.data(),
			};

			// next
			return handler(req, res);
		} catch (error) {
			return apiErrorHandler(res, 402, "Unsubscribed - (no active plan)");
		}
	};
};

export default hasActivePlan;

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
