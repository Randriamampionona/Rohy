import { NextResponse } from "next/server";

const baseURL =
	process.env.NODE_ENV === "production"
		? "https://rohy.vercel.app"
		: "http://localhost:3000";

const verifyTokenHandler = async (req) => {
	try {
		const fetcher = await fetch(`${baseURL}/api/v1/auth/verifyAuthToken`, {
			credentials: "include",
			headers: {
				// process.env.NEXT_PUBLIC_USER_COOKIES_NAME: req.cookies.get("process.env.NEXT_PUBLIC_USER_COOKIES_NAME")?.value, if using next 13
				[process.env.NEXT_PUBLIC_USER_COOKIES_NAME]: req.cookies.get(
					process.env.NEXT_PUBLIC_USER_COOKIES_NAME
				), //if using next 12
			},
		});
		const result = await fetcher.json();

		return result;
	} catch (error) {
		// back to auth page if some error occured
		return NextResponse.redirect(`${baseURL}authorization`);
	}
};

const middleware = async (req) => {
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

export default middleware;

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
	],
};
