import { Fragment } from "react";
import { AdminHeader, CookieBanner, Footer, Header, MetaHead } from "../Common";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { GlobalContext } from "../../store/context/GlobalContext";
import { AnimatePresence } from "framer-motion";

const Layout = ({ children }) => {
	const { cookies } = GlobalContext();
	const { pathname, query } = useRouter();

	const canShown = () => {
		return (
			!pathname.includes("authorization") &&
			!pathname.includes("admin") &&
			!query.movieInfos
		);
	};

	const Pages = () => <Fragment>{children}</Fragment>;

	return (
		<Fragment>
			{/* meta tage */}
			<MetaHead />

			{/* headers */}
			{pathname.includes("admin") ? (
				<AdminHeader />
			) : (
				canShown() && <Header />
			)}

			{/* toast notification */}
			<Toaster position="bottom-right" />

			{/* cookies banner */}
			{process.env.NODE_ENV === "production" && !cookies?.accepted && (
				<AnimatePresence mode="wait">
					<CookieBanner />
				</AnimatePresence>
			)}

			{/* pages */}
			<Pages />

			{/* footer */}
			{canShown() && <Footer />}
		</Fragment>
	);
};

export default Layout;
