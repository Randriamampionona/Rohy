import axios from "axios";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { RiHeartLine, RiStarLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { MetaHead, Player } from "./../../components/Common";
import { useListHandler } from "../../hooks";
import { ImSpinner2 } from "react-icons/im";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase.config";
import { AuthContext } from "../../store/context/AuthContext";

const WatchPage = ({ error, videoDetails }) => {
	const { currentUser } = AuthContext();
	const { addToMyListFunc, removeFromMyListFunc, loading } = useListHandler();
	const [isSavedHint, setIsSavedHint] = useState(null);
	const { back } = useRouter();

	// check if movie already saved
	useEffect(() => {
		const getSavedVideo = () => {
			const collectionRef = collection(
				db,
				"users",
				currentUser.uid,
				"myList"
			);
			const q = query(
				collectionRef,
				where("id", "==", videoDetails?.video.id)
			);
			const unsub = onSnapshot(q, (snapshot) => {
				const saved = snapshot.empty;
				setIsSavedHint(
					saved ? null : snapshot.docs.map((doc) => doc.id)
				);
			});

			return () => unsub();
		};

		currentUser?.uid && videoDetails?.video.id && getSavedVideo();
	}, [currentUser, videoDetails]);

	const addToMyListHandler = async (key) => {
		if (key === "add" && !loading.add)
			return await addToMyListFunc(videoDetails?.video);
		if (key === "remove" && !loading.remove)
			return await removeFromMyListFunc(isSavedHint);
	};

	if (error) return <h1>{error}</h1>;

	return (
		<Fragment>
			<MetaHead subTitle={videoDetails?.details.name} />
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
								{videoDetails?.details.name.length > 40
									? `${videoDetails?.details.name.substring(
											0,
											40
									  )}...`
									: videoDetails?.details.name}
							</span>{" "}
							<span className="text-[10px] text-primaryColor leading-none px-[5px] py-[1px] rounded-sm border border-primaryColor select-none">
								{videoDetails?.details.original_language ===
								"fr"
									? "VF"
									: "VA"}
							</span>
						</h1>
					</div>

					<div className="flex items-center space-x-2 h-full">
						{isSavedHint ? (
							<button
								disabled={loading.remove}
								className="flex items-center space-x-1 rounded bg-lightDarkColor px-3 h-[80%] text-whiteColor text-base hover:bg-primaryColor disabled:cursor-progress"
								onClick={() => addToMyListHandler("remove")}>
								{loading.add ? (
									<span className="animate-spin">
										<ImSpinner2 />
									</span>
								) : (
									<>
										<span>
											<FaTimes />
										</span>
										<span>Remove from My List</span>
									</>
								)}
							</button>
						) : (
							<button
								disabled={loading.add}
								className="flex items-center space-x-1 rounded bg-primaryColor px-3 h-[80%] text-whiteColor text-base hover:bg-primaryColor/95 disabled:cursor-progress"
								onClick={() => addToMyListHandler("add")}>
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
						)}

						<button className="flex items-center space-x-1 rounded bg-lightDarkColor px-3 h-[80%] text-whiteColor text-base hover:bg-primaryColor">
							<span>
								<RiStarLine />
							</span>
							<span>Rate</span>
						</button>
					</div>
				</div>

				<main className="w-full h-[calc(100vh-3rem)]">
					<Player videoDetails={videoDetails?.details} />
				</main>
			</section>
		</Fragment>
	);
};

WatchPage.defaultProps = {
	videoDetails: {
		details: {
			name: "Marvel - Thor: Ragnarol",
			videoURL: "http://localhost:3000/assets/video.mp4",
			original_language: "fr",
		},
		video: null,
	},
};

export default WatchPage;

export const getServerSideProps = async (ctx) => {
	try {
		const videoID = ctx.query.videoID;
		const URL1 = `https://api.themoviedb.org/3/movie/${videoID}/videos?api_key=${process.env.NEXT_PUBLIC_TMBD_API_KEY}&language=en-US`;

		const URL2 = `https://api.themoviedb.org/3/movie/${videoID}?api_key=${process.env.NEXT_PUBLIC_TMBD_API_KEY}&language=en-US`;

		const promise1 = await axios.get(URL1);
		const promise2 = await axios.get(URL2);

		const [r1, r2] = await Promise.all([promise1, promise2]);

		const details = r1.data?.results?.[0];
		const video = r2.data;

		return {
			props: {
				videoDetails: {
					video,
					details: {
						...details,
						videoURL: `${process.env.NEXT_PUBLIC_WATCH_BASE_URL}/watch?v=${details?.key}`,
					},
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
