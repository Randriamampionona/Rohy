import { AuthContext } from "../../../../store/context/AuthContext";
import { GlobalContext } from "../../../../store/context/GlobalContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback } from "react";
import Avatar from "react-avatar";
import {
	TbLayoutSidebarRightExpand,
	TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import {
	RiDashboardFill,
	RiUserFill,
	RiMovieFill,
	RiShoppingCartFill,
	RiRssFill,
} from "react-icons/ri";

const AdminSidebar = ({ sidebarNavigations }) => {
	const { isAdminSidebarOpen, toogleAdminSidebar } = GlobalContext();
	const { currentUser } = AuthContext();
	const { pathname } = useRouter();

	const isActiveLink = useCallback(
		(path) => pathname.startsWith(path),
		[pathname]
	);

	return (
		<aside
			className={
				isAdminSidebarOpen
					? "admin-sidebar--open"
					: "admin-sidebar--close"
			}>
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
						<a title={isAdminSidebarOpen ? "" : navigation.text}>
							<li
								className={`relative flex items-center space-x-3 px-2 py-2 hover:bg-primaryColor overflow-hidden ${
									isActiveLink(navigation.slug) &&
									"bg-primaryColor after:absolute after:-right-2 after:w-3 after:h-3 after:bg-whitesmoke after:rotate-45"
								}`}>
								<span>{navigation.Icon}</span>
								{isAdminSidebarOpen && (
									<span>{navigation.text}</span>
								)}
							</li>
						</a>
					</Link>
				))}
			</ul>

			<div
				className={`flex items-center justify-between ${
					isAdminSidebarOpen ? "w-[calc(14rem-1rem)]" : "w-auto"
				} mt-auto mx-auto p-1 rounded-full bg-whiteColor/5 border border-[#fafafa30]`}>
				{isAdminSidebarOpen && (
					<div className="flex-grow flex items-center justify-start space-x-2">
						<div>
							<Avatar
								name={currentUser?.email}
								round={true}
								size={32}
								email={currentUser?.email}
								className="cursor-pointer hover:opacity-90"
							/>
						</div>

						<div>
							<p className="font-medium text-xs leading-none text-whiteColor">
								{currentUser?.displayName.length > 8
									? `${currentUser?.displayName?.substring(
											0,
											8
									  )}...`
									: currentUser?.displayName}
							</p>
							<p className="text-[10px] text-whiteColor/40">
								{currentUser?.email.length > 16
									? `${currentUser?.email?.substring(
											0,
											16
									  )}...`
									: currentUser?.email}
							</p>
						</div>
					</div>
				)}

				<button
					className={`text-lg ${isAdminSidebarOpen && "mr-2"}`}
					onClick={() => toogleAdminSidebar()}>
					<span>
						{isAdminSidebarOpen ? (
							<TbLayoutSidebarRightExpand />
						) : (
							<TbLayoutSidebarLeftExpand />
						)}
					</span>
				</button>
			</div>
		</aside>
	);
};

AdminSidebar.defaultProps = {
	sidebarNavigations: [
		{
			slug: "/admin/dashboard/home",
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
