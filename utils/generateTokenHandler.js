import { sign } from "jsonwebtoken";

const generateTokenHandler = (payload) => {
	return sign(payload, process.env.NEXT_GENERATE_TOKEN_SECRETE, {
		expiresIn: "30 days",
	});
};

export default generateTokenHandler;
