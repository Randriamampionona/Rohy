import ReactPlayer from "react-player/lazy";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";

const WatchPage = ({ error, videoDetails }) => {
	const { back } = useRouter();

	if (error) return <h1>{error}</h1>;

	return (
		<section className="relative w-screen h-screen overflow-hidden">
			<div className="flex items-center justify-between w-screen px-3 py-1 bg-darkColor">
				<button
					className="bg-lightDarkColor rounded-full text-base text-whiteColor/50 hover:text-whiteColor p-2"
					onClick={back}>
					<span>
						<FaArrowLeft />
					</span>
				</button>
				<h1 className="text-whiteColor text-base">
					{videoDetails?.name}
				</h1>
			</div>

			<ReactPlayer
				playing={true}
				muted={true}
				controls={true}
				width={"100%"}
				height={"100%"}
				pip={true}
				url={`https://www.youtube.com/watch?v=${videoDetails?.key}`}
			/>
		</section>
	);
};

export default WatchPage;

export const getServerSideProps = async (ctx) => {
	try {
		const videoID = ctx.query.videoID;
		const url = `https://api.themoviedb.org/3/movie/${videoID}/videos?api_key=21ad01e70707b8167d893fa104cf05cb&language=en-US`;

		const fetch = await axios.get(url);
		const videoDetails = fetch.data?.results?.[0];

		return {
			props: {
				videoDetails,
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
