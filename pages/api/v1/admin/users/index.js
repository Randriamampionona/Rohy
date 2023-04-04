import {
	auth__admin,
	db__admin,
} from "../../../../../lib/firebaseAdmin.config";
import isAuth from "./../../_isAuth";
import isAdmin from "./../../_isAdmin";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import { PaginatedApiResponse } from "../../../../../structures";
import getPerformanceTime from "../../../../../utils/getPerformanceTime";

const handler = async (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const { table_page = 1 } = req.headers;

		const start = performance.now();

		// get all users
		const collectionRef = db__admin.collection("users");

		const getUsers = await collectionRef.get();

		const users = getUsers.docs.map(async (doc) => {
			const user = await auth__admin.getUser(doc.id);

			return {
				...doc.data(),
				...user,
				role: doc.data()?.role?.name || "user",
				joinedOn: doc.data().joinedOn.toDate(),
			};
		});

		const response = new PaginatedApiResponse(
			table_page,
			getUsers.empty ? 1 : users.length,
			getUsers.empty ? [] : await Promise.all(users)
		).response();

		const end = performance.now();

		const time = getPerformanceTime(start, end);

		return res.status(200).json({
			success: true,
			payload: response,
			time,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isAdmin(handler));
