import apiErrorHandler from "../../../../utils/apiErrorHandler";
import videos from "../../../../mockdata.json";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		// get all matched category videos from DB
		const { page } = req.headers;

		const data = {
			page: page || 1,
			results: Array(15)
				.fill(undefined)
				.map((_) => {
					const { video, ...rest } = videos;
					return rest;
				}),
		};

		return res.status(200).json({ success: true, payload: data });
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default handler;
