import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../../../store/context/AuthContext";
import { ImSpinner2 } from "react-icons/im";
import Image from "next/image";

const DropdownMenu = ({ menus, setMenuOpen }) => {
	const { signoutFunc, authLoading, currentUser } = AuthContext();

	const signOutHandler = async () => {
		setMenuOpen(false);
		await signoutFunc();
	};

	return (
		<div className="absolute top-14 right-0 w-44 rounded bg-lightDarkColor shadow-md">
			<ul className="flex flex-col w-full">
				<div className="flex items-center justify-between gap-x-3 px-4 py-3">
					<div className="w-11 h-11 rounded-full border-2 border-primaryColor overflow-hidden cursor-default hover:opacity-90">
						<Image
							src={currentUser?.photoURL}
							alt={currentUser?.username}
							layout="fill"
							objectFit="cover"
							className="rounded-full"
						/>
					</div>
					<div className="leading-none">
						<h1 className="text-xl font-medium">
							{currentUser?.username}
						</h1>
						<p className="text-sm text-gray-500">View profile</p>
					</div>
				</div>

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
					{authLoading.signout ? (
						<span className="animate-spin">
							<ImSpinner2 />
						</span>
					) : (
						<>
							<span>
								<FaSignOutAlt />
							</span>
							<span>Log Out</span>
						</>
					)}
				</button>
			</ul>
		</div>
	);
};

export default DropdownMenu;
