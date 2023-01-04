import { Category, Intro, Suggestion } from "../components/Home";
import { Fragment } from "react";
import { MetaHead } from "../components/Common";
import getCurrentUserProps from "../utils/getCurrentUserProps";

const HomePage = ({ moviesData }) => {
	const { suggestion, ...rest } = moviesData;

	return (
		<Fragment>
			<MetaHead subTitle={`Welcome back to Rohy.io`} />

			<section className="w-full">
				<Intro />

				<main className="w-full py-16 px-4 md:px-6 lg:px-8 xl:px-12 space-y-20">
					<Suggestion suggestionData={suggestion} />

					{Object.entries(rest).map((res) => (
						<Category
							key={res[0]}
							categoryDetails={res[1].details}
							moviesList={res[1].movies}
						/>
					))}
				</main>
			</section>
		</Fragment>
	);
};

export default HomePage;

export const getServerSideProps = async (ctx) => {
	const user = await getCurrentUserProps(ctx);
	try {
		// online fetch
		const URL1 = `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.NEXT_PUBLIC_TMBD_API_KEY}&language=en-US&page=1`;
		const URL2 = `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMBD_API_KEY}&language=en-US&page=1`;
		const URL3 = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.NEXT_PUBLIC_TMBD_API_KEY}&language=en-US&page=2`;
		const URL4 = `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_TMBD_API_KEY}&language=en-US&page=1`;

		const promise1 = fetch(URL1).then((res) => res.json());
		const promise2 = fetch(URL2).then((res) => res.json());
		const promise3 = fetch(URL3).then((res) => res.json());
		const promise4 = fetch(URL4).then((res) => res.json());

		const [suggestion, nowPlaying, popular, topRated] = await Promise.all([
			promise1,
			promise2,
			promise3,
			promise4,
		]);

		return {
			props: {
				...user,
				moviesData: {
					suggestion:
						suggestion.results[
							Math.floor(
								Math.random() * suggestion.results.length
							)
						],
					nowPlaying: {
						details: {
							category: "Now playing",
							heading:
								"Lorem ipsum dolor sit amet consectetur adipisicing.",
							desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit ex minus corporis a doloribus cum quis adipisci, illum iure accusamus! Cupiditate!",
						},
						movies: nowPlaying.results,
					},
					popular: {
						details: {
							category: "Popular",
							heading:
								"Lorem ipsum dolor sit amet consectetur adipisicing.",
							desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit ex minus corporis a doloribus cum quis adipisci, illum iure accusamus! Cupiditate!",
						},
						movies: popular.results,
					},
					topRated: {
						details: {
							category: "Top rated",
							heading:
								"Lorem ipsum dolor sit amet consectetur adipisicing.",
							desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Suscipit ex minus corporis a doloribus cum quis adipisci, illum iure accusamus! Cupiditate!",
						},
						movies: topRated.results,
					},
				},
			},
		};
	} catch (err) {
		return { props: { ...user } };
	}
};
