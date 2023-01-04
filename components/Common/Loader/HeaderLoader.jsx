import Image from "next/future/image";
import Logo from "../../../public/assets/logo-with-rose-color.webp";
import Link from "next/link";

const HeaderLoader = () => {
	return (
		<div className="z-50 sticky top-0 flex items-center justify-between w-full h-16 px-4 bg-darkColor shadow shadow-darkColor border-b border-[#787ed70a] md:px-6 lg:px-10">
			<Link href={"/"}>
				<Image
					src={Logo}
					alt="rohy"
					placeholder="blur"
					width={95}
					height={83}
					className="cursor-pointer object-cover hover:brightness-90"
				/>
			</Link>
			<div className="hidden items-center justify-center space-x-10 md:flex">
				<div className="w-20 h-3 rounded-sm loaderAnimate" />
				<div className="w-20 h-3 rounded-sm loaderAnimate" />
				<div className="w-20 h-3 rounded-sm loaderAnimate" />
				<div className="w-20 h-3 rounded-sm loaderAnimate" />
			</div>
			<div className="relative flex items-center justify-end space-x-4">
				<div className="w-28 h-[40px] rounded-sm loaderAnimate md:hidden" />
				<div className="w-[42px] h-[42px] rounded-full loaderAnimate" />
			</div>
		</div>
	);
};

export default HeaderLoader;
