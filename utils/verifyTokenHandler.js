import { verify } from "jsonwebtoken";

const verifyTokenHandler = (token, secreteKey) => {
	return verify(token, secreteKey);
};

export default verifyTokenHandler;
