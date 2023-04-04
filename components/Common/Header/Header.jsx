import Image from "next/image";
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
import { motion, AnimatePresence } from "framer-motion";
import motionVariants from "./motionVariants";

const Header = ({ navLinks }) => {
	const { currentUser } = AuthContext();
	const { push, pathname } = useRouter();
	const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);
	const [showAdditionalMenu, setShowAdditionalMenu] = useState(false);
	const [open, setOpen] = useState(false);

	return (
		<Suspense fallback={<HeaderLoader />}>
			<header className="z-50 sticky top-0 flex items-center justify-between w-full h-16 px-4 bg-darkColor shadow shadow-darkColor border-b border-[#787ed70a] md:px-6 lg:px-10">
				{/* logo */}
				<Image
					src={Logo}
					alt="rohy"
					placeholder="blur"
					width={90}
					height={78}
					objectFit="contain"
					className="cursor-pointer hover:brightness-90"
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

					{/* additional menu */}
					{currentUser && (
						<div className="relative">
							<li
								className="group inline-flex text-whiteColor space-x-2 cursor-pointer select-none hover:text-primaryColor"
								onClick={(_) =>
									setShowAdditionalMenu((prev) => !prev)
								}>
								<span>more</span>
								<span className="rotate-180 text-xs leading-normal">
									▲
								</span>
							</li>

							<AnimatePresence mode="wait">
								{showAdditionalMenu && (
									<motion.ul
										onMouseLeave={(_) =>
											setShowAdditionalMenu(false)
										}
										variants={motionVariants.growsIn}
										initial="initial"
										animate="animate"
										exit="exit"
										className="absolute left-0 top-10 rounded shadow-lg shadow-darkColor bg-whiteColor overflow-hidden">
										{navLinks.noAuthLinks?.map((link) => (
											<li
												key={link.slug}
												className={`font-medium px-3 py-2 whitespace-pre hover:text-primaryColor hover:bg-gray-100/50 ${
													pathname === link.key
														? "text-primaryColor"
														: "text-darkColor"
												}`}
												onClick={(_) =>
													setShowAdditionalMenu(false)
												}>
												<Link href={link.slug}>
													<a>{link.textLink}</a>
												</Link>
											</li>
										))}
									</motion.ul>
								)}
							</AnimatePresence>
						</div>
					)}
				</ul>

				{/* user interaction */}
				<div className="relative flex items-center gap-x-4">
					{isDropdownMenuOpen && (
						<DropdownMenu
							menus={navLinks.dropdownMenus}
							setIsDropdownMenuOpen={setIsDropdownMenuOpen}
						/>
					)}

					{currentUser ? (
						<div
							className="w-[42px] h-[42px] rounded-full bg-lightDarkColor"
							onClick={() =>
								setIsDropdownMenuOpen(!isDropdownMenuOpen)
							}>
							<Avatar
								src={currentUser?.photoURL}
								name={currentUser?.displayName}
								round={true}
								size={42}
								email={currentUser?.email}
								className="cursor-pointer hover:opacity-90"
							/>
						</div>
					) : (
						<div className="flex items-center space-x-4">
							<button
								onClick={() => push("/authorization/signin")}>
								<span>Sign in</span>
							</button>

							<button
								className="primaryBtn"
								onClick={() => push("/authorization/signup")}>
								<span className="flex">
									Sign up
									<span className="hidden lg:flex">
										&nbsp;for free
									</span>
								</span>

								<span className="hidden lg:flex">
									<FaUserCircle />
								</span>
							</button>
						</div>
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
				slug: "/infos",
				key: "/infos",
				textLink: "Infos",
			},
			{
				slug: "/offers",
				key: "/offers",
				textLink: "Nos offres",
			},
			{
				slug: "/apps",
				key: "/apps",
				textLink: "Applications",
			},
			{
				slug: "/contact",
				key: "/contact",
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
