import Link from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import Image from "next/image";
import { AuthContext } from "../../../store/context/AuthContext";
import ButtonWithLoading from "./../Buttons/ButtonWithLoading";

const DropdownMenu = ({ menus, setIsDropdownMenuOpen }) => {
	const { currentUser, signoutFunc, authLoading } = AuthContext();

	const signOutHandler = async () => {
		setIsDropdownMenuOpen(false);
		await signoutFunc();
	};

	return (
		<div
			className="absolute top-14 right-0 w-44 rounded bg-lightDarkColor shadow-md transition-all"
			onMouseLeave={(_) => setIsDropdownMenuOpen(false)}>
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
						<h1
							title={currentUser?.displayName}
							className="text-base font-mediumleading-none">
							{currentUser?.displayName.length > 8
								? `${currentUser?.displayName?.substring(
										0,
										8
								  )}...`
								: currentUser?.displayName}
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
							onClick={() => setIsDropdownMenuOpen(false)}>
							<a>{menu.textLink}</a>
						</li>
					</Link>
				))}

				{/* logout btn */}
				<ButtonWithLoading
					className={"primaryBtn w-[calc(100%-1rem)] mx-auto my-2"}
					btntext={"Log Out"}
					BtnIcon={<FaSignOutAlt />}
					isLoading={authLoading.signout}
					onClickHandler={signOutHandler}
				/>
			</ul>
		</div>
	);
};

export default DropdownMenu;
