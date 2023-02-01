import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import {
	RiDashboardFill,
	RiUserFill,
	RiMovieFill,
	RiShoppingCartFill,
	RiRssFill,
} from "react-icons/ri";

const AdminSidebar = ({ sidebarNavigations }) => {
	const { query } = useRouter();

	const isActiveLink = useCallback((key) => query?.key == key, [query]);

	return (
		<aside className="sticky top-[2rem] flex-shrink-0 max-w-[14rem] w-full h-[calc(100vh-2rem)] bg-darkColor text-whiteColor py-4">
			<ul className="w-full">
				{sidebarNavigations?.map((navigation) => (
					<Link
						key={navigation.key}
						href={{
							pathname: navigation.slug,
							query: {
								key: navigation.key,
							},
						}}>
						<a>
							<li
								className={`relative flex items-center space-x-3 px-2 py-2 hover:bg-primaryColor overflow-hidden ${
									isActiveLink(navigation.key) &&
									"bg-primaryColor after:absolute after:-right-2 after:w-3 after:h-3 after:bg-whitesmoke after:rotate-45"
								}`}>
								<span>{navigation.Icon}</span>
								<span>{navigation.text}</span>
							</li>
						</a>
					</Link>
				))}
			</ul>
		</aside>
	);
};

AdminSidebar.defaultProps = {
	sidebarNavigations: [
		{
			slug: "/admin/dashboard",
			text: "Dashboard",
			key: 5641898,
			Icon: <RiDashboardFill />,
		},
		{
			slug: "/admin/dashboard/users",
			text: "Users",
			key: 65814845,
			Icon: <RiUserFill />,
		},
		{
			slug: "/admin/dashboard/movies",
			text: "Movies",
			key: 548484458,
			Icon: <RiMovieFill />,
		},
		{
			slug: "/admin/dashboard/offers",
			text: "Offers",
			key: 6851515,
			Icon: <RiShoppingCartFill />,
		},
		{
			slug: "/admin/dashboard/subscriptions",
			text: "Subscriptions",
			key: 9875145,
			Icon: <RiRssFill />,
		},
	],
};

export default AdminSidebar;
