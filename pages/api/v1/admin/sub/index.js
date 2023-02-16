import isAuth from "./../../_isAuth";
import isAdmin from "./../../_isAdmin";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import { db__admin } from "../../../../../lib/firebaseAdmin.config";
import { AdminResponseApi } from "../../../../../structures";
import getSubscriptionStatus from "../../../../../utils/getSubscriptionStatus";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		// const {  } = req.adminInfos
		const { table_page = 1 } = req.headers;

		// get all subscriptions
		const colRef = db__admin.collection("subscriptions");

		const { empty, docs } = await colRef.get();

		const subscriptions = docs.map((doc) => {
			// get sub status
			const { status } = getSubscriptionStatus(doc.data());

			return {
				...doc.data(),
				status,
			};
		});

		const response = new AdminResponseApi(
			table_page,
			empty ? 0 : subscriptions.length,
			empty ? [] : subscriptions
		).response();

		return res.status(200).json({
			success: true,
			payload: response,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isAdmin(handler));

// {
//     subscription_ID: transaction_data.orderID,
//     status: {
// 		text: "active",
// 		code: 1,
// 	   },
//     details: transaction_details,
//     data: transaction_data,
//     plan: { id, name },
//     created_date: admin.firestore.FieldValue.serverTimestamp(),
//     start: Date.now(),
//     end: Date.now() + 3600000, // + 1h for test
//	   owner
// }
