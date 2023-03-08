import { useState } from "react";
import { AuthContext } from "../../../../store/context/AuthContext";
import Logo from "../../../../public/assets/logo-with-rose-color.webp";
import Image from "next/image";
import Avatar from "react-avatar";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";

const AdminHeader = ({ navLinks }) => {
	const { currentUser } = AuthContext();
	const [menuOpen, setMenuOpen] = useState(false);

	return (
		<header className="z-50 sticky top-0 flex items-center justify-between w-full h-8 px-2 bg-darkColor shadow shadow-darkColor border-b border-[#787ed70a]">
			{/* logo */}
			<figure className="relative left-[-11px] w-16 h-7">
				<Link href={"/"}>
					<a target="_blank" rel="noopener noreferrer">
						<Image
							src={Logo}
							alt="Rohy"
							objectFit="contain"
							layout="fill"
						/>
					</a>
				</Link>
			</figure>

			{/* name & profile */}
			<div className="flex items-center justify-end space-x-4">
				<p className="text-sm text-whiteColor">
					Howdy, {currentUser?.displayName}
				</p>
				<div
					className="relative w-[25px] h-[25px] rounded-full bg-lightDarkColor"
					onClick={() => setMenuOpen(!menuOpen)}>
					<Avatar
						name={currentUser?.displayName}
						src={currentUser?.photoURL}
						round={true}
						size={25}
						email={currentUser?.email}
						className="cursor-pointer hover:opacity-90"
					/>

					{menuOpen && (
						<ProfileDropdown
							menus={navLinks.dropdownMenus}
							setMenuOpen={setMenuOpen}
						/>
					)}
				</div>
			</div>
		</header>
	);
};

AdminHeader.defaultProps = {
	navLinks: {
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

export default AdminHeader;
