import { collection, onSnapshot } from "firebase/firestore";
import { Fragment, useEffect, useState } from "react";
import { MetaHead, MovieCard, PageHeader } from "../../components/Common";
import { db } from "../../lib/firebase.config";
import { AuthContext } from "../../store/context/AuthContext";
import getCurrentUserProps from "../../utils/getCurrentUserProps";

const MyVideosPage = ({ heading, page, navLinks }) => {
	const { currentUser } = AuthContext();
	const [savedVideos, setSavedVideos] = useState([]);

	// get snapshot of all saved videos
	useEffect(() => {
		const getSavedVideo = () => {
			const collectionRef = collection(
				db,
				"users",
				currentUser.uid,
				"myList"
			);
			const unsub = onSnapshot(collectionRef, (snapshot) => {
				const videos = snapshot.docs.map((doc) => ({
					docID: doc.id,
					...doc.data(),
				}));

				setSavedVideos(videos);
			});

			return () => unsub();
		};

		currentUser?.uid && getSavedVideo();
	}, [currentUser]);

	return (
		<Fragment>
			<MetaHead subTitle={"My videos"} />

			<section className="pageSection">
				<PageHeader heading={heading} page={page} navLinks={navLinks} />

				<main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-6">
					{savedVideos.length ? (
						savedVideos?.map((movie) => (
							<MovieCard
								key={movie.docID}
								movie={movie}
								displayBottom={"release_date"}
								showPlayBtn={false}
							/>
						))
					) : (
						<p>Empty list</p>
					)}
				</main>
			</section>
		</Fragment>
	);
};

MyVideosPage.defaultProps = {
	heading: "My videos",
	page: "my-videos",
	navLinks: [
		{
			slug: {
				p: "playlist",
				key: "35914515755",
			},
			textLink: "Playlist",
		},
		{
			slug: {
				p: "recently-seen",
				key: "3217784",
			},
			textLink: "Recently seen",
		},
		{
			slug: {
				p: "opinions",
				key: "9548897819",
			},
			textLink: "Opinions",
		},
	],
};

export default MyVideosPage;

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);

	try {
		return {
			props: {
				...user,
			},
		};
	} catch (error) {
		return {
			props: {
				...user,
			},
		};
	}
};
