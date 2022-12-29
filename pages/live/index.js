import { MetaHead, MovieCard, PageHeader } from "../../components/Common";
import axios from "axios";
import { Fragment } from "react";
import { useRouter } from "next/router";

const LivePage = ({ moviesList }) => {
	const {
		query: { p },
	} = useRouter();

	return (
		<Fragment>
			<MetaHead subTitle={`Live - ${p || ""}`} />

			<section className="pageSection">
				<PageHeader />

				<main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-6">
					{moviesList?.map((movie) => (
						<MovieCard
							key={movie.id}
							movie={movie}
							displayBottom={"release_date"}
						/>
					))}
				</main>
			</section>
		</Fragment>
	);
};

export default LivePage;

export const getServerSideProps = async (_ctx) => {
	try {
		// const p = ctx.query.p;
		// const key = ctx.query.key;

		const randomPage = () => Math.floor(Math.random() * 10);

		const URL1 = `https://api.themoviedb.org/3/movie/now_playing?api_key=21ad01e70707b8167d893fa104cf05cb&language=en-US&page=${randomPage()}`;
		const URL2 = `https://api.themoviedb.org/3/movie/popular?api_key=21ad01e70707b8167d893fa104cf05cb&language=en-US&page=${randomPage()}`;
		const URL3 = `https://api.themoviedb.org/3/movie/top_rated?api_key=21ad01e70707b8167d893fa104cf05cb&language=en-US&page=${randomPage()}`;

		const promise1 = await axios.get(URL1);
		const promise2 = await axios.get(URL2);
		const promise3 = await axios.get(URL3);

		const [movies1, movies2, movies3] = await Promise.all([
			promise1,
			promise2,
			promise3,
		]);

		const moviesList = [
			...movies1?.data.results,
			...movies2?.data.results,
			...movies3?.data.results,
		]?.sort(() => Math.random() - 0.5);

		return {
			props: {
				moviesList,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			props: {
				error: error.message,
			},
		};
	}
};
