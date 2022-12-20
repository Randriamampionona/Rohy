import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PageHeader = ({ heading, navLinks }) => {
	return (
		<header className="w-full mb-6 space-y-2">
			<h1 className="text-3xl font-semibold text-whiteColor cursor-default">
				{heading}
			</h1>

			<ul className="relative flex items-center justify-start space-x-3 w-full  after:z-10 after:absolute after:right-0 after:w-28 after:h-full after:bg-gradient-to-r after:from-darkColor after:to-transparent">
				<Swiper slidesPerView={"auto"}>
					{navLinks?.map((link) => (
						<SwiperSlide key={link.slug} className="!mx-0 !w-auto">
							<li className="relative text-center font-medium after:w-0 after:transition-[width] hover:after:absolute hover:after:-bottom-1 hover:after:left-0 hover:after:w-1/2 hover:after:h-[2px] hover:after:bg-primaryColor hover:text-primaryColor">
								<Link href={link.slug}>{link.textLink}</Link>
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
			slug: "/all-channels",
			textLink: "All channels",
		},
		{
			slug: "/sport",
			textLink: "Sport",
		},
		{
			slug: "/cinema",
			textLink: "Cinema",
		},
		{
			slug: "/youth",
			textLink: "Youth",
		},
		{
			slug: "/info",
			textLink: "Info",
		},
		{
			slug: "/series",
			textLink: "Series",
		},
		{
			slug: "/documentaries",
			textLink: "Documentaries",
		},
		{
			slug: "/entertainment",
			textLink: "Entertainment",
		},
		{
			slug: "/music",
			textLink: "Music",
		},
		{
			slug: "/adult",
			textLink: "Adult",
		},
	],
};

export default PageHeader;
