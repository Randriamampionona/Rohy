import Image from "next/future/image";
import Logo from "../../../public/assets/logo-with-rose-color.webp";
import { FaUserCircle } from "react-icons/fa";
import { RiMenuFill } from "react-icons/ri";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthContext } from "../../../store/context/AuthContext";
import Avatar from "react-avatar";
import DropdownMenu from "./DropdownMenu";
import { Suspense, useState } from "react";
import MobileMenu from "../MobileMenu/MobileMenu";
import HeaderLoader from "../Loader/HeaderLoader";
import { AnimatePresence } from "framer-motion";

const Header = ({ navLinks }) => {
	const { currentUser } = AuthContext();
	const { push, pathname } = useRouter();
	const [menuOpen, setMenuOpen] = useState(false);
	const [open, setOpen] = useState(false);

	return (
		<Suspense fallback={<HeaderLoader />}>
			<header className="z-50 sticky top-0 flex items-center justify-between w-full h-16 px-4 bg-darkColor shadow shadow-darkColor border-b border-[#787ed70a] md:px-6 lg:px-10">
				{/* logo */}
				<Image
					src={Logo}
					alt="rohy"
					placeholder="blur"
					width={95}
					height={83}
					className="cursor-pointer  object-cover hover:brightness-90"
					onClick={(_) => push("/")}
				/>

				{/* navigation links */}
				<ul className="hidden items-center justify-center gap-x-10 md:flex">
					{navLinks[
						currentUser ? "withAuthLinks" : "noAuthLinks"
					]?.map((link) => (
						<li
							key={link.slug}
							className={`relative text-center font-medium after:w-0 after:transition-[width] hover:after:absolute hover:after:-bottom-1 hover:after:left-0 hover:after:w-1/2 hover:after:h-[2px] hover:after:bg-primaryColor hover:text-primaryColor ${
								pathname === link.key
									? "after:absolute after:-bottom-1 after:left-0 after:w-1/2 after:h-[2px] after:bg-primaryColor text-primaryColor"
									: ""
							}`}>
							<Link href={link.slug}>
								<a>{link.textLink}</a>
							</Link>
						</li>
					))}
				</ul>

				{/* user interaction */}
				<div className="relative flex items-center gap-x-4">
					{menuOpen && (
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

					<button
						className="text-3xl md:hidden"
						onClick={(_) => setOpen(true)}>
						<span>
							<RiMenuFill />
						</span>
					</button>
				</div>

				{/* mobile menu */}
				<AnimatePresence mode="wait">
					{open && (
						<MobileMenu
							setOpen={setOpen}
							navLinks={navLinks}
							Logo={Logo}
						/>
					)}
				</AnimatePresence>
			</header>
		</Suspense>
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
				slug: "/apps",
				textLink: "Applications",
			},
			{
				slug: "/contact",
				textLink: "Nous contacter",
			},
		],

		withAuthLinks: [
			{
				slug: "/live?p=all-channels&key=548148691",
				key: "/live",
				textLink: "Live",
			},
			{
				slug: "/tv-program",
				key: "/tv-program",
				textLink: "TV program",
			},
			{
				slug: "/channels",
				key: "/channels",
				textLink: "Channels & Apps",
			},
			{
				slug: "/my-videos?p=playlist&key=35914515755",
				key: "/my-videos",
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
