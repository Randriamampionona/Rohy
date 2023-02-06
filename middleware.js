import { NextResponse } from "next/server";

// configs
const baseURL =
	process.env.NODE_ENV === "production"
		? "https://rohy.vercel.app"
		: "http://localhost:3000";

const getFetcherConfig = (req) => {
	return {
		credentials: "include",
		headers: {
			[process.env.NEXT_PUBLIC_USER_COOKIES_NAME]: req.cookies.get(
				process.env.NEXT_PUBLIC_USER_COOKIES_NAME
			),
		},
	};
};

// API call
const verifyTokenHandler = async (req) => {
	try {
		const fetcher = await fetch(
			`${baseURL}/api/v1/auth/verifyAuthToken`,
			getFetcherConfig(req)
		);
		const result = await fetcher.json();

		return result;
	} catch (error) {
		// back to auth page if some error occured
		return NextResponse.redirect(`${baseURL}authorization`);
	}
};

const isAdmin = async (req) => {
	try {
		const URL = `${baseURL}/api/v1/admin`;
		const fetcher = await fetch(URL, getFetcherConfig(req));
		const result = await fetcher.json();

		if (result.success) return result.payload;

		throw new Error(result.message);
	} catch (error) {
		// back to home page if some error occured
		return NextResponse.redirect(`${baseURL}`);
	}
};

// routes
const client = async (req) => {
	const URL = req.nextUrl.pathname;

	const { isTokenVerified } = await verifyTokenHandler(req);

	// redirect to home if already signed In
	if (URL.startsWith("/authorization") && isTokenVerified)
		return NextResponse.redirect(baseURL);

	// redirect to auth if not signed In
	if (URL === "/" && !isTokenVerified)
		return NextResponse.redirect(`${baseURL}/authorization/signin`);

	if (URL.startsWith("/live") && !isTokenVerified)
		return NextResponse.redirect(
			`${baseURL}/authorization/signin?rdc=live-QUEST-p=all-channels-AND-key=548148691`
		);

	if (URL.startsWith("/channel") && !isTokenVerified)
		return NextResponse.redirect(
			`${baseURL}/authorization/signin?rdc=channel`
		);

	if (URL.startsWith("/my-videos") && !isTokenVerified)
		return NextResponse.redirect(
			`${baseURL}/authorization/signin?rdc=my-videos-QUEST-p=playlist-AND-key=35914515755`
		);

	if (URL.startsWith("/watch") && !isTokenVerified)
		return NextResponse.redirect(`${baseURL}/authorization/signin`);

	if (URL.startsWith("/account") && !isTokenVerified)
		return NextResponse.redirect(
			`${baseURL}/authorization/signin?rdc=account`
		);

	if (URL.startsWith("/my-subscription") && !isTokenVerified)
		return NextResponse.redirect(
			`${baseURL}/authorization/signin?rdc=my-subscription`
		);

	if (URL.startsWith("/tv-program") && !isTokenVerified)
		return NextResponse.redirect(
			`${baseURL}/authorization/signin?rdc=tv-program`
		);
};

const admin = async (req) => {
	const URL = req.nextUrl.pathname;

	const { admin } = await isAdmin(req);

	if (URL.startsWith("/admin") && !admin)
		return NextResponse.redirect(`${baseURL}`);
	// if (URL.startsWith("/admin") && false)
	// 	return NextResponse.redirect(`${baseURL}`);
};

// middleware
const middleware = async (req) => {
	const URL = req.nextUrl.pathname;

	if (URL.startsWith("/admin")) {
		// console.log("admin page");
		return admin(req);
	} else {
		// console.log("client page");
		return client(req);
	}
};

export default middleware;

// matcher
export const config = {
	matcher: [
		// require no auth to reach auth page
		"/authorization/:path*",

		// require auth to reach those page
		"/",
		"/channels/:path*",
		"/live/:path*",
		"/my-videos/:path*",
		"/tv-program/:path*",
		"/watch/:path*",
		"/account/:path*",
		"/my-subscription/:path*",

		// require auth and should be an ADMIN to reach admin section page
		"/admin/:path*",
	],
};
