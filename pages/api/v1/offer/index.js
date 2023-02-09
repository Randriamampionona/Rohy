import { db__admin } from "../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../utils/apiErrorHandler";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const collectionRef = db__admin.collection("plans");
		const getPlansList = await collectionRef.orderBy("order", "asc").get();

		if (getPlansList.empty) return apiErrorHandler(res, 400, "No plans");

		let data = [];

		getPlansList.forEach((doc) => {
			data.push({
				planID: doc.id,
				...doc.data(),
				dateCreated: doc.data().dateCreated.toDate(),
			});
		});

		res.status(200).json({
			success: true,
			payload: data,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default handler;
