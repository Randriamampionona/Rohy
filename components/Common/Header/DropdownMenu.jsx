import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import Image from "next/image";
import { AuthContext } from "../../../store/context/AuthContext";

const DropdownMenu = ({ menus, setMenuOpen }) => {
	const { currentUser, signoutFunc, authLoading } = AuthContext();

	const signOutHandler = async () => {
		setMenuOpen(false);
		await signoutFunc();
	};

	return (
		<div className="absolute top-14 right-0 w-44 rounded bg-lightDarkColor shadow-md transition-all">
			<ul className="flex flex-col w-full">
				<div className="flex items-center justify-start gap-x-3 px-4 py-3">
					<div className="relative flex w-11 h-11 rounded-full border-2 border-primaryColor overflow-hidden hover:opacity-90">
						<Image
							src={currentUser?.photoURL}
							alt={currentUser?.displayName}
							layout="fill"
							objectFit="cover"
							width={44}
							height={44}
							className="rounded-full hover:contrast-75"
						/>
					</div>

					<div className="grid">
						<h1 className="text-base font-mediumleading-none">
							{currentUser?.displayName}
						</h1>
						<Link href={"/account"}>
							<a className="text-sm text-gray-500 hover:text-primaryColor">
								View profile
							</a>
						</Link>
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
