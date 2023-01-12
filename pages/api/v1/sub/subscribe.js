import apiErrorHandler from "../../../../utils/apiErrorHandler";

const handler = async (req, res) => {
	if (req.method !== "POST")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		return res.status(200).json({
			success: true,
			message: "Subscribed",
			payload: {},
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default handler;
