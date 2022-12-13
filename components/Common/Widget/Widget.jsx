import { useRouter } from "next/router";

const Widget = ({ slug, title, desc, category, textBtn }) => {
	const { push } = useRouter();

	return (
		<aside className="w-full h-full flex flex-col items-start justify-between gap-y-4 px-6 py-8 bg-lightDarkColor">
			<div className="flex flex-col gap-y-2">
				<h2 className="text-primaryColor text-lg uppercase font-semibold">
					{category}
				</h2>
				<h1 className="text-whiteColor text-xl uppercase italic font-extrabold">
					{title}
				</h1>
				<p className="text-whiteColor/70">
					{desc.length > 100 ? `${desc.substring(0, 97)}...` : desc}
				</p>
			</div>

			<button
				className="primaryBtn uppercase"
				onClick={() => push(`/${slug}`)}>
				<span>{textBtn}</span>
			</button>
		</aside>
	);
};

export default Widget;
