import { auth__admin } from "../../../lib/firebaseAdmin.config";

const handler = async (req, res) => {
	try {
		const userToken =
			req.cookies["user_token"] || req.headers["user_token"];

		const token = await auth__admin.verifyIdToken(userToken);

		if (token)
			return res.status(200).json({
				success: true,
				isTokenVerified: true,
				token,
			});

		throw new Error("Invalid/missing token");
	} catch (error) {
		return res.status(401).json({
			error: true,
			isTokenVerified: false,
			error,
		});
	}
};

export default handler;
