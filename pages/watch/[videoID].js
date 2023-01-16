import axios from "axios";
import { FaArrowLeft, FaTimes } from "react-icons/fa";
import { RiHeartLine, RiStarLine } from "react-icons/ri";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Error, MetaHead, Player } from "./../../components/Common";
import { useGetActivePlan, useListHandler } from "../../hooks";
import { ImSpinner2 } from "react-icons/im";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase.config";
import { AuthContext } from "../../store/context/AuthContext";
import getCurrentUserProps from "../../utils/getCurrentUserProps";
import ssrErrorHandler from "../../utils/ssrErrorHandler";
import { GlobalContext } from "../../store/context/GlobalContext";

const WatchPage = ({ videoDetails }) => {
	const { currentUser } = AuthContext();
	const { error } = GlobalContext();

	const { getActivePlanFun, loading: traitement } = useGetActivePlan();
	const { addToMyListFunc, removeFromMyListFunc, loading } = useListHandler();
	const [isSavedHint, setIsSavedHint] = useState(null);
	const [hasActivePlan, setHasActivePlan] = useState(true);
	const { back, replace } = useRouter();

	// get active plan
	useEffect(() => {
		const getActivePlan = async () => {
			const { active } = await getActivePlanFun();
			setHasActivePlan(active);
		};

		getActivePlan();
	}, []);

	// check if movie already saved
	useEffect(() => {
		const getSavedVideo = () => {
			const collectionRef = collection(
				db,
				"users",
				currentUser.uid,
				"myList"
			);
			const q = query(collectionRef, where("id", "==", videoDetails?.id));
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
		const { video, ...rest } = videoDetails;

		if (key === "add" && !loading.add) return await addToMyListFunc(rest);
		if (key === "remove" && !loading.remove)
			return await removeFromMyListFunc(isSavedHint);
	};

	if (traitement)
		return (
			<section className="flex items-center justify-center w-screen h-screen">
				<span className="animate-spin">
					<ImSpinner2 />
				</span>
			</section>
		);

	if (error) return <Error />;

	if (!hasActivePlan)
		return (
			<Fragment>
				<MetaHead subTitle={"No active plan"} />
				<section className="relative w-screen h-screen">
					<div className="flex flex-col items-center justify-center">
						<h1 className="text-center mb-2">
							Seems like you don&apos;t have an active plan yet!
						</h1>

						<button
							className="primaryBtn"
							onClick={(_) => replace("/offers")}>
							<span>Active plan</span>
						</button>
					</div>
				</section>
			</Fragment>
		);

	return (
		<Fragment>
			<MetaHead subTitle={videoDetails?.title} />
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
								{videoDetails?.title.length > 40
									? `${videoDetails?.title.substring(
											0,
											40
									  )}...`
									: videoDetails?.title}
							</span>{" "}
							<span className="text-[10px] text-primaryColor leading-none px-[5px] py-[1px] rounded-sm border border-primaryColor select-none">
								{videoDetails?.original_language === "fr"
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
					<Player videoDetails={videoDetails} />
				</main>
			</section>
		</Fragment>
	);
};

export default WatchPage;

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	try {
		// const videoID = ctx.query.videoID;
		// const URL1 = `https://api.themoviedb.org/3/movie/${videoID}/videos?api_key=${process.env.NEXT_PUBLIC_TMBD_API_KEY}&language=en-US`;

		// const URL2 = `https://api.themoviedb.org/3/movie/${videoID}?api_key=${process.env.NEXT_PUBLIC_TMBD_API_KEY}&language=en-US`;

		// const promise1 = await axios.get(URL1);
		// const promise2 = await axios.get(URL2);

		// const [r1, r2] = await Promise.all([promise1, promise2]);

		// const details = r1.data?.results?.[0];
		// const video = r2.data;

		// return {
		// 	props: {
		// 		...user,
		// 		videoDetails: {
		// 			video,
		// 			details: {
		// 				...details,
		// 				videoURL: `${process.env.NEXT_PUBLIC_WATCH_BASE_URL}/watch?v=${details?.key}`,
		// 			},
		// 		},
		// 	},
		// };

		const videoID = ctx.query.videoID;
		const URL = `/v1/watch/${videoID}/${videoID}`;
		const fetch = await axios.get(URL, { withCredentials: true });
		const result = fetch.data;

		if (result.success) {
			return {
				props: {
					...user,
					videoDetails: result.payload,
				},
			};
		}
	} catch (error) {
		return ssrErrorHandler(error, { ...user });
	}
};
