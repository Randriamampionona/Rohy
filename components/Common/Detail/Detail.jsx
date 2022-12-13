import { FiHeart, FiPlay, FiShare2 } from "react-icons/fi";

const Detail = ({ title, desc }) => {
	return (
		<div className="z-10 absolute inset-0 hidden place-items-center bg-black/70 group-hover:grid">
			<div className="flex flex-col items-center justify-center last:gap-y-1 text-center max-w-[70%]">
				<h1 className="text-3xl font-bold">{title}</h1>
				<p className="text-whiteColor/70">{`${desc?.substring(
					0,
					130
				)}...`}</p>

				<div className="flex items-center justify-center gap-x-2 mt-4">
					<span className="grid place-items-center w-10 h-10 rounded-full border border-whiteColor hover:border-primaryColor hover:bg-primaryColor cursor-pointer">
						<FiHeart />
					</span>
					<span className="grid place-items-center w-10 h-10 rounded-full border border-whiteColor hover:border-primaryColor hover:bg-primaryColor cursor-pointer">
						<FiPlay />
					</span>
					<span className="grid place-items-center w-10 h-10 rounded-full border border-whiteColor hover:border-primaryColor hover:bg-primaryColor cursor-pointer">
						<FiShare2 />
					</span>
				</div>
			</div>
		</div>
	);
};

export default Detail;
