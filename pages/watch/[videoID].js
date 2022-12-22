import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { RiHeartLine, RiStarLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { MetaHead, Player } from "./../../components/Common";
import { useListHandler } from "../../hooks";
import { ImSpinner2 } from "react-icons/im";

const WatchPage = ({ error, videoDetails }) => {
	const { addToMyListFunc, loading } = useListHandler();
	const { back } = useRouter();

	const addToMyListHandler = async (key) => {
		if (key === "add") {
			!loading.add && (await addToMyListFunc(videoDetails));
		}
	};

	if (error) return <h1>{error}</h1>;

	return (
		<Fragment>
			<MetaHead subTitle={videoDetails?.name} />
			<section className="relative w-screen">
				<div className="flex items-center justify-between space-x-8 w-screen h-12 px-4 bg-darkColor">
					<div className="flex items-center justify-start space-x-4">
						<button
							className="bg-lightDarkColor rounded-full text-base text-whiteColor/50 hover:text-whiteColor p-2"
							onClick={back}>
							<span>
								<FaArrowLeft />
							</span>
						</button>

						<h1 className="hidden space-x-2 md:block">
							<span className="text-whiteColor text-xl font-semibold cursor-default">
								{videoDetails?.name.length > 40
									? `${videoDetails?.name.substring(
											0,
											40
									  )}...`
									: videoDetails?.name}
							</span>{" "}
							<span className="text-[10px] text-primaryColor leading-none px-[5px] py-[1px] rounded-sm border border-primaryColor select-none">
								{videoDetails?.original_language === "fr"
									? "VF"
									: "VA"}
							</span>
						</h1>
					</div>

					<div className="flex items-center space-x-2 h-full">
						<button
							className="flex items-center space-x-1 rounded bg-primaryColor px-3 h-[80%] text-whiteColor text-base hover:bg-primaryColor/95"
							onClick={(e) => addToMyListHandler("add")}>
							{loading.add ? (
								<span className="animate-spin">
									<ImSpinner2 />
								</span>
							) : (
								<>
									<span>
										<RiHeartLine />
									</span>
									<span>Add to My List</span>
								</>
							)}
						</button>

						<button className="flex items-center space-x-1 rounded bg-lightDarkColor px-3 h-[80%] text-whiteColor text-base hover:bg-primaryColor">
							<span>
								<RiStarLine />
							</span>
							<span>Rate</span>
						</button>
					</div>
				</div>

				<main className="w-full h-[calc(100vh-3rem)]">
					<Player videoDetails={videoDetails} />
				</main>
			</section>
		</Fragment>
	);
};

WatchPage.defaultProps = {
	videoDetails: {
		name: "Marvel - Thor: Ragnarol",
		videoURL: "http://localhost:3000/assets/video.mp4",
		original_language: "fr",
	},
};

export default WatchPage;

export const getServerSideProps = async (ctx) => {
	try {
		const videoID = ctx.query.videoID;
		const url = `https://api.themoviedb.org/3/movie/${videoID}/videos?api_key=${process.env.NEXT_PUBLIC_TMBD_API_KEY}&language=en-US`;

		const fetch = await axios.get(url);
		const videoDetails = fetch.data?.results?.[0];

		return {
			props: {
				videoDetails: {
					...videoDetails,
					videoURL: `${process.env.NEXT_PUBLIC_WATCH_BASE_URL}/watch?v=${videoDetails?.key}`,
				},
			},
		};
	} catch (error) {
		return {
			props: {
				error: error.message,
			},
		};
	}
};
