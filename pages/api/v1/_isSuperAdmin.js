import apiErrorHandler from "../../../utils/apiErrorHandler";
import { verify } from "jsonwebtoken";

const superAdminKey = process.env.NEXT_SUPER_ADMIN_ROLE_KEY;

const isAdmin = (handler) => {
	return async (req, res) => {
		try {
			const { role = null, ...rest } = req.currentUser;

			// verify JWT role token
			const { key } = verify(
				role?.token,
				process.env.NEXT_ROLE_TOKEN_SECRETE
			);

			// check if admin or super admin
			if (key !== superAdminKey) {
				return apiErrorHandler?.(
					res,
					406,
					"Sorry you don't have permission to access this request - (Not acceptable)"
				);
			}

			req.superAdminInfos = {
				superAdmin: true,
				...rest,
			};

			// next
			return handler(req, res);
		} catch (error) {
			return apiErrorHandler?.(res, 406, error);
		}
	};
};

export default isAdmin;
