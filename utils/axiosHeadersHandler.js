const axiosHeadersHandler = (ctx, headersConfig = {}) => {
	return {
		withCredentials: true,
		headers: {
			...headersConfig,
			[process.env.NEXT_PUBLIC_USER_COOKIES_NAME]:
				ctx.req.cookies[process.env.NEXT_PUBLIC_USER_COOKIES_NAME],
		},
	};
};

export default axiosHeadersHandler;
