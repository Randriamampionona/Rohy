import { auth__admin, db__admin } from "../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../utils/apiErrorHandler";

const isAuth = (handler) => {
	return async (req, res) => {
		try {
			const userToken =
				req.cookies[process.env.NEXT_USER_TOKEN_NAME] ||
				req.headers[process.env.NEXT_USER_TOKEN_NAME];

			if (!userToken)
				return apiErrorHandler?.(
					res,
					401,
					"Missing user token - (Unauthorized)"
				);

			// verify user token
			const token = await auth__admin.verifyIdToken(userToken);

			// get user in firestore DB
			const docRef = db__admin.collection("users").doc(token.uid);
			const user = await docRef.get();

			if (token.uid) {
				// next
				req.currentUser = { ...token, ...user.data() };
				return handler(req, res);
			}
		} catch (error) {
			return apiErrorHandler?.(res, 401, error);
		}
	};
};

export default isAuth;
