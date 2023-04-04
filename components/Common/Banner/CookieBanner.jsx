import nookies from "nookies";
import { GlobalContext } from "../../../store/context/GlobalContext";
import { motion } from "framer-motion";
import motionVariants from "./motionVariants";

const CookieBanner = () => {
	const { acceptCookies } = GlobalContext();

	const acceptCookieHandler = () => {
		const data = { accepted: true };
		nookies.set(
			undefined,
			process.env.NEXT_PUBLIC_ROHY_COOKIES_NAME,
			JSON.stringify(data),
			{
				path: "/",
				sameSite: "strict",
				secure: process.env.NODE_ENV == "production" ? true : false,
			}
		);

		acceptCookies(data);

		return;
	};

	return (
		<motion.section
			variants={motionVariants.showsUp}
			initial="initial"
			animate="animate"
			exit="exit"
			className="z-50 flex items-center flex-col space-y-4 space-x-0 fixed bottom-0 w-full h-16 p-4 bg-lightDarkColor shadow shadow-darkColor md:flex-row md:justify-between md:space-y-0 md:space-x-4">
			<p className="text-whiteColor text-base">
				This website uses cookies to ensure you get the best experience
				on our website.
			</p>

			<button className="secondaryBtn" onClick={acceptCookieHandler}>
				<span>Accept</span>
			</button>
		</motion.section>
	);
};

export default CookieBanner;
