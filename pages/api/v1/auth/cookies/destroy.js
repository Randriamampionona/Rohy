import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import nookies from "nookies";
import isAuth from "./../_isAuth";

const handler = async (req, res) => {
	if (req.method !== "DELETE")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		nookies.destroy({ req, res }, process.env.NEXT_USER_COOKIES_NAME, {
			path: "/",
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV == "production" ? true : false,
		});

		return res.status(200).json({
			success: true,
			message: "Cookies has been deleted",
		});
	} catch (error) {
		return apiErrorHandler(res, 403, error);
	}
};

export default isAuth?.(handler);
