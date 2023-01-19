import apiErrorHandler from "./../../../../utils/apiErrorHandler";
import mvola from "../../../../utils/mvola";

const handler = async (req, res) => {
	if (req.method !== "POST")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const r = await mvola();

		return res.status(201).json({
			success: true,
			payload: r,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default handler;
