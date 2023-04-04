const axiosHeadersHandler = (ctx, additionalHeadersConfig = {}) => {
	return {
		withCredentials: true,
		headers: {
			...additionalHeadersConfig,
			[process.env.NEXT_USER_TOKEN_NAME]:
				ctx.req.cookies[process.env.NEXT_USER_TOKEN_NAME],
		},
	};
};

export default axiosHeadersHandler;
