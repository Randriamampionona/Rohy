import admin, { db__admin } from "../../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../../utils/apiErrorHandler";
import isAdmin from "../../_isAdmin";
import isAuth from "../../_isAuth";

const handler = async (req, res) => {
	if (req.method !== "POST")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		// const adminInfos = req.adminInfos;
		const {
			name,
			desc,
			regularPrice,
			promoPrice = null,
			specificity = [],
			order = 0,
		} = req.body;

		const colRef = db__admin.collection("plans");

		// check if there's already a plan with the same name
		const nameRef = colRef.where("name", "==", name);
		const { empty } = await nameRef.get();

		if (!empty)
			return apiErrorHandler(
				res,
				403,
				`Plan with name: ${name?.toUpperCase()} already exist`
			);

		// add new plan
		const data = {
			name,
			desc,
			price: {
				regular: regularPrice,
				promo: promoPrice,
			},
			specificity,
			order,
			dateCreated: admin.firestore.FieldValue.serverTimestamp(),
		};

		const { id } = await colRef.add(data);

		return res.status(201).json({
			success: true,
			message: `A new plan has been added (ID: ${id})`,
			payload: data,
		});
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default isAuth(isAdmin(handler));
