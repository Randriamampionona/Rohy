import { auth__admin } from "../../../lib/firebaseAdmin.config";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return req
			.status(403)
			.json({ error: true, message: "Request method not allowed" });

	try {
		const userToken = req.cookies.user_token || req.headers["user_token"];

		if (!userToken) throw new Error("User token missing");

		const token = await auth__admin.verifyIdToken(userToken);
		if (!token) throw new Error("Invalid user token");

		// Revoke all refresh tokens for a specified user
		await auth__admin.revokeRefreshTokens(token.uid);

		// if (userToken !== "123456") throw new Error("Invalid user token");

		return res
			.status(200)
			.json({ success: true, userToken: token, isTokenVerified: true });
	} catch (error) {
		return res.status(400).json({
			error: true,
			message: error.message,
			isTokenVerified: false,
		});
	}
};

export default handler;
