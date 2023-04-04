import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import nookies from "nookies";

const handler = async (req, res) => {
	if (req.method !== "POST")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const userToken = req.headers?.token;

		if (!userToken)
			return apiErrorHandler(
				res,
				403,
				"Something went wrong, try again later"
			);

		const cookiesConfig = {
			ctx: { req, res },
			name: process.env.NEXT_USER_TOKEN_NAME,
			value: userToken,
			options: {
				path: "/",
				httpOnly: true,
				sameSite: "strict",
				secure: process.env.NODE_ENV == "production" ? true : false,
			},
		};

		nookies.set(
			cookiesConfig.ctx,
			cookiesConfig.name,
			cookiesConfig.value,
			cookiesConfig.options
		);

		return res.status(200).json({
			success: true,
			message: "Cookies has been set",
		});
	} catch (error) {
		return apiErrorHandler(res, 403, error);
	}
};

export default handler;
