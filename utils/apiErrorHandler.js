const apiErrorHandler = (res, status, error) => {
	return res.status(status).json({
		error: true,
		message: error.message ? error.message : error,
	});
};

export default apiErrorHandler;
