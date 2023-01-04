import { Fragment } from "react";
import { Footer, Header, MetaHead } from "../Common";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
	const { pathname, query } = useRouter();

	return (
		<Fragment>
			<MetaHead />
			{!pathname.includes("authorization") && !query.videoID && (
				<Header />
			)}
			<Toaster position="top-right" />
			{children}
			{!pathname.includes("authorization") && !query.videoID && <Footer />}
		</Fragment>
	);
};

export default Layout;
