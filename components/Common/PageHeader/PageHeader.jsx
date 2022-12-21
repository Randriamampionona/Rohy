import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useRouter } from "next/router";

const PageHeader = ({ heading, navLinks }) => {
	const {
		query: { p },
	} = useRouter();

	return (
		<header className="w-full mb-8 space-y-4">
			<h1 className="text-3xl font-semibold text-whiteColor cursor-default">
				{heading}
			</h1>

			<ul className="relative flex items-center justify-start w-full after:z-10 after:absolute after:right-0 after:w-28 after:h-full after:bg-gradient-to-r after:to-darkColor after:from-transparent after:pointer-events-none">
				<Swiper slidesPerView={"auto"} className="!mx-0 !w-full">
					{navLinks?.map((link) => (
						<SwiperSlide
							key={link.slug.key}
							className="!w-auto !mr-6 !pb-2">
							<li
								className={`relative text-center font-medium select-none after:w-0 after:transition-[width] hover:after:absolute hover:after:-bottom-1 hover:after:left-0 hover:after:w-1/2 hover:after:h-[2px] hover:after:bg-primaryColor hover:text-primaryColor ${
									p === link.slug.p
										? "text-primaryColor after:absolute after:-bottom-1 after:left-0 after:w-1/2 after:h-[2px] after:bg-primaryColor"
										: ""
								}`}>
								<Link
									href={`live?p=${link.slug.p}&key=${link.slug.key}`}>
									{link.textLink}
								</Link>
							</li>
						</SwiperSlide>
					))}
				</Swiper>
			</ul>
		</header>
	);
};

PageHeader.defaultProps = {
	heading: "Live",
	navLinks: [
		{
			slug: {
				p: "all-channels",
				key: "548148691",
			},
			textLink: "All channels",
		},
		{
			slug: {
				p: "sport",
				key: "9897187191",
			},
			textLink: "Sport",
		},
		{
			slug: {
				p: "cinema",
				key: "35897156",
			},
			textLink: "Cinema",
		},
		{
			slug: {
				p: "youth",
				key: "3156881",
			},
			textLink: "Youth",
		},
		{
			slug: {
				p: "info",
				key: "9715456",
			},
			textLink: "Info",
		},
		{
			slug: {
				p: "series",
				key: "16587981475",
			},
			textLink: "Series",
		},
		{
			slug: {
				p: "documentaries",
				key: "3575687",
			},
			textLink: "Documentaries",
		},
		{
			slug: {
				p: "entertainment",
				key: "12487155",
			},
			textLink: "Entertainment",
		},
		{
			slug: {
				p: "music",
				key: "3558755",
			},
			textLink: "Music",
		},
		{
			slug: {
				p: "adult",
				key: "576145",
			},
			textLink: "Adult",
		},
	],
};

export default PageHeader;
