const ssrErrorHandler = (error, otherProps) => {
	if (error?.response) {
		const { status, statusText, data } = error?.response;

		return {
			props: {
				...otherProps,
				errorProps: { status, statusText, data },
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
