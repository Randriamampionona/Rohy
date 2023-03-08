import { db__admin } from "../../../../../lib/firebaseAdmin.config";
import { PaginatedApiResponse } from "../../../../../structures";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import isAdmin from "../../_isAdmin";
import isAuth from "./../../_isAuth";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { table_page = 1 } = req.headers;

		const collectionRef = db__admin.collection("plans");
		const getPlansList = await collectionRef.orderBy("order", "asc").get();

		if (getPlansList.empty) return apiErrorHandler(res, 400, "No plans");

		const data = getPlansList.docs.map((doc) => ({
			planID: doc.id,
			...doc.data(),
			dateCreated: doc.data().dateCreated.toDate(),
		}));

		const response = new PaginatedApiResponse(
			table_page,
			data.length,
			data
		).response();

		res.status(200).json({
			success: true,
			payload: response,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isAdmin(handler));
