import { Fragment } from "react";
import { AdminHeader, AdminSidebar, Footer, Header, MetaHead } from "../Common";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";

const Layout = ({ children }) => {
	const { pathname, query } = useRouter();

	const canShown = () => {
		return (
			!pathname.includes("authorization") &&
			!pathname.includes("admin") &&
			!query.videoID
		);
	};

	return (
		<Fragment>
			<MetaHead />
			{pathname.includes("admin") ? (
				<AdminHeader />
			) : (
				canShown() && <Header />
			)}
			<Toaster position="top-right" />
			{pathname.includes("admin") && <AdminSidebar />}
			{children}
			{canShown() && <Footer />}
		</Fragment>
	);
};

export default Layout;
