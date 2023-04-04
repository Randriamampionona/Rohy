import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import generateTokenHandler from "../../../../../utils/generateTokenHandler";
import isAuth from "../../_isAuth";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { role = 3 } = req.query;
		const { email } = req.currentUser;

		if (email !== "toojdev08@gmail.com")
			return apiErrorHandler(
				res,
				403,
				"Sorry, your account does not have access to this request"
			);

		let roleData;

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

			roleData = {
				role: {
					token: token,
					name: "super admin",
				},
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

			roleData = {
				role: {
					token: token,
					name: "admin",
				},
			};
		}

		// null if just an user
		else if (role == 3) {
			roleData = { role: null };
		}

		// null if nobe
		else {
			roleData = { role: null };
		}

		return res.status(200).json({
			success: true,
			payload: roleData,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(handler);
