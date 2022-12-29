import { auth__admin } from "../../../lib/firebaseAdmin.config";
import apiErrorHandler from "./../../../utils/apiErrorHandler";

const isAuth = (handler) => {
	return async (req, res) => {
		try {
			const userToken = req.cookies.user_token;

			if (!userToken)
				return apiErrorHandler?.(res, 401, "Missing user token");

			// verify user token
			const token = await auth__admin.verifyIdToken(userToken);

			if (token.uid) {
				// next
				req.currentUser = token;
				return handler(req, res);
			}
		} catch (error) {
			return apiErrorHandler?.(res, 401, error);
		}
	};
};

export default isAuth;
