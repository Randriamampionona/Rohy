import Image from "next/image";
import { Detail } from "../../Common";
import { useRouter } from "next/router";

const Suggestion = ({ suggestionData }) => {
	const { push } = useRouter();

	return (
		<div className="grid grid-cols-1 grid-rows-[16rem] gap-y-4 gap-x-0 w-full md:gap-y-0 md:gap-x-4 md:grid-rows-[32rem] md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			<div className="group relative w-full overflow-hidden lg:col-span-2 xl:col-span-3">
				<Image
					src={suggestionData.img}
					alt={suggestionData.title}
					layout="fill"
					objectFit="cover"
					className="group-hover:scale-110 transition-all"
				/>
				<Detail {...suggestionData} />
			</div>
			<div className="w-full h-full">
				<aside className="w-full h-full flex flex-col items-start justify-between gap-y-4 px-6 py-8 bg-lightDarkColor">
					<div className="flex flex-col gap-y-2">
						<h2 className="text-primaryColor text-lg uppercase font-semibold">
							{suggestionData.category}
						</h2>
						<h1 className="text-whiteColor text-xl uppercase italic font-extrabold">
							{suggestionData.title}
						</h1>
						<p className="text-whiteColor/70">
							{suggestionData.desc}
						</p>
					</div>

					<button
						className="primaryBtn uppercase"
						onClick={() => push(`/${suggestionData.slug}`)}>
						<span>{suggestionData.textBtn}</span>
					</button>
				</aside>
			</div>
		</div>
	);
};

export default Suggestion;
