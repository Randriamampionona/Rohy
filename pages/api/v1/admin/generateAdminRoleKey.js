import apiErrorHandler from "../../../../utils/apiErrorHandler";
import generateTokenHandler from "../../../../utils/generateTokenHandler";
import isAuth from "./../_isAuth";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		// generate new role token
		const rolePayload = {
			key: process.env.NEXT_ADMIN_ROLE_KEY,
			name: "ADMIN",
		};
		const newRoleToken = generateTokenHandler(rolePayload);

		return res.status(200).json({
			success: true,
			payload: newRoleToken,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(handler);
