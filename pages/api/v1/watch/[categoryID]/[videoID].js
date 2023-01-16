import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import isAuth from "./../../_isAuth";
import hasActivePlan from "./../../_hasActivePlan";
import videos from "../../../../../mockdata.json";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		// get 1 video from DB
		const { categoryID, videoID } = req.query;
		const subscriptionInfos = req.subscriptionInfos;

		if (!categoryID || !videoID)
			return apiErrorHandler(res, 404, "Video not found");

		const data = {
			...videos,
			category: {
				...videos.category,
				id: +categoryID,
			},
			id: +videoID,
			subscriptionInfos, //just for a test
		};

		return res.status(200).json({ success: true, payload: data });
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(hasActivePlan(handler));
