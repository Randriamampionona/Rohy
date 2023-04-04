import apiErrorHandler from "../../../utils/apiErrorHandler";
import { verify } from "jsonwebtoken";

const isAdmin = (handler) => {
	return async (req, res) => {
		try {
			const { role = null, ...rest } = req.currentUser;

			// verify JWT role token
			const { key } = verify(
				role?.token,
				process.env.NEXT_ROLE_TOKEN_SECRETE
			);

			// check if admin
			if (
				key !== process.env.NEXT_ADMIN_ROLE_KEY &&
				key !== process.env.NEXT_SUPER_ADMIN_ROLE_KEY
			)
				return apiErrorHandler?.(
					res,
					406,
					"Sorry you don't have permission to procceed to this request - (Not acceptable)"
				);

			// next
			req.adminInfos = {
				admin: true,
				super_admin: key !== process.env.NEXT_SUPER_ADMIN_ROLE_KEY,
				...rest,
			};

			return handler(req, res);
		} catch (error) {
			return apiErrorHandler?.(res, 406, error);
		}
	};
};

export default isAdmin;
