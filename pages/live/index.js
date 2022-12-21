import axios from "axios";
import { MovieCard, PageHeader } from "../../components/Common";

const LivePage = ({ moviesList }) => {
	return (
		<section className="pageSection">
			<PageHeader />

			<main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 gap-y-6">
				{moviesList.map((movie) => (
					<MovieCard
						key={movie.id}
						movie={movie}
						displayBottom={"release_date"}
					/>
				))}
			</main>
		</section>
	);
};

export default LivePage;

export const getServerSideProps = async (ctx) => {
	try {
		const p = ctx.query.p;
		const key = ctx.query.key;

		// const fetch = await axios.get("http://localhost:3000/api/movies");
		const fetch = await axios.get("https://rohy.vercel.app/api/movies");
		const data = fetch.data?.results;

		return {
			props: {
				moviesList: [...data, ...data, ...data],
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
