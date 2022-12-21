import { Fragment } from "react";
import { Header, MetaHead } from "../Common";
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
		</Fragment>
	);
};

export default Layout;
