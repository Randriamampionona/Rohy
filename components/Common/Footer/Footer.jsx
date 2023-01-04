import Link from "next/link";
import { FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = ({ quikLinks, socialMedia }) => {
	return (
		<footer className="grid w-full bg-[#040406] space-x-0 space-y-8 py-12 px-4 md:grid-cols-3 md:px-6 lg:px-10 md:space-x-4 md:space-y-0 lg:space-x-8 xl:space-x-12">
			{quikLinks?.map((quikLink) => (
				<div
					key={quikLink.heading}
					className="divide-y divide-whiteColor/10">
					<h1 className="font-bold text-whiteColor mb-4">
						{quikLink.heading}
					</h1>

					<div className="flex flex-col items-start justify-start space-x-0 mt-4 md:flex-row md:space-x-4 lg:space-x-8 xl:space-x-12">
						<ul className="flex-grow flex-shrink mt-4 space-y-3">
							{quikLink.links.slice(0, 5).map((link) => (
								<li
									key={link.slug?.p || link.slug}
									className="text-sm text-whiteColor/70 hover:text-primaryColor cursor-pointer">
									<Link
										href={
											link.slug?.p
												? `/live?p=${link.slug.p}&key=${link.slug.key}`
												: link.slug
										}>
										{link.textLink}
									</Link>
								</li>
							))}
						</ul>

						<ul className="flex-grow flex-shrink mt-4 space-y-3">
							{quikLink.links.slice(5).map((link) => (
								<li
									key={link.slug?.p || link.slug}
									className="text-sm text-whiteColor/70 hover:text-primaryColor cursor-pointer">
									<Link
										href={
											link.slug?.p
												? `/live?p=${link.slug.p}&key=${link.slug.key}`
												: link.slug
										}>
										{link.textLink}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			))}

			<div className="space-y-6">
				<div className="flex items-center space-x-4">
					{socialMedia?.map((r) => (
						<Link key={r.link} href={r.link}>
							<span className="grid place-items-center text-xl text-whiteColor bg-lightDarkColor w-8 h-8 rounded shadow shadow-black hover:bg-primaryColor">
								<r.Icon />
							</span>
						</Link>
					))}
				</div>

				<div className="flex flex-col justify-start text-start space-y-4 md:justify-end md:text-end">
					<h1 className="font-bold text-whiteColor">Rohy.io</h1>
					<p className="text-sm text-whiteColor/50">
						Live the Rohy experience, the most complete and only
						streaming site that brings together your films, your
						series (in HD, VF and VOST) and the most beautiful
						sports competitions live or in replay.
					</p>
					<span className="text-sm text-whiteColor/50">
						&copy; 2022. All rights reserved
					</span>
				</div>
			</div>
		</footer>
	);
};

Footer.defaultProps = {
	quikLinks: [
		{
			heading: "Programs",
			links: [
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
		},
		{
			heading: "Services & Apps",
			links: [
				{
					slug: "/offers",
					textLink: "Nos offres",
				},
				{
					slug: "/apps",
					textLink: "Applications",
				},
				{
					slug: "/contact",
					textLink: "Nous contacter",
				},
				{
					slug: "/live?p=all-channels&key=548148691",
					key: "/live",
					textLink: "Live",
				},
				{
					slug: "/tv-program",
					key: "/tv-program",
					textLink: "TV program",
				},
				{
					slug: "/channels",
					key: "/channels",
					textLink: "Channels & Apps",
				},
				{
					slug: "/my-videos?p=playlist&key=35914515755",
					key: "/my-videos",
					textLink: "My videos",
				},
			],
		},
	],
	socialMedia: [
		{
			link: "https://facebook.com",
			Icon: FaFacebook,
		},
		{
			link: "https://twitter.com",
			Icon: FaTwitter,
		},
		{
			link: "https://whatsapp.com",
			Icon: FaWhatsapp,
		},
	],
};

export default Footer;
