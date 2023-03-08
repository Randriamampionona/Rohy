import Image from "next/image";
import { useRouter } from "next/router";
import { AuthContext } from "../../../store/context/AuthContext";
import { FaCog } from "react-icons/fa";
import { motion } from "framer-motion";
import motionVariants from "./motionVariants";

const MobileMenu = ({ setOpen, navLinks, Logo }) => {
	const { currentUser } = AuthContext();
	const { pathname, push } = useRouter();

	const navigatehandler = (path) => {
		setOpen(false);
		push(path);
	};

	return (
		<motion.aside
			variants={motionVariants.showsIn}
			initial="initial"
			animate="animate"
			exit="exit"
			className="fixed inset-0 flex items-start justify-end w-screen h-screen bg-black/75 md:hidden"
			onClick={() => setOpen(false)}>
			<motion.div
				variants={motionVariants.slidesIn}
				className="flex flex-col w-[19rem] h-screen bg-darkColor overflow-y-auto"
				onClick={(e) => e.stopPropagation()}>
				{/* logo & icon */}
				<div className="flex items-center justify-between w-full px-4 py-2 border-b border-whiteColor/10">
					<div className="relative w-16 h-12">
						<Image
							src={Logo}
							alt="rohy"
							layout="fill"
							placeholder="blur"
							className="cursor-pointer object-cover hover:brightness-90"
							onClick={(_) => navigatehandler("/")}
						/>
					</div>

					<span
						title="Setting"
						className="text-xl text-whiteColor cursor-pointer">
						<FaCog />
					</span>
				</div>

				{/* navigations */}
				<div className="h-full">
					{/* navigation links (withAuthLinks) */}
					{currentUser && (
						<ul className="w-full px-1 py-3 select-none">
							{navLinks.withAuthLinks?.map((link) => (
								<li
									key={link.slug}
									className={`w-full font-medium cursor-pointer px-3 py-2 rounded-sm hover:text-primaryColor hover:bg-lightDarkColor ${
										pathname === link.key
											? "text-primaryColor"
											: "text-whiteColor"
									}`}
									onClick={(_) => navigatehandler(link.slug)}>
									{link.textLink}
								</li>
							))}
						</ul>
					)}

					{/* spacer */}
					<hr className="w-full border-0 border-b-[0.15px] border-whiteColor/10" />

					{/* navigation links (noAuthLinks) */}
					<ul className="w-full px-1 py-3 select-none">
						{[
							...navLinks.noAuthLinks,
							{
								slug: "/authorization/signup",
								key: "/authorization/signup",
								textLink: "Sign Up",
							},
							{
								slug: "/authorization/signin",
								key: "/authorization/signin",
								textLink: "Sign In",
							},
						]?.map((link) => (
							<li
								key={link.slug}
								className={`w-full font-medium cursor-pointer px-3 py-2 rounded-sm hover:text-primaryColor hover:bg-lightDarkColor ${
									pathname === link.key
										? "text-primaryColor"
										: "text-whiteColor"
								}`}
								onClick={(_) => navigatehandler(link.slug)}>
								{link.textLink}
							</li>
						))}
					</ul>
				</div>

				{/* copyright */}
				<span
					className={`w-full mx-auto py-1 text-center text-whiteColor text-xs`}>
					Copyright &copy; {new Date().getFullYear()} Rohy.io. All
					rights reserved.
				</span>
			</motion.div>
		</motion.aside>
	);
};

export default MobileMenu;
