import admin, {
	auth__admin,
	db__admin,
} from "../../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import { upload } from "../../../../../utils/cloudinaryOperations";
import generateTokenHandler from "../../../../../utils/generateTokenHandler";
import isSuperAdmin from "../../_isSuperAdmin";
import isAuth from "./../../_isAuth";

// for deblocking 413 Body exceeded 1mb limit
export const config = { api: { bodyParser: { sizeLimit: "999999999mb" } } };

const handler = async (req, res) => {
	if (req.method !== "POST")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const {
			email,
			displayName,
			password,
			photoURL = null,
			role = 3,
		} = req.body;

		// check if user already exist
		const user = await auth__admin.getUserByEmail(email);

		if (!!user) return apiErrorHandler(res, 403, "Email already taken");

		// upload profile if any
		let image = null;

		if (!!photoURL) {
			const result = await upload(
				photoURL,
				"image",
				"images/profiles/",
				["png", "jpg", "jpeg", "webp"],
				{
					height: 50,
					width: 50,
				}
			);

			if (result.error) {
				return apiErrorHandler(
					res,
					result.error.status,
					`Something went wrong while uploading image (code: ${result.error.status})`
				);
			}

			image = result.secure_url;
		}

		// add new user in AUTH
		const newUser = await auth__admin.createUser({
			email,
			displayName,
			photoURL: image,
			password,
		});

		let roleData;

		// generate super admin token if role SUPER ADMIN
		if (role == 1) {
			const payload = {
				key: process.env.NEXT_SUPER_ADMIN_ROLE_KEY,
			};

			const token = generateTokenHandler(
				payload,
				process.env.NEXT_ROLE_TOKEN_SECRETE,
				"365 days"
			);

			roleData = {
				role: {
					token: token,
					name: "super admin",
				},
			};
		}

		// generate admin token if role ADMIN
		else if (role == 2) {
			const payload = {
				key: process.env.NEXT_ADMIN_ROLE_KEY,
			};

			const token = generateTokenHandler(
				payload,
				process.env.NEXT_ROLE_TOKEN_SECRETE,
				"365 days"
			);

			roleData = {
				role: {
					token: token,
					name: "admin",
				},
			};
		}

		// null if just an user
		else if (role == 3) {
			roleData = { role: null };
		}

		// null if nobe
		else {
			roleData = { role: null };
		}

		// save new user in DB
		const docRef = db__admin.collection("users").doc(newUser.uid);
		await docRef.create({
			email,
			displayName,
			photoURL: image,
			role: roleData,
			joinedOn: admin.firestore.FieldValue.serverTimestamp(),
		});

		return res.status(201).json({
			success: true,
			message: `New user has been created (ID: ${newUser.uid})`,
			payload: {
				uid: newUser.uid,
				email,
				displayName,
				role: roleData,
				photoURL: image,
			},
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isSuperAdmin(handler));
