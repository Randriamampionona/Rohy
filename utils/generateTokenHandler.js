import { sign } from "jsonwebtoken";

const generateTokenHandler = (payload) => {
	return sign(payload, process.env.NEXT_GENERATE_TOKEN_SECRETE, {
		expiresIn: "72h",
	});
};

export default generateTokenHandler;
