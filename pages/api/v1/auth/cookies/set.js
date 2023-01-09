import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import nookies from "nookies";

const handler = async (req, res) => {
	if (req.method !== "POST")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const userToken = req.headers[process.env.NEXT_USER_COOKIES_NAME];

		if (!userToken)
			return apiErrorHandler(
				res,
				403,
				"Something went wrong, try again later"
			);

		nookies.set(
			{ req, res },
			process.env.NEXT_USER_COOKIES_NAME,
			userToken,
			{
				path: "/",
				httpOnly: true,
				sameSite: "strict",
				secure: process.env.NODE_ENV == "production" ? true : false,
			}
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
