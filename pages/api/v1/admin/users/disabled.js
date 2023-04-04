import { auth__admin } from "../../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import isAuth from "../../_isAuth";
import isSuperAdmin from "../../_isSuperAdmin";

const handler = async (req, res) => {
	if (req.method !== "PATCH")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { disabled = false } = req.body;
		const { uid } = req.headers;

		// check if user not exist
		const user = await auth__admin.getUser(uid);

		if (!user) return apiErrorHandler(res, 404, "User not found");

		// update user access: disabled
		await auth__admin.updateUser(user.uid, { disabled });

		return res.status(200).json({
			success: true,
			message: `User updated (disabled: ${disabled}`,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isSuperAdmin(handler));
