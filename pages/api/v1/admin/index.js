import isAuth from "./../_isAuth";
import isAdmin from "./../_isAdmin";
import apiErrorHandler from "../../../../utils/apiErrorHandler";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const adminInfos = req.adminInfos;

		return res.status(200).json({
			success: true,
			message: `Howdy ${adminInfos.displayName}`,
			payload: adminInfos,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isAdmin(handler));
