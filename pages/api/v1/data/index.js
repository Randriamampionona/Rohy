import { PaginatedApiResponse } from "../../../../structures";

const data = Array(200)
	.fill(undefined)
	.map((_, i) => `This is the data N: ${i + 1}`);

const handler = (req, res) => {
	if (req.method !== "GET")
		return apiErrorHandler(res, 405, "Method not allowed");

	const { table_page = 1 } = req.headers;

	const response = new PaginatedApiResponse(
		table_page,
		data.length,
		data,
		10
	).response();

	setTimeout(() => {
		return res.status(200).json({
			success: true,
			payload: response,
		});
	}, 5000);
};

export default handler;
