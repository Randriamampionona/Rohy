const apiErrorHandler = (res, status, error, rdc = "/") => {
	return res
		.status(status)
		.json({
			error: true,
			message: error.message ? error.message : error,
			rdc,
		});
};

export default apiErrorHandler;
