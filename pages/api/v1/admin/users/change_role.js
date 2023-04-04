import {
	auth__admin,
	db__admin,
} from "../../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import generateTokenHandler from "../../../../../utils/generateTokenHandler";
import isSuperAdmin from "../../_isSuperAdmin";
import isAuth from "../../_isAuth";

const handler = async (req, res) => {
	if (req.method !== "PATCH")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { role = 3 } = req.body;
		const { uid } = req.headers;

		// check if user not exist
		const user = await auth__admin.getUser(uid);

		if (!user) return apiErrorHandler(res, 404, "User not found");

		let data;

		// generate super admin token if role SUPER ADMIN
		if (role == 1) {
			const payload = {
				key: process.env.NEXT_SUPER_ADMIN_ROLE_KEY,
			};

			const token = generateTokenHandler(
				payload,
				process.env.NEXT_ROLE_TOKEN_SECRETE,
				"365 days"
			);

			data = {
				"role.token": token,
				"role.name": "super admin",
			};
		}

		// generate admin token if role ADMIN
		else if (role == 2) {
			const payload = {
				key: process.env.NEXT_ADMIN_ROLE_KEY,
			};

			const token = generateTokenHandler(
				payload,
				process.env.NEXT_ROLE_TOKEN_SECRETE,
				"365 days"
			);

			data = {
				"role.token": token,
				"role.name": "admin",
			};
		}

		// null if just an user
		else if (role == 3) {
			data = { role: null };
		}

		// null if nobe
		else {
			data = { role: null };
		}

		// update db role
		const docRef = db__admin.collection("users").doc(user.uid);

		await docRef.update(data);

		return res.status(200).json({
			success: true,
			message: "User updated",
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isSuperAdmin(handler));
