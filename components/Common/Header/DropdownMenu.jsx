import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../../../store/context/AuthContext";

const DropdownMenu = ({ menus, setMenuOpen }) => {
	const { signoutFunc } = AuthContext();

	const signOutHandler = async () => {
		setMenuOpen(false);
		await signoutFunc();
	};

	return (
		<div className="absolute top-14 right-0 w-44 rounded bg-lightDarkColor shadow-md">
			<ul className="flex flex-col w-full">
				{menus?.map((menu) => (
					<Link key={menu.slug} href={`${menu.slug}`}>
						<li
							className="w-full px-4 py-3 cursor-pointer text-whiteColor font-medium hover:bg-darkColor"
							onClick={() => setMenuOpen(false)}>
							{menu.textLink}
						</li>
					</Link>
				))}
				<button
					className="primaryBtn w-[calc(100%-1rem)] mx-auto my-2"
					onClick={signOutHandler}>
					<span>
						<FaSignOutAlt />
					</span>
					<span>Log Out</span>
				</button>
			</ul>
		</div>
	);
};

export default DropdownMenu;
