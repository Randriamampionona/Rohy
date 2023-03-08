import { auth__admin } from "../../../../lib/firebaseAdmin.config";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return res
			.status(403)
			.json({ error: true, message: "Request method not allowed" });

	try {
		const userToken =
			req.cookies[process.env.NEXT_USER_TOKEN_NAME] ||
			req.headers[process.env.NEXT_USER_TOKEN_NAME];

		if (!userToken) throw new Error("Missing user token");

		const token = await auth__admin.verifyIdToken(userToken);
		if (!token) throw new Error("Invalid user token");

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
