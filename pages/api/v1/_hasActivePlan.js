import apiErrorHandler from "../../../utils/apiErrorHandler";

const hasActiveSub = (handler) => {
	return async (req, res) => {
		try {
			req.subscriptionDetails = {};

			return handler(req, res);
		} catch (error) {
			return apiErrorHandler(res, 402, "No sub plan");
		}
	};
};

export default hasActiveSub;
