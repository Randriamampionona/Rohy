const ssrErrorHandler = (error, otherProps, rdc = "/") => {
	if (error?.response) {
		const { status, statusText, data } = error?.response;

		return {
			props: {
				...otherProps,
				errorProps: { status, statusText, rdc, data },
			},
		};
	}

	console.log(error);
	return {
		props: {
			error: error.message,
		},
	};
};

export default ssrErrorHandler;
