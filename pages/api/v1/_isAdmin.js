import apiErrorHandler from "../../../utils/apiErrorHandler";
import { verify } from "jsonwebtoken";
import generateTokenHandler from "../../../utils/generateTokenHandler";
import { db__admin } from "../../../lib/firebaseAdmin.config";

const isAdmin = (handler) => {
	return async (req, res) => {
		try {
			const { role = null, ...rest } = req.currentUser;

			// verify JWT role token
			const { key, name } = verify(
				role,
				process.env.NEXT_ADMIN_TOKEN_SECRETE
			);

			// check if admin
			if (key !== process.env.NEXT_ADMIN_ROLE_KEY && name !== "ADMIN")
				return apiErrorHandler?.(
					res,
					406,
					"Sorry you don't have permission to procceed to this request - (Not acceptable)"
				);

			// generate new role token
			const rolePayload = {
				key: process.env.NEXT_ADMIN_ROLE_KEY,
				name: "ADMIN",
			};
			const newRoleToken = generateTokenHandler(
				rolePayload,
				process.env.NEXT_ADMIN_TOKEN_SECRETE,
				"7 days"
			);

			// update role with new ganerated role token
			const docRef = db__admin.collection("users").doc(rest.uid);

			await docRef.update({
				role: newRoleToken,
			});

			// next
			req.adminInfos = {
				admin: true,
				...rest,
			};

			return handler(req, res);
		} catch (error) {
			return apiErrorHandler?.(res, 406, error);
		}
	};
};

export default isAdmin;
