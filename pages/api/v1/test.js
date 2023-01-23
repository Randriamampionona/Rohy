import apiErrorHandler from "./../../../utils/apiErrorHandler";
import generateTokenHandler from "./../../../utils/generateTokenHandler";

const handler = async (_req, res) => {
	try {
		const rolePayload = {
			key: process.env.NEXT_ADMIN_ROLE_KEY,
			name: "ADMIN",
		};

		const newRoleToken = generateTokenHandler(rolePayload);

		return res.status(200).json({
			success: true,
			payload: newRoleToken,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default handler;
