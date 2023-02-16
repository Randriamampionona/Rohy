import { sign } from "jsonwebtoken";

const generateTokenHandler = (payload, secreteKey, expireDate) => {
	return sign(payload, secreteKey, {
		expiresIn: expireDate,
	});
};

export default generateTokenHandler;
