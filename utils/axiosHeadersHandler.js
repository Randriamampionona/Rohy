const axiosHeadersHandler = (ctx, headersConfigSupl = {}) => {
	return {
		withCredentials: true,
		headers: {
			...headersConfigSupl,
			[process.env.NEXT_PUBLIC_USER_COOKIES_NAME]:
				ctx.req.cookies[process.env.NEXT_PUBLIC_USER_COOKIES_NAME],
		},
	};
};

export default axiosHeadersHandler;
