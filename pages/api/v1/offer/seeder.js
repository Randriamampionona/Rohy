import { db__admin } from "../../../../lib/firebaseAdmin.config";
import apiErrorHandler from "../../../../utils/apiErrorHandler";

const handler = async (req, res) => {
	if (req.method !== "POST")
		return apiErrorHandler(res, 405, "Method not allowed");

	try {
		const collectionRef1 = db__admin.collection("plans");
		const collectionRef2 = db__admin.collection("plans");
		const collectionRef3 = db__admin.collection("plans");

		const data = [
			{
				title: "Basic",
				desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptates repellat enim.",
				price: {
					regular: 15000,
					promo: null,
				},
				specificity: [
					"Full support 24/7",
					"Best quality",
					"Watch on TV",
					"Full HD",
					"Cancel at anytime",
				],
			},
			{
				title: "Standard",
				desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptates repellat enim architecto perferendis. Itaque.",
				price: {
					regular: 19000,
					promo: null,
				},
				specificity: [
					"Full support 24/7",
					"Best quality",
					"Watch on TV",
					"Full HD",
					"Cancel at anytime",
				],
				popular: true,
			},
			{
				title: "Premium",
				desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis voluptates repellat enim.",
				price: {
					regular: 21000,
					promo: null,
				},
				specificity: [
					"Full support 24/7",
					"Best quality",
					"Watch on TV",
					"Full HD",
					"Cancel at anytime",
				],
			},
		];

		const addPlan1 = await collectionRef1.add(data[0]);
		const addPlan2 = await collectionRef2.add(data[1]);
		const addPlan3 = await collectionRef3.add(data[2]);

		const [r1, r2, r3] = await Promise.all([addPlan1, addPlan2, addPlan3]);

		return res
			.status(201)
			.json({ success: true, r1: r1.id, r2: r2.id, r3: r3.id });
	} catch (error) {
		return apiErrorHandler(res, 500, error);
	}
};

export default handler;
