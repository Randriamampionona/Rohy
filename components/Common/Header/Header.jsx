import Image from "next/future/image";
import Logo from "../../../public/assets/logo-with-rose-color.webp";
import { FaUserCircle } from "react-icons/fa";
import { RiMenuFill } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../../../store/context/AuthContext";
import Avatar from "react-avatar";
import DropdownMenu from "./DropdownMenu";
import { useState } from "react";

const Header = ({ navLinks }) => {
	const { currentUser } = AuthContext();
	const { push } = useRouter();
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className="z-50 sticky top-0 flex items-center justify-between w-full h-16 px-4 bg-darkColor shadow shadow-darkColor md:px-6 lg:px-10">
			{/* logo */}
			<Link href={"/"}>
				<Image
					src={Logo}
					alt="rohy"
					placeholder="blur"
					width={95}
					height={83}
					className="cursor-pointer hover:brightness-90"
					style={{ objectFit: "cover" }}
				/>
			</Link>

			{/* navigation links */}
			<ul className="hidden items-center justify-center gap-x-10 md:flex">
				{navLinks[currentUser ? "withAuthLinks" : "noAuthLinks"]?.map(
					(link) => (
						<li
							key={link.slug}
							className="relative text-center font-medium after:w-0 after:transition-[width] hover:after:absolute hover:after:-bottom-1 hover:after:left-0 hover:after:w-1/2 hover:after:h-[2px] hover:after:bg-primaryColor hover:text-primaryColor">
							<Link href={link.slug}>{link.textLink}</Link>
						</li>
					)
				)}
			</ul>

			{/* user interaction */}
			<div className="relative flex items-center gap-x-4">
				{currentUser && menuOpen && (
					<DropdownMenu
						menus={navLinks.dropdownMenus}
						setMenuOpen={setMenuOpen}
					/>
				)}

				{currentUser ? (
					<div
						className="w-auto"
						onClick={() => setMenuOpen(!menuOpen)}>
						{currentUser?.photoUrl ? (
							<Image
								src={currentUser?.photoUrl}
								alt={currentUser?.displayName}
								width={42}
								height={42}
								className="cursor-pointer hover:opacity-90"
							/>
						) : (
							<Avatar
								name={currentUser?.email}
								round={true}
								size={42}
								email={currentUser?.email}
								className="cursor-pointer hover:opacity-90"
							/>
						)}
					</div>
				) : (
					<button
						className="primaryBtn"
						onClick={() => push("/authorization/signup")}>
						<span>S&apos;inscrir</span>
						<span>
							<FaUserCircle />
						</span>
					</button>
				)}

				<button className="text-3xl md:hidden">
					<span>
						<RiMenuFill />
					</span>
				</button>
			</div>
		</header>
	);
};

Header.defaultProps = {
	navLinks: {
		noAuthLinks: [
			{
				slug: "/offers",
				textLink: "Nos offres",
			},
			{
				slug: "/app",
				textLink: "Applications",
			},
			{
				slug: "/contact",
				textLink: "Nous contacter",
			},
		],

		withAuthLinks: [
			{
				slug: "/live",
				textLink: "Live",
			},
			{
				slug: "/tv-program",
				textLink: "TV program",
			},
			{
				slug: "/channels",
				textLink: "Channels & Apps",
			},
			{
				slug: "/my-videos",
				textLink: "My videos",
			},
		],

		dropdownMenus: [
			{
				slug: "/account",
				textLink: "Account",
			},
			{
				slug: "/settings",
				textLink: "Settings",
			},
			{
				slug: "/helps",
				textLink: "Helps",
			},
		],
	},
};

export default Header;
